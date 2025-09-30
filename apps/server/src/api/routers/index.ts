import z from "zod";
import { router } from "../../lib/trpc";
import { protectedProcedure, publicProcedure } from "../procedure";

export const appRouter = router({
	healthCheck: publicProcedure
		.meta({ openapi: { method: "GET", path: "/health" } })
		.input(z.void())
		.output(z.literal("OK"))
		.query(() => {
			return "OK";
		}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
});

export type AppRouter = typeof appRouter;
