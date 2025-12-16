export interface PostgresConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface AuthorizationConfig {
  api_key?: string;
}

export interface SuperTokensConfig {
  connectionURI: string;
  apiKey: string;
}

export interface ConfigInterface {
  port: number;
  postgres: PostgresConfig;
  authorization: AuthorizationConfig;
  supertokens: SuperTokensConfig;
}
