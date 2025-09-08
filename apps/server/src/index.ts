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
import { createContext } from "./lib/context";
import { startRedis, stopRedis } from "./lib/redis";

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

// ✅ log like your Morgan setup
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
		contentSecurityPolicy:
			config.APP_ENV === "production"
				? {
						directives: {
							defaultSrc: ["'self'"],
							scriptSrc: [
								"'self'",
								"'unsafe-inline'",
								"trusted.cdn.example.com",
							],
							styleSrc: ["'self'", "'unsafe-inline'"],
							imgSrc: ["'self'", "data:", "cdn.example.com"],
						},
					}
				: false,
		crossOriginResourcePolicy: false,
		dnsPrefetchControl: false,
		hsts:
			config.PROTOCOL === "https"
				? {
						maxAge: 180 * 24 * 60 * 60,
						includeSubDomains: false,
						preload: false,
					}
				: false,
	});

	// Cookies
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

	fastify.get("/open-api", () => openApiDocument);

	await fastify.register(import("@scalar/fastify-api-reference"), {
		routePrefix: "/reference",
		logLevel: "silent",
		configuration: {
			title: "my-fullstack-setup API Reference",
			url: "/open-api",
			persistAuth: true,
		},
	});

	// Health check
	fastify.get("/", async () => "OK");

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
	const shutdown = async (signal: string) => {
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
