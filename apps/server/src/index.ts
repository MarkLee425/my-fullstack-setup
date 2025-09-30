import {
	type FastifyTRPCPluginOptions,
	fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { fastifyTRPCOpenApiPlugin } from "trpc-to-openapi";
import { openApiDocument } from "./api/openapi";
import { type AppRouter, appRouter } from "./api/routers";
import { auth } from "./lib/auth";
import config from "./lib/config";
import { startRedis, stopRedis } from "./lib/redis";
import { createContext } from "./lib/trpc/context";

const trpcCorsOptions = {
	origin: [config.CLIENT_URL, config.NATIVE_WEB_URL, config.NATIVE_APP_URL],
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	maxAge: 86400,
};

const fastify = Fastify({
	logger: {
		level: config.APP_ENV === "production" ? "info" : "debug",
		transport:
			config.APP_ENV === "development"
				? {
						target: "pino-pretty",
						options: {
							translateTime: "HH:MM:ss Z",
							ignore: "pid,hostname",
						},
					}
				: undefined,
		formatters: {
			bindings: (bindings) => {
				return {
					pid: bindings.pid,
					host: bindings.hostname,
					node_version: process.version,
				};
			},
			level: (label) => {
				return { level: label.toUpperCase() };
			},
		},
	},
	genReqId: () => crypto.randomUUID(),
	trustProxy: 1,
});

fastify.addHook("onResponse", (req, reply, done) => {
	const logData = {
		requestId: req.id,
		userAgent: req.headers["user-agent"],
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		method: req.method,
		url: req.url,
		status: reply.statusCode,
		content_length: reply.getHeader("content-length"),
	};

	req.log.info({ ...logData }, "incoming-request");
	done();
});

async function buildServer() {
	await startRedis();

	// Security headers
	await fastify.register(import("@fastify/helmet"), {
		// Content Security Policy
		contentSecurityPolicy:
			config.APP_ENV === "production"
				? {
						directives: {
							defaultSrc: ["'self'"], // Only allow same origin
							scriptSrc: [
								"'self'",
								"'unsafe-inline'",
								"trusted.cdn.example.com",
							], // Trusted scripts
							styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for framework styling
							imgSrc: ["'self'", "data:", "cdn.example.com"], // Images from self, data URI, or CDN
							connectSrc: ["'self'", config.CLIENT_URL, config.NATIVE_WEB_URL], // APIs you allow
							fontSrc: ["'self'", "fonts.gstatic.com"], // Fonts
							objectSrc: ["'none'"], // No plugins
							upgradeInsecureRequests: [], // Upgrade HTTP to HTTPS
						},
					}
				: false, // Disable in development to simplify debugging

		// Other headers
		dnsPrefetchControl: false, // Disable prefetch
		noSniff: true, // Prevent MIME-type sniffing
		referrerPolicy: { policy: "no-referrer" }, // Hide referrer
		xssFilter: true, // XSS filter for old browsers
		frameguard: { action: "sameorigin" }, // Prevent clickjacking
		ieNoOpen: true, // Prevent opening downloads in IE
		xPoweredBy: false, // Hide Fastify

		// HSTS
		hsts:
			config.PROTOCOL === "https"
				? {
						maxAge: 31536000, // 1 year
						includeSubDomains: true,
						preload: true, // Allow inclusion in browser preload list
					}
				: false,
	});

	await fastify.register(import("@fastify/cookie"), {
		secret: config.COOKIES_SIGNATURE,
		parseOptions: {},
	});
	await fastify.register(import("@fastify/websocket"));
	await fastify.register(import("@fastify/cors"), trpcCorsOptions);
	await fastify.register(import("@fastify/multipart"), {
		limits: {
			fieldNameSize: 100, // Max field name size in bytes
			fieldSize: 100, // Max field value size in bytes
			fields: 10, // Max number of non-file fields
			fileSize: 1000000, // For multipart forms, the max file size in bytes
			files: 1, // Max number of file fields
			headerPairs: 2000, // Max number of header key=>value pairs
			parts: 1000, // For multipart forms, the max number of parts (fields + files)
		},
	});

	// Auth passthrough
	fastify.route({
		method: ["GET", "POST"],
		url: "/auth/*",
		async handler(request, reply) {
			try {
				const url = new URL(request.url, `http://${request.headers.host}`);
				const headers = new Headers();
				Object.entries(request.headers).forEach(([key, value]) => {
					if (value) headers.append(key, value.toString());
				});
				const req = new Request(url.toString(), {
					method: request.method,
					headers,
					body: request.body ? JSON.stringify(request.body) : undefined,
				});
				const response = await auth.handler(req);
				reply.status(response.status);
				response.headers.forEach((value, key) => reply.header(key, value));
				reply.send(response.body ? await response.text() : null);
			} catch (error) {
				fastify.log.error({ err: error }, "Authentication Error:");
				reply.status(500).send({
					error: "Internal authentication error",
					code: "AUTH_FAILURE",
				});
			}
		},
	});

	// tRPC
	await fastify.register(fastifyTRPCPlugin, {
		prefix: "/trpc",
		trpcOptions: {
			router: appRouter,
			createContext,
			onError({ path, error }) {
				fastify.log.error({ path, err: error }, "tRPC Handler Error");
			},
		} satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
	});

	// OpenAPI
	await fastify.register(fastifyTRPCOpenApiPlugin, { router: appRouter });

	fastify.get("/open-api", async () => {
		const authOpenApi = await auth.api.generateOpenAPISchema();

		const authPathsWithTag = Object.fromEntries(
			Object.entries(authOpenApi.paths).map(([pathKey, pathValue]) => {
				const updatedMethods = Object.fromEntries(
					Object.entries(pathValue).map(([method, operation]) => [
						method,
						{
							...operation,
							tags: operation.tags || [],
						},
					]),
				);
				return [pathKey, updatedMethods];
			}),
		);

		// 2️⃣ Merge paths
		const combinedPaths = { ...openApiDocument.paths, ...authPathsWithTag };

		// 3️⃣ Merge components
		const combinedComponents = {
			...openApiDocument.components,
			...authOpenApi.components,
		};

		const authTagsSet = new Set<string>();
		Object.values(authPathsWithTag).forEach((pathItem) => {
			Object.values(pathItem).forEach((op: any) => {
				(op.tags || []).forEach((tag: string) => authTagsSet.add(tag));
			});
		});
		const authTags = Array.from(authTagsSet);

		const generalTagsSet = new Set<string>();
		Object.values(openApiDocument.paths!).forEach((pathItem) => {
			Object.values(pathItem).forEach((op: any) => {
				(op.tags || []).forEach((tag: string) => {
					if (!authTagsSet.has(tag)) generalTagsSet.add(tag);
				});
			});
		});
		const generalTags = Array.from(generalTagsSet);

		const xTagGroups = [
			{
				name: "Auth",
				tags: authTags,
			},
			{
				name: "General",
				tags: generalTags,
			},
		];

		return {
			...openApiDocument,
			paths: combinedPaths,
			components: combinedComponents,
			"x-tagGroups": xTagGroups,
		};
	});

	await fastify.register(import("@scalar/fastify-api-reference"), {
		routePrefix: "/reference",
		logLevel: "silent",
		configuration: {
			title: "my-fullstack-setup API Reference",
			url: "/open-api",
			persistAuth: true,
		},
	});

	// Disable Better Auth OpenAPI Route & Redirect to "/reference" to handle all
	fastify.get("/auth/reference", async (_, reply) => {
		reply.redirect("/reference");
	});
	fastify.get("/auth/reference/*", async (_, reply) => {
		reply.redirect("/reference");
	});

	return fastify;
}

async function main() {
	const app = await buildServer();

	process.on("unhandledRejection", (reason, promise) => {
		app.log.error({ err: reason, promise }, "Unhandled Rejection");
	});
	process.on("uncaughtException", (err) => {
		app.log.error({ err }, "Uncaught Exception");
		process.exit(1);
	});

	// Graceful shutdown
	const shutdown = async (signal: NodeJS.Signals) => {
		app.log.info(`Received shutdown signal: ${signal}`);
		try {
			await stopRedis();
			await app.close();
			app.log.info("✅ Server shutdown complete");
			process.exit(0);
		} catch (err) {
			app.log.error({ err }, "❌ Error during shutdown");
			process.exit(1);
		}
	};

	process.on("SIGINT", () => shutdown("SIGINT"));
	process.on("SIGTERM", () => shutdown("SIGTERM"));

	try {
		await app.listen({ port: config.SERVER_PORT, host: config.HOST });
		app.log.info(`🚀 Server running on port ${config.SERVER_PORT}`);
	} catch (err) {
		app.log.error({ err }, "Failed to start server");
		process.exit(1);
	}
}

main();
