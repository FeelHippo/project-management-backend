import { defineConfig, Config } from 'drizzle-kit';

// https://orm.drizzle.team/docs/get-started/postgresql-new
// when executing "npx drizzle-kit push" from the terminal
// the below configuration will be used during the migration generation process

// commands list
// https://orm.drizzle.team/docs/kit-overview

// to update schemas: "npx drizzle-kit up"

// Notes:
// make sure the RDS database is set to "publicly accessible"

const host = process.env["POSTGRES_HOST"] as string;
const port = 5432;
const user = process.env["POSTGRES_USER"] as string;
const password = process.env["POSTGRES_PASSWORD"] as string;
const database = process.env["POSTGRES_DATABASE"] as string;

export const dbCredentials = {
  ssl: {
    rejectUnauthorized: false,
  },
  host,
  port,
  user,
  password,
  database,
};

export default defineConfig({
  out: "./drizzle",
  dialect: 'postgresql',
  schema: './src/db/postgres.schema.ts',
  casing: 'snake_case',
  dbCredentials,
} satisfies Config);

// in case of connection issues:
// https://serverfault.com/a/656119