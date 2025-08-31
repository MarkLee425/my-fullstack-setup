import {
	type ColumnDefinitions,
	type MigrationBuilder,
	PgLiteral,
} from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	// Create Extensions
	pgm.createExtension("uuid-ossp", { ifNotExists: true });
	pgm.createExtension("citext", { ifNotExists: true });
	pgm.sql(
		"CREATE DOMAIN email AS citext CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );",
	);

	pgm.createSchema("auth", { ifNotExists: true });
	pgm.createSchema("payment", { ifNotExists: true });

	pgm.createType("gender_enum", ["male", "female", "other"]);

	pgm.sql(`
		CREATE OR REPLACE FUNCTION update_updated_at_column()
		RETURNS TRIGGER AS $$
		BEGIN
			IF ROW(NEW.*) IS DISTINCT FROM ROW(OLD.*) THEN
			NEW.updated_at = timezone('utc', NOW());
			END IF;
			RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
	`);

	pgm.createTable(
		{ schema: "auth", name: "user" },
		{
			id: {
				type: "uuid",
				notNull: true,
				unique: true,
				primaryKey: true,
				default: new PgLiteral("uuid_generate_v4()"),
			},
			email: {
				type: "email",
				notNull: true,
			},
			verified: {
				type: "boolean",
				default: false,
			},
			name: {
				type: "text",
				check: "length(name)<=255",
			},
			image: {
				type: "text",
			},
			stripe_customer_id: {
				type: "text",
				notNull: false,
				default: null,
			},
			banned: {
				type: "boolean",
				notNull: false,
				default: false,
			},
			ban_reason: {
				type: "text",
				notNull: false,
				default: null,
			},
			ban_expires: {
				type: "date",
				notNull: false,
				default: null,
			},
			created_at: {
				type: "timestamptz",
				notNull: true,
				default: pgm.func("timezone('utc', now())"),
			},
			updated_at: {
				type: "timestamptz",
				notNull: true,
				default: pgm.func("timezone('utc', now())"),
			},
		},
		{
			ifNotExists: true,
		},
	);

	pgm.createTable(
		{ schema: "auth", name: "account" },
		{
			id: {
				type: "uuid",
				notNull: true,
				unique: true,
				primaryKey: true,
				default: new PgLiteral("uuid_generate_v4()"),
			},
			user_id: {
				type: "uuid",
				references: "auth.user(id)",
				unique: true,
				notNull: true,
				onDelete: "CASCADE",
			},
			account_id: {
				type: "varchar(255)",
				notNull: true,
			},
			provider_id: {
				type: "varchar(255)",
				notNull: true,
			},
			access_token: {
				type: "text",
				notNull: false,
				default: null,
			},
			refresh_token: {
				type: "text",
				notNull: false,
				default: null,
			},
			access_token_expires_at: {
				type: "date",
				notNull: false,
				default: null,
			},
			refresh_token_expires_at: {
				type: "date",
				notNull: false,
				default: null,
			},
			id_token: {
				type: "text",
				notNull: false,
				default: null,
			},
			scope: {
				type: "varchar(155)",
				notNull: false,
				default: null,
			},
			password: {
				type: `char(${32 + 65})`,
			},
			created_at: {
				type: "timestamptz",
				notNull: true,
				default: pgm.func("timezone('utc', now())"),
			},
			updated_at: {
				type: "timestamptz",
				notNull: true,
				default: pgm.func("timezone('utc', now())"),
			},
		},
		{
			ifNotExists: true,
		},
	);

	pgm.createTable(
		{ schema: "auth", name: "verification" },
		{
			id: {
				type: "uuid",
				notNull: true,
				unique: true,
				primaryKey: true,
				default: new PgLiteral("uuid_generate_v4()"),
			},
			identifier: {
				type: "text",
				notNull: true,
			},
			value: {
				type: "text",
				notNull: true,
			},
			expires_at: {
				type: "timestamptz",
				notNull: true,
			},
			created_at: {
				type: "timestamptz",
				notNull: true,
				default: pgm.func("timezone('utc', now())"),
			},
			updated_at: {
				type: "timestamptz",
				notNull: true,
				default: pgm.func("timezone('utc', now())"),
			},
		},
		{
			ifNotExists: true,
		},
	);

	pgm.createTable(
		{ schema: "payment", name: "subscription" },
		{
			id: {
				type: "uuid",
				notNull: true,
				unique: true,
				primaryKey: true,
				default: new PgLiteral("uuid_generate_v4()"),
			},
			plan: {
				type: "text",
				notNull: true,
			},
			reference_id: {
				type: "text",
				notNull: true,
			},
			stripe_customer_id: {
				type: "text",
				notNull: false,
				default: null,
			},
			stripe_subscription_id: {
				type: "text",
				notNull: false,
				default: null,
			},
			status: {
				type: "text",
				notNull: true,
			},
			period_start: {
				type: "date",
				notNull: false,
				default: null,
			},
			period_end: {
				type: "date",
				notNull: false,
				default: null,
			},
			cancel_at_period_end: {
				type: "boolean",
				notNull: false,
				default: null,
			},
			seats: {
				type: "integer",
				notNull: false,
				default: null,
			},
			trial_start: {
				type: "date",
				notNull: false,
				default: null,
			},
			trial_end: {
				type: "date",
				notNull: false,
				default: null,
			},
		},
	);

	pgm.sql(
		`
			CREATE TRIGGER set_updated_at
			BEFORE UPDATE ON auth.user
			FOR EACH ROW
			WHEN (OLD IS DISTINCT FROM NEW)
			EXECUTE FUNCTION update_updated_at_column();
		`,
		{ ifNotExists: true },
	);

	pgm.sql(
		`
			CREATE TRIGGER set_updated_at
			BEFORE UPDATE ON auth.account
			FOR EACH ROW
			WHEN (OLD IS DISTINCT FROM NEW)
			EXECUTE FUNCTION update_updated_at_column();
		`,
		{ ifNotExists: true },
	);

	pgm.sql(
		`
			CREATE TRIGGER set_updated_at
			BEFORE UPDATE ON auth.verification
			FOR EACH ROW
			WHEN (OLD IS DISTINCT FROM NEW)
			EXECUTE FUNCTION update_updated_at_column();
		`,
		{ ifNotExists: true },
	);

	pgm.createIndex({ schema: "auth", name: "user" }, "email", {
		ifNotExists: true,
	});
	pgm.createIndex({ schema: "auth", name: "account" }, "user_id", {
		ifNotExists: true,
	});
	pgm.createIndex({ schema: "auth", name: "verification" }, "identifier", {
		ifNotExists: true,
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.sql("DROP TRIGGER IF EXISTS set_updated_at ON auth.verification;");
	pgm.sql("DROP TRIGGER IF EXISTS set_updated_at ON auth.account;");
	pgm.sql("DROP TRIGGER IF EXISTS set_updated_at ON auth.user;");

	pgm.dropIndex({ schema: "auth", name: "user" }, "email", { ifExists: true });
	pgm.dropIndex({ schema: "auth", name: "user" }, "role", { ifExists: true });
	pgm.dropIndex({ schema: "auth", name: "account" }, "user_id", {
		ifExists: true,
	});
	pgm.dropIndex({ schema: "auth", name: "verification" }, "identifier", {
		ifExists: true,
	});

	pgm.dropSchema("auth", { cascade: true, ifExists: true });
	pgm.dropSchema("payment", { cascade: true, ifExists: true });

	pgm.sql("DROP FUNCTION IF EXISTS update_updated_at_column();");

	// Drop Domain
	pgm.sql("DROP DOMAIN IF EXISTS email;");

	// Drop Extensions
	pgm.dropExtension("citext", { ifExists: true });
	pgm.dropExtension("uuid-ossp", { ifExists: true });
}
