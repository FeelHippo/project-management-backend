"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCredentials = void 0;
const drizzle_kit_1 = require("drizzle-kit");
// https://orm.drizzle.team/docs/get-started/postgresql-new
// when executing "npx drizzle-kit push" from the terminal
// the below configuration will be used during the migration generation process
// commands list
// https://orm.drizzle.team/docs/kit-overview
// to update schemas: "npx drizzle-kit up"
// Notes:
// make sure the RDS database is set to "publicly accessible"
const host = process.env["POSTGRES_HOST"];
const port = 5432;
const user = process.env["POSTGRES_USER"];
const password = process.env["POSTGRES_PASSWORD"];
const database = process.env["POSTGRES_DATABASE"];
exports.dbCredentials = {
    ssl: {
        rejectUnauthorized: false,
    },
    host,
    port,
    user,
    password,
    database,
};
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: "./drizzle",
    dialect: 'postgresql',
    schema: './src/db/postgres.schema.ts',
    casing: 'snake_case',
    dbCredentials: exports.dbCredentials,
});
// in case of connection issues:
// https://serverfault.com/a/656119
//# sourceMappingURL=drizzle.config.js.map