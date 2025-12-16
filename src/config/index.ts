import { ConfigInterface } from "../interfaces/config.interface";

export const getEnvironmentVariable = (key: string): string => {
  if (!process.env[key]) {
    throw Error(`Missing environment variable '${key}'`);
  }
  return process.env[key];
};

const config: ConfigInterface = {
  port: +getEnvironmentVariable("PORT"),
  postgres: {
    host: getEnvironmentVariable("POSTGRES_HOST"),
    user: getEnvironmentVariable("POSTGRES_USER"),
    password: getEnvironmentVariable("POSTGRES_PASSWORD"),
    database: getEnvironmentVariable("POSTGRES_DATABASE"),
  },
  authorization: {
    api_key: getEnvironmentVariable("API_KEY"),
  },
  supertokens: {
    connectionURI: getEnvironmentVariable("SUPER_TOKENS_URI"),
    apiKey: getEnvironmentVariable("SUPER_TOKENS_KEY"),
  },
};

export default config;
