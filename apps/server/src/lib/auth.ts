import { betterAuth } from "better-auth";
import { db } from "./db/postgres";
import { redisClient } from "./db/redis";

export const auth = betterAuth({
	database: db,
	trustedOrigins: [process.env.CLIENT_URL || ""],
	emailAndPassword: {
		enabled: true,
	},
	secondaryStorage: {
		get: async (key) => {
			const value = await redisClient.get(key);
			return value;
		},
		set: async (key, value, ttl) => {
			if (ttl) await redisClient.set(key, value, { EX: ttl });
			else await redisClient.set(key, value);
		},
		delete: async (key) => {
			await redisClient.del(key);
		},
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
});
