import pg from 'pg';

export const db = new pg.Pool({
	application_name: 'my-fullstack-setup',
	host: DMNO_CONFIG.DB_HOST,
	port: DMNO_CONFIG.DB_PORT,
	database: DMNO_CONFIG.DB_DATABASE,
	user: DMNO_CONFIG.DB_USER,
	password: DMNO_CONFIG.DB_PASSWORD,
	max: 20,
	idleTimeoutMillis: 3000,
	connectionTimeoutMillis: 200000,
	maxLifetimeSeconds: 0,
	ssl: false,
});

db.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

setInterval(async () => {
	try {
		await db.query('SELECT 1');
	} catch (err) {
		console.error('PostgreSQL health check failed', err);
	}
}, 300_000); // 5 mins
