import { DmnoBaseTypes, defineDmnoService } from "dmno";

export default defineDmnoService({
	settings: {
		redactSensitiveLogs: true,
		interceptSensitiveLeakRequests: true,
		preventClientLeaks: true,
	},
	name: "root",
	schema: {
		APP_ENV: {
			extends: DmnoBaseTypes.enum(["development", "production", "test"]),
			value: "development",
		},
		PROTOCOL: {
			extends: DmnoBaseTypes.enum(["http", "https"]),
			value: "http",
		},
		HOST: {
			extends: DmnoBaseTypes.string(),
			value: "localhost",
		},
		CLIENT_PORT: {
			extends: DmnoBaseTypes.number(),
			value: 8016,
		},
		SERVER_PORT: {
			extends: DmnoBaseTypes.number(),
			value: 8015,
		},
		SERVER_URL: {
			extends: DmnoBaseTypes.string(),
			value: "http://localhost:8015",
		},
		CLIENT_URL: {
			extends: DmnoBaseTypes.string(),
			value: "http://localhost:8016",
		},
		// GOOGLE_AUTH_CLIENT_ID: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// GOOGLE_AUTH_CLIENT_SECRET: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// FACEBOOK_AUTH_CLIENT_ID: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// FACEBOOK_AUTH_CLIENT_SECRET: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// APPLE_AUTH_CLIENT_ID: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// APPLE_AUTH_TEAM_ID: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// APPLE_AUTH_KEY_ID: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// EMAIL_HOST: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// EMAIL_PORT: {
		// 	extends: DmnoBaseTypes.number(),
		// 	sensitive: true,
		// },
		// EMAIL_AUTH_USER: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
		// EMAIL_AUTH_PASS: {
		// 	extends: DmnoBaseTypes.string(),
		// 	sensitive: true,
		// },
	},
});
