import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { type OpenApiMeta } from "trpc-to-openapi";
import z, { ZodError } from "zod";
import type { Context } from "./context";

export const t = initTRPC
	.context<Context>()
	.meta<OpenApiMeta>()
	.create({
		transformer: superjson,
		errorFormatter({ shape, error }) {
			return {
				...shape,
				data: {
					...shape.data,
					zodError:
						error.cause instanceof ZodError
							? z.treeifyError(error.cause)
							: null,
				},
			};
		},
	});

export const router = t.router;
