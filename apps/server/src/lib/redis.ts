import { createClient, SocketTimeoutError } from "redis";
import config from "./config";

let privateRedisClient: ReturnType<typeof createClient> | null = null;
let privateSubscriberClient: ReturnType<typeof createClient> | null = null;

export async function startRedis(): Promise<void> {
	if (privateRedisClient && privateSubscriberClient) {
		console.log("Redis clients already initialized.");
		return;
	}

	privateRedisClient = createClient({
		RESP: 3,
		socket: {
			host: config.REDIS_APP_HOST,
			port: config.REDIS_APP_PORT,
			connectTimeout: 5000,
			rejectUnauthorized: true,
			reconnectStrategy: (retries, cause) => {
				if (cause instanceof SocketTimeoutError) {
					return new Error("Retry time exhausted");
				}
				if (retries > 20) {
					return new Error("Max retry attempts reached");
				}
				const jitter = Math.floor(Math.random() * 200);
				const delay = Math.min(Math.pow(2, retries) * 50, 2000);
				return delay + jitter;
			},
		},
	});

	privateSubscriberClient = privateRedisClient.duplicate();

	// Attach listeners
	const attachListeners = (
		client: ReturnType<typeof createClient>,
		name: string,
	) => {
		client.on("connect", () => console.log(`${name} connected to Redis`));
		client.on("error", (err) => console.error(`${name} Redis error:`, err));
		client.on("reconnecting", () =>
			console.log(`${name} reconnecting to Redis...`),
		);
	};

	attachListeners(privateRedisClient, "Main Client");
	attachListeners(privateSubscriberClient, "Subscriber Client");

	try {
		await privateRedisClient.connect();
		await privateSubscriberClient.connect();
		console.log("✅ Redis clients connected successfully");
		redisClient = privateRedisClient;
		subscriberClient = privateSubscriberClient;
	} catch (err) {
		console.error("❌ Failed to connect Redis clients:", err);
		throw err;
	}
}

export let redisClient: ReturnType<typeof createClient> = privateRedisClient!;

export let subscriberClient: ReturnType<typeof createClient> =
	privateSubscriberClient!;

export async function stopRedis(): Promise<void> {
	if (!privateRedisClient || !privateSubscriberClient) {
		console.log("Redis clients not initialized, nothing to stop.");
		return;
	}

	try {
		await privateRedisClient.quit();
		await privateSubscriberClient.quit();
		console.log("✅ Redis clients disconnected successfully");
	} catch (err) {
		console.error("❌ Failed to disconnect Redis clients:", err);
		throw err;
	}
}
