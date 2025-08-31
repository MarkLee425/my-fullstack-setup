import amqp, { type Channel, type ChannelModel, type Options } from "amqplib";
import config from "./config";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export async function connectRabbitMQ(): Promise<Channel> {
	if (channel) return channel;

	try {
		connection = await amqp.connect(
			`amqp://${config.AMQP_USER}:${config.AMQP_PASSWORD}@${config.AMQP_HOST}:${config.AMQP_PORT}`,
		);

		connection!.on("error", (err) => {
			console.error("[RabbitMQ] Connection error:", err);
			connection = null;
			channel = null;
		});

		connection!.on("close", () => {
			console.warn("[RabbitMQ] Connection closed");
			connection = null;
			channel = null;
		});

		channel = await connection!.createChannel();
		console.log("[RabbitMQ] Connected and channel created");

		return channel;
	} catch (err) {
		console.error("[RabbitMQ] Failed to connect:", err);
		throw err;
	}
}

export async function publishMessage(
	queue: string,
	message: any,
	options?: Options.Publish,
) {
	if (!channel) {
		channel = await connectRabbitMQ();
	}

	await channel.assertQueue(queue, { durable: true });
	const sent = channel.sendToQueue(
		queue,
		Buffer.from(JSON.stringify(message)),
		options,
	);
	if (!sent) {
		console.warn(`[RabbitMQ] Message not sent to queue ${queue}`);
	}
}

export async function consumeMessages(
	queue: string,
	onMessage: (msg: any) => void,
) {
	if (!channel) {
		channel = await connectRabbitMQ();
	}

	await channel.assertQueue(queue, { durable: true });

	await channel.consume(queue, (msg) => {
		if (msg) {
			try {
				const content = JSON.parse(msg.content.toString());
				onMessage(content);
				channel!.ack(msg);
			} catch (err) {
				console.error("[RabbitMQ] Failed to process message:", err);
				channel!.nack(msg, false, false); // discard message
			}
		}
	});

	console.log(`[RabbitMQ] Started consuming messages from ${queue}`);
}
