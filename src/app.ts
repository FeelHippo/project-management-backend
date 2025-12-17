import cors from "cors";
import express from "express";

import * as OpenApiValidator from "express-openapi-validator";
import helmet from "helmet";
import * as swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import appRouter from "./routes/app.routes";
import * as fs from "node:fs";

import "./supertokens/sdk.init";
import supertokens from "supertokens-node";
// import { middleware } from "supertokens-node/framework/express";
// import { errorHandler } from "supertokens-node/framework/express";

const app = express();

// Swagger Docs
const file = fs.readFileSync("./src/schemas/private.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(
  cors({
    origin: true,
    allowedHeaders: [
      "content-type",
      "x-api-key",
      ...supertokens.getAllCORSHeaders(),
    ],
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Open Api validation middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./src/schemas/private.yaml",
    validateRequests: true,
    validateResponses: true,
  }),
);
app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
    success: false,
    error_code: err.status,
  });
});

// SuperTokens /auth middleware
// app.use(middleware());

// Routes
app.use("/api", appRouter);

// SuperTokens Error Handler
// app.use(errorHandler());

// Fallback route (for unknown endpoints)
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

export default app;
