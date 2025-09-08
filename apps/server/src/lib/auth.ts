import { expo } from "@better-auth/expo";
import {
	MAX_PASSWORD_LENGTH,
	MIN_PASSWORD_LENGTH,
} from "@my-fullstack-setup/constants";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import {
	sendDeleteAccountVerificationEmail,
	sendResetPasswordEmail,
} from "../services/email";
import { createPasswordHash, verifyPasswordHash } from "../utils/password";
import config from "./config";
import { pool } from "./db";
import { redisClient } from "./redis";

export const auth = betterAuth({
	appName: "my-fullstack-setup",
	basePath: "/auth",
	database: pool,
	trustedOrigins: [
		config.CLIENT_URL,
		config.NATIVE_WEB_URL,
		config.NATIVE_APP_URL,
	],
	telemetry: {
		enabled: false, // Disable telemetry for security reasons
	},
	rateLimit: {
		storage: "secondary-storage",
		modelName: "rateLimit",
		window: 60, // 1 minute
		max: 100, // Increased default limit
		customRules: {
			"/sign-up/email": {
				window: 60, // 1 minute
				max: 10, // More lenient for sign-ups
			},
			"/sign-in/email": {
				window: 60, // 1 minute
				max: 10, // More lenient for sign-ins
			},
			"/sign-in/social": {
				window: 60, // 1 minute
				max: 10, // More lenient for social sign-ins
			},
			"/sign-out": {
				window: 60, // 1 minute
				max: 10, // More lenient for sign-outs
			},
			"/forget-password": {
				window: 60, // 1 minute
				max: 10, // More lenient for password recovery
			},
			"/reset-password": {
				window: 60, // 1 minute
				max: 10, // More lenient for password resets
			},
			"/change-password": {
				window: 60, // 1 minute
				max: 10, // More lenient for password changes
			},
			"/verify-email": {
				window: 60, // 1 minute
				max: 10, // More lenient for email verification
			},
			"get-session": {
				window: 60, // 1 minute
				max: 200, // Increased for session checks
			},
		},
	},
	user: {
		modelName: "auth.user",
		changeEmail: {
			enabled: false,
		},
		fields: {
			emailVerified: "verified",
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
		additionalFields: {
			role: {
				type: "string",
				required: false,
				defaultValue: "user",
				input: false,
			},
		},
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url }) => {
				await sendDeleteAccountVerificationEmail(user.email, user.name, url);
			},
		},
	},
	session: {
		modelName: "session",
		storeSessionInDatabase: false,
		freshAge: 60 * 60 * 24,
		cookieCache: {
			enabled: false,
			maxAge: 5 * 60,
		},
	},
	account: {
		modelName: "auth.account",
		fields: {
			userId: "user_id",
			accountId: "account_id",
			providerId: "provider_id",
			accessToken: "access_token",
			refreshToken: "refresh_token",
			accessTokenExpiresAt: "access_token_expires_at",
			refreshTokenExpiresAt: "refresh_token_expires_at",
			idToken: "id_token",
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
		updateAccountOnSignIn: true,
		accountLinking: {
			enabled: false,
		},
	},
	verification: {
		modelName: "auth.verification",
		fields: {
			expiresAt: "expires_at",
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
		disableCleanup: true,
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		maxPasswordLength: MAX_PASSWORD_LENGTH,
		minPasswordLength: MIN_PASSWORD_LENGTH,
		resetPasswordTokenExpiresIn: 15 * 60, // 15 minutes
		password: {
			hash: async (password) => {
				return createPasswordHash(password);
			},
			verify: async (data) => {
				return verifyPasswordHash(data.password, data.hash);
			},
		},
		autoSignIn: true,
		sendResetPassword: async (data) => {
			await sendResetPasswordEmail(data.user.email, data.user.name, data.url);
		},
		revokeSessionsOnPasswordReset: false,
	},
	socialProviders: {
		google: {
			clientId: config.GOOGLE_AUTH_CLIENT_ID,
			clientSecret: config.GOOGLE_AUTH_CLIENT_SECRET,
			prompt: "select_account",
			scope: ["openid", "profile", "email"],
		},
		facebook: {
			clientId: config.FACEBOOK_AUTH_CLIENT_ID,
			clientSecret: config.FACEBOOK_AUTH_CLIENT_SECRET,
			scope: ["email", "public_profile"],
			fields: ["id", "name", "picture", "email"],
			getUserInfo: async (token) => {
				const response = await fetch(
					`https://graph.facebook.com/v20.0/me?fields=id,name,email,picture&access_token=${token.accessToken}`,
				);
				const profile = (await response.json()) as {
					id: string;
					name?: string;
					email?: string;
					picture?: { data: { url: string } };
				};

				return {
					user: {
						id: profile.id,
						name: profile.name,
						email: profile.email,
						emailVerified: true,
						image: profile.picture?.data.url,
					},
					data: {
						id: profile.id,
						name: profile.name,
						email: profile.email,
						emailVerified: true,
						image: profile.picture?.data.url,
					},
				};
			},
		},
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
		database: {
			generateId: () => {
				return crypto.randomUUID() as string;
			},
		},
		useSecureCookies: config.APP_ENV === "production",
		disableCSRFCheck: false,
		crossSubDomainCookies: {
			enabled: config.APP_ENV === "production",
			domain: "nutrion-ai.com",
		},
		cookiePrefix: config.SESSION_PREFIX || "nutrion-ai",
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
	plugins: [
		expo(),
		...(config.APP_ENV === "production"
			? []
			: [
					openAPI(),
					// captcha({
					// 	provider: 'cloudflare-turnstile',
					// 	secretKey: config.TURNSTILE_SECRET_KEY,
					// 	endpoints: ['/sign-up/email', '/sign-in/email', '/forget-password', '/sign-in/social'],
					// }),
				]),
	],
});
