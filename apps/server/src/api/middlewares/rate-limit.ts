import { TRPCError } from "@trpc/server";
import { redisClient } from "../../lib/redis";
import { t } from "../../lib/trpc";

interface BaseRateLimitOptions {
	max: number;
	keyGenerator?: (req: any) => string;
}

interface SlidingWindowOptions extends BaseRateLimitOptions {
	mode?: "sliding"; // default
	windowMs: number;
}

interface TokenBucketOptions extends BaseRateLimitOptions {
	mode: "tokenBucket";
	refillInterval: number; // ms
}

type RateLimitOptions = SlidingWindowOptions | TokenBucketOptions;

const rateLimit = (options: RateLimitOptions) =>
	t.middleware(async ({ ctx, next }) => {
		try {
			const mode = options.mode ?? "sliding";

			// Extract client IP
			const forwardedFor = ctx.req.headers["x-forwarded-for"];
			const clientIP =
				(Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)
					?.split(",")[0]
					?.trim() ||
				(ctx.req.headers["x-real-ip"] as string) ||
				ctx.req.socket?.remoteAddress ||
				"unknown";

			const keyBase = options.keyGenerator
				? options.keyGenerator(ctx.req)
				: `${clientIP}:${ctx.req.url}`;

			// --------------------------------------------------------------------
			// MODE 1: Sliding Window Counter
			// --------------------------------------------------------------------
			if (mode === "sliding") {
				const { windowMs, max } = options as SlidingWindowOptions;

				const window = Math.floor(Date.now() / windowMs);
				const redisKey = `rate_limit:sliding:${keyBase}:${window}`;

				const current = await redisClient.incr(redisKey);
				await redisClient.expire(redisKey, Math.ceil(windowMs / 1000));

				const remaining = Math.max(0, max - current);
				const resetTime = Math.ceil(((window + 1) * windowMs) / 1000);

				ctx.res.header("X-RateLimit-Limit", max.toString());
				ctx.res.header("X-RateLimit-Remaining", remaining.toString());
				ctx.res.header("X-RateLimit-Reset", resetTime.toString());

				if (current > max) {
					const retryAfter = Math.ceil(
						((window + 1) * windowMs - Date.now()) / 1000,
					);
					ctx.res.header("Retry-After", retryAfter.toString());

					throw new TRPCError({
						code: "TOO_MANY_REQUESTS",
						message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
					});
				}
			}

			// --------------------------------------------------------------------
			// MODE 2: Token Bucket
			// --------------------------------------------------------------------
			if (mode === "tokenBucket") {
				const { refillInterval, max } = options as TokenBucketOptions;
				const redisKey = `rate_limit:bucket:${keyBase}`;
				const now = Date.now();

				const [lastRefillRaw, tokensRaw] = (await redisClient.hmget(
					redisKey,
					"lastRefill",
					"tokens",
				)) as [string | null, string | null];

				const lastRefill = parseInt(lastRefillRaw || "0", 10);
				let tokens = parseInt(tokensRaw || `${max}`, 10);

				const elapsed = lastRefill ? now - lastRefill : 0;
				const refillRate = max / (refillInterval / 1000); // tokens per second
				const refillTokens = Math.floor((elapsed / 1000) * refillRate);

				tokens = Math.min(max, tokens + refillTokens);

				const allowed = tokens > 0;
				if (allowed) {
					tokens -= 1;
				}

				await redisClient.hset(redisKey, {
					lastRefill: now.toString(),
					tokens: tokens.toString(),
				});
				await redisClient.expire(
					redisKey,
					Math.ceil(refillInterval / 1000) * 2,
				);

				ctx.res.header("X-RateLimit-Limit", max.toString());
				ctx.res.header("X-RateLimit-Remaining", tokens.toString());
				ctx.res.header(
					"X-RateLimit-Reset",
					Math.ceil((now + refillInterval) / 1000).toString(),
				);

				if (!allowed) {
					ctx.res.header(
						"Retry-After",
						Math.ceil(refillInterval / 1000).toString(),
					);

					throw new TRPCError({
						code: "TOO_MANY_REQUESTS",
						message: `Rate limit exceeded. Token bucket empty.`,
					});
				}
			}

			return next();
		} catch (error) {
			if (error instanceof TRPCError) throw error;

			ctx.app.log.error(error as Error, "Rate limiting error");

			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Rate limiting error",
			});
		}
	});

export default rateLimit;
