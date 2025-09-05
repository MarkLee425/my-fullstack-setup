import { z } from "zod";

const portSchema = z
	.string()
	.default("0")
	.transform((val) => parseInt(val, 10))
	.refine((port) => port > 0 && port < 65536, "Invalid port number");

const envSchema = z.object({
	APP_ENV: z.string().default("development"),
	PROTOCOL: z.enum(["http", "https"]).default("http"),
	HOST: z.string().default("localhost"),

	CLIENT_PORT: portSchema.default(8016),
	SERVER_PORT: portSchema.default(8015),
	NATIVE_PORT: portSchema.default(8081),

	NATIVE_APP: z.string().default("myfullstacksetup"),
	SERVER_URL: z.url().default("http://localhost:8015"),
	CLIENT_URL: z.url().default("http://localhost:8016"),
	NATIVE_WEB_URL: z.url().default("http://localhost:8081"),
	NATIVE_APP_URL: z.string().default("myfullstacksetup://"),

	AUTH_SECRET: z.string().default("auth-super-secret"),
	SESSION_PREFIX: z.string().default("my-fullstack-setup"),
	COOKIES_SIGNATURE: z.string().default(""),

	DB_HOST: z.string().default("localhost"),
	DB_PORT: portSchema.default(5432),
	DB_USER: z.string().default(""),
	DB_PASSWORD: z.string().default(""),
	DB_DATABASE: z.string().default(""),
	DATABASE_URL: z.string().default(""),

	REDIS_APP_PORT: portSchema.default(6379),
	REDIS_APP_HOST: z.string().default("localhost"),

	GOOGLE_AUTH_CLIENT_ID: z.string().default(""),
	GOOGLE_AUTH_CLIENT_SECRET: z.string().default(""),
	FACEBOOK_AUTH_CLIENT_ID: z.string().default(""),
	FACEBOOK_AUTH_CLIENT_SECRET: z.string().default(""),
	APPLE_AUTH_CLIENT_ID: z.string().default(""),
	APPLE_AUTH_TEAM_ID: z.string().default(""),
	APPLE_AUTH_KEY_ID: z.string().default(""),

	EMAIL_HOST: z.string().default(""),
	EMAIL_PORT: portSchema.default(587),
	EMAIL_AUTH_USER: z.string().default(""),
	EMAIL_AUTH_PASS: z.string().default(""),

	S3_ACCOUNT_ID: z.string().default(""),
	S3_ENDPOINT: z.string().default(""),
	S3_ACCESS_KEY_ID: z.string().default(""),
	S3_SECRET_ACCESS_KEY: z.string().default(""),
	S3_BUCKET_NAME: z.string().default(""),
});

export type Env = z.infer<typeof envSchema>;
const config: Env = envSchema.parse(process.env);

export default config;
