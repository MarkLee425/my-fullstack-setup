import pg from "pg";
import config from "./config";

export const pool = new pg.Pool({
	application_name: "my-fullstack-setup-db",
	host: config.DB_HOST,
	port: config.DB_PORT,
	database: config.DB_DATABASE,
	user: config.DB_USER,
	password: config.DB_PASSWORD,
	max: 20,
	idleTimeoutMillis: 3000,
	connectionTimeoutMillis: 200000,
	maxLifetimeSeconds: 0,
	ssl: false,
});

pool.on("error", (err) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});

setInterval(async () => {
	try {
		await pool.query("SELECT 1");
	} catch (err) {
		console.error("PostgreSQL health check failed", err);
	}
}, 300_000); // 5 mins
