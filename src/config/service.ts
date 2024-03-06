import dotenv from "dotenv";
import path from "path";
import _ from "lodash";

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

interface Config {
  dbPostgres: DatabaseConfig;
}

enum EnvironmentVariable {
  POSTGRES_HOST = "POSTGRES_HOST",
  POSTGRES_PORT = "POSTGRES_PORT",
  POSTGRES_DATABASE = "POSTGRES_DATABASE",
  POSTGRES_USER = "POSTGRES_USER",
  POSTGRES_PASSWORD = "POSTGRES_PASSWORD",
}

export class ConfigService {
  private _configuration: Config;

  constructor() {
    this._preload();

    const loadConfig: Config = (() => {
      return {
        dbPostgres: {
          host: this._getEnv(EnvironmentVariable.POSTGRES_HOST),
          port: _.toNumber(this._getEnv(EnvironmentVariable.POSTGRES_PORT)),
          database: this._getEnv(EnvironmentVariable.POSTGRES_DATABASE),
          user: this._getEnv(EnvironmentVariable.POSTGRES_USER),
          password: this._getEnv(EnvironmentVariable.POSTGRES_PASSWORD),
        },
      };
    })();

    this._configuration = loadConfig;
  }

  private _preload() {
    const env = process.env.NODE_ENV ?? "local";

    const isInterestedEnv = ["local", "e2e"].some(
      (interestedEnv) => interestedEnv === env
    );
    if (isInterestedEnv) {
      const envFilePath = path.resolve(__dirname, `${env}.env`);
      dotenv.config({ path: envFilePath, encoding: "utf-8" });
    }
  }

  private _getEnv(variable: EnvironmentVariable): any {
    return process.env[variable];
  }

  public getPostgresDbConfig(): DatabaseConfig {
    return {
      host: this._configuration.dbPostgres.host,
      port: this._configuration.dbPostgres.port,
      database: this._configuration.dbPostgres.database,
      user: this._configuration.dbPostgres.user,
      password: this._configuration.dbPostgres.password,
    };
  }
}
