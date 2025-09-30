import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { fromNodeHeaders } from "better-auth/node";
import type { FastifyInstance } from "fastify";
import { auth } from "../auth";

export async function createContext(
	this: FastifyInstance,
	{ req, res }: CreateFastifyContextOptions,
) {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	return {
		app: this,
		req,
		res,
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
