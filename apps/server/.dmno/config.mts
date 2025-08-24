import { DmnoBaseTypes, defineDmnoService, pick } from "dmno";

export default defineDmnoService({
	// no `name` specified - will inherit from package.json
	schema: {
		APP_ENV: {
			extends: pick(),
		},
		PROTOCOL: {
			extends: pick(),
		},
		HOST: {
			extends: pick(),
		},
		CLIENT_PORT: {
			extends: pick(),
		},
		SERVER_PORT: {
			extends: pick(),
		},
		SERVER_URL: {
			extends: pick(),
		},
		CLIENT_URL: {
			extends: pick(),
		},
		BETTER_AUTH_SECRET: {
			extends: DmnoBaseTypes.string(),
			sensitive: true,
		},
		DB_HOST: {
			extends: DmnoBaseTypes.string(),
			value: "localhost",
		},
		DB_PORT: {
			extends: DmnoBaseTypes.number(),
			value: 5432,
		},
		DB_USER: {
			extends: DmnoBaseTypes.string(),
			value: "root",
		},
		DB_PASSWORD: {
			extends: DmnoBaseTypes.string(),
			value: "password",
		},
		DB_DATABASE: {
			extends: DmnoBaseTypes.string(),
			value: "my-fullstack-setup",
		},
		DATABASE_URL: {
			extends: DmnoBaseTypes.string(),
			value: "postgresql://postgres:password@localhost:5432/my-fullstack-setup",
		},
		REDIS_APP_HOST: {
			extends: DmnoBaseTypes.string(),
			value: "localhost",
		},
		REDIS_APP_PORT: {
			extends: DmnoBaseTypes.number(),
			value: 6379,
		},
		REDIS_APP_PASSWORD: {
			extends: DmnoBaseTypes.string(),
			sensitive: true,
			value: "this-is-sensitive-password",
		},
		// GOOGLE_AUTH_CLIENT_ID: {
		//   extends: pick(),
		// },
		// GOOGLE_AUTH_CLIENT_SECRET: {
		//   extends: pick(),
		// },
		// FACEBOOK_AUTH_CLIENT_ID: {
		//   extends: pick(),
		// },
		// FACEBOOK_AUTH_CLIENT_SECRET: {
		//   extends: pick(),
		// },
		// APPLE_AUTH_CLIENT_ID: {
		//   extends: pick(),
		// },
		// APPLE_AUTH_TEAM_ID: {
		//   extends: pick(),
		// },
		// APPLE_AUTH_KEY_ID: {
		//   extends: pick(),
		// },
		// EMAIL_HOST: {
		//   extends: pick(),
		// },
		// EMAIL_PORT: {
		//   extends: pick(),
		// },
		// EMAIL_AUTH_USER: {
		//   extends: pick(),
		// },
		// EMAIL_AUTH_PASS: {
		//   extends: pick(),
		// },
	},
});
