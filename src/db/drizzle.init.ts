import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import envConfig from "../config";

const client = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
  port: 5432,
  ...envConfig.postgres,
});

const casing = "snake_case";

export default drizzle({ client, casing });
