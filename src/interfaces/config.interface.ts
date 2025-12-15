export interface PostgresConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface AuthorizationConfig {
  api_key?: string;
}

export interface ConfigInterface {
  port: number;
  postgres: PostgresConfig;
  authorization: AuthorizationConfig;
}
