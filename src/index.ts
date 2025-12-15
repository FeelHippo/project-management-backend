import { config } from "dotenv";
config(); // Loads .env file into process.env
import envConfig from "./config";

import app from "./app";

app.listen(envConfig.port, () =>
  console.log(`Server is running on port ${envConfig.port}`),
);
