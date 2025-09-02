import {
	type FastifyTRPCPluginOptions,
	fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { fastifyTRPCOpenApiPlugin } from "trpc-to-openapi";
import { auth } from "./lib/auth";
import config from "./lib/config";
import { createContext } from "./lib/context";
import { type AppRouter, appRouter } from "./routers";

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
			(config.APP_ENV === "development" && {
				target: "pino-pretty",
				options: {
					translateTime: "HH:MM:ss Z",
					ignore: "pid,hostname",
				},
			}) ||
			undefined,
	},
	genReqId: () => {
		return crypto.randomUUID();
	},
	trustProxy: 1,
});

async function main() {
	await fastify.register(await import("@fastify/helmet"), {
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

	// Compression
	await fastify.register(await import("@fastify/compress"), {
		global: true,
	});

	// Cookies
	await fastify.register(await import("@fastify/cookie"), {
		secret: config.COOKIES_SIGNATURE, // for signed cookies
		parseOptions: {},
	});

	await fastify.register(await import("@fastify/websocket"));

	await fastify.register(await import("@fastify/cors"), trpcCorsOptions);

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

	await fastify.register(fastifyTRPCPlugin, {
		prefix: "/trpc",
		// useWSS: true,
		// keepAlive: {
		// 	enabled: true,
		// 	pingMs: 30000,
		// 	pongWaitMs: 5000,
		// },
		trpcOptions: {
			router: appRouter,
			createContext,
			onError({ path, error }) {
				console.error(`Error in tRPC handler on path '${path}':`, error);
			},
		} satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
	});

	await fastify.register(fastifyTRPCOpenApiPlugin, { router: appRouter });

	fastify.get("/", async () => {
		return "OK";
	});

	fastify.listen({ port: config.SERVER_PORT }, (err) => {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
		console.log(`Server running on port ${config.SERVER_PORT}`);
	});
}

main();
