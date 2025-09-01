import z from "zod";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

export const appRouter = router({
	healthCheck: publicProcedure
		.meta({ openapi: { method: "GET", path: "/health" } })
		.input(z.void())
		.output(z.string())
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
