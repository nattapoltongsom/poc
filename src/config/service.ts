import _ from "lodash";
import dotenv from "dotenv";
import path from "path";

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  replicaSetName: string;
  user: string;
  password: string;
}

interface EmailConfig {
  host: string;
  username: string;
  password: string;
  recieverEmailTest: string;
  providerEmail: string;
  port: number;
  isSecure: boolean;
}

interface AppInsightsConfig {
  key: string;
  roleName: string;
  developerMode: boolean;
  samplingPercentage: number;
}
export interface NotificationConfig {
  email: EmailConfig;
}

export interface PlatformSsoConfig {
  getTokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  scope: string;
}

export interface SsoConfig {
  validateTokenEndpoint: string;
  clientId: string;
  clientSecret: string;
}

export interface SsoPlatformConfig {
  firster: PlatformSsoConfig;
  kp: PlatformSsoConfig;
}

interface Config {
  db: DatabaseConfig;
  courier: CourierConfig;
  appInsights: AppInsightsConfig;
  platform: PlatformConfig;
  notification: NotificationConfig;
  ssoPlatform: SsoPlatformConfig;
  sso: SsoConfig;
}

export interface CourierConfig {
  scg: { apiEndpoint: string; username: string; password: string };
  cj: { apiEndpoint: string };
  kerry: {
    apiEndpoint: string;
    appId: string;
    appKey: string;
  };
}

export interface PlatformConfig {
  firster: {
    apiEndpoint: string;
  };
  kp: {
    apiEndpoint: string;
  };
}

enum EnvironmentVariable {
  MONGO_HOST = "MONGO_HOST",
  MONGO_PORT = "MONGO_PORT",
  MONGO_DATABASE = "MONGO_DATABASE",
  MONOG_REPLICA_SET_NAME = "MONGO_REPLICA_SET_NAME",
  MONGO_USER = "MONGO_USER",
  MONGO_PASSWORD = "MONGO_PASSWORD",

  POSTGRES_HOST = "POSTGRES_HOST",
  POSTGRES_PORT = "POSTGRES_PORT",
  POSTGRES_DATABASE = "POSTGRES_DATABASE",
  POSTGRES_USER = "POSTGRES_USER",
  POSTGRES_PASSWORD = "POSTGRES_PASSWORD",

  SCG_API_ENDPOINT = "SCG_API_ENDPOINT",
  SCG_USERNAME = "SCG_USERNAME",
  SCG_PASSWORD = "SCG_PASSWORD",

  AZURE_APP_INSIGHTS_KEY = "AZURE_APP_INSIGHTS_KEY",
  AZURE_APP_INSIGHTS_ROLE = "AZURE_APP_INSIGHTS_ROLE",
  AZURE_APP_INSIGHTS_DEV_MODE = "AZURE_APP_INSIGHTS_DEV_MODE",
  AZURE_APP_INSIGHTS_PERCENTAGE = "AZURE_APP_INSIGHTS_PERCENTAGE",

  KP_API_ENDPOINT = "KP_API_ENDPOINT",
  FIRSTER_API_ENDPOINT = "FIRSTER_API_ENDPOINT",

  CJ_API_ENDPOINT = "CJ_API_ENDPOINT",

  KERRY_API_ENDPOINT = "KERRY_API_ENDPOINT",
  KERRY_API_APP_ID = "KERRY_API_APP_ID",
  KERRY_API_APP_KEY = "KERRY_API_APP_KEY",

  EMAIL_HOST = "EMAIL_HOST",
  EMAIL_USERNAME = "EMAIL_USERNAME",
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
  EMAIL_TEST = "EMAIL_TEST",
  EMAIL_PROVIDER_NAME = "EMAIL_PROVIDER_NAME",
  EMAIL_PORT = "EMAIL_PORT",
  EMAIL_SECURE = "EMAIL_SECURE",

  FRISTER_SSO_TOKEN_ENDPOINT = "FRISTER_SSO_TOKEN_ENDPOINT",
  FIRSTER_SSO_CLIENT_ID = "FIRSTER_SSO_CLIENT_ID",
  FIRSTER_SSO_CLIENT_SECRET = "FIRSTER_SSO_CLIENT_SECRET",
  FIRSTER_SSO_CLIENT_SCOPE = "FIRSTER_SSO_CLIENT_SCOPE",

  KP_SSO_ENDPOINT = "KP_SSO_ENDPOINT",
  KP_SSO_CLIENT_ID = "KP_SSO_CLIENT_ID",
  KP_SSO_CLIENT_SECRET = "KP_SSO_CLIENT_SECRET",
  KP_SSO_CLIENT_SCOPE = "KP_SSO_CLIENT_SCOPE",

  LOGISTICS_SSO_INTROSPECTION_ENDPOINT = "LOGISTICS_SSO_INTROSPECTION_ENDPOINT",
  LOGISTICS_SSO_CLIENT_ID = "LOGISTICS_SSO_CLIENT_ID",
  LOGISTICS_SSO_CLIENT_SECRET = "LOGISTICS_SSO_CLIENT_SECRET",

  KERRY_API_HOOK_APP_ID = "KERRY_API_HOOK_APP_ID",
  KERRY_API_HOOK_APP_KEY = "KERRY_API_HOOK_APP_KEY",
}

export class ConfigService {
  private _configuration: Config;

  constructor() {
    this._preload();

    const loadConfig: Config = (() => {
      return {
        db: {
          host: this._getEnv(EnvironmentVariable.MONGO_HOST),
          port: _.toNumber(this._getEnv(EnvironmentVariable.MONGO_PORT)),
          database: this._getEnv(EnvironmentVariable.MONGO_DATABASE),
          replicaSetName: this._getEnv(
            EnvironmentVariable.MONOG_REPLICA_SET_NAME
          ),
          user: this._getEnv(EnvironmentVariable.MONGO_USER),
          password: this._getEnv(EnvironmentVariable.MONGO_PASSWORD),
        },
        dbPostgres: {
          host: this._getEnv(EnvironmentVariable.POSTGRES_HOST),
          port: _.toNumber(this._getEnv(EnvironmentVariable.POSTGRES_PORT)),
          database: this._getEnv(EnvironmentVariable.POSTGRES_DATABASE),
          user: this._getEnv(EnvironmentVariable.POSTGRES_USER),
          password: this._getEnv(EnvironmentVariable.POSTGRES_PASSWORD),
        },
        platform: {
          firster: {
            apiEndpoint: this._getEnv(EnvironmentVariable.FIRSTER_API_ENDPOINT),
          },
          kp: {
            apiEndpoint: this._getEnv(EnvironmentVariable.KP_API_ENDPOINT),
          },
        },
        appInsights: {
          key: this._getEnv(EnvironmentVariable.AZURE_APP_INSIGHTS_KEY),
          roleName: this._getEnv(EnvironmentVariable.AZURE_APP_INSIGHTS_ROLE),
          developerMode: this._getEnv(
            EnvironmentVariable.AZURE_APP_INSIGHTS_DEV_MODE
          ),
          samplingPercentage: this._getEnv(
            EnvironmentVariable.AZURE_APP_INSIGHTS_PERCENTAGE
          ),
        },
        courier: {
          scg: {
            apiEndpoint: this._getEnv(EnvironmentVariable.SCG_API_ENDPOINT),
            username: this._getEnv(EnvironmentVariable.SCG_USERNAME),
            password: this._getEnv(EnvironmentVariable.SCG_PASSWORD),
          },
          cj: {
            apiEndpoint: this._getEnv(EnvironmentVariable.CJ_API_ENDPOINT),
          },
          kerry: {
            apiEndpoint: this._getEnv(EnvironmentVariable.KERRY_API_ENDPOINT),
            appId: this._getEnv(EnvironmentVariable.KERRY_API_APP_ID),
            appKey: this._getEnv(EnvironmentVariable.KERRY_API_APP_KEY),
          },
        },
        notification: {
          email: {
            host: this._getEnv(EnvironmentVariable.EMAIL_HOST),
            username: this._getEnv(EnvironmentVariable.EMAIL_USERNAME),
            password: this._getEnv(EnvironmentVariable.EMAIL_PASSWORD),
            recieverEmailTest: this._getEnv(EnvironmentVariable.EMAIL_TEST),
            providerEmail: this._getEnv(
              EnvironmentVariable.EMAIL_PROVIDER_NAME
            ),
            port: this._getEnv(EnvironmentVariable.EMAIL_PORT),
            isSecure: this._getEnv(EnvironmentVariable.EMAIL_SECURE),
          },
        },
        ssoPlatform: {
          firster: {
            getTokenEndpoint: this._getEnv(
              EnvironmentVariable.FRISTER_SSO_TOKEN_ENDPOINT
            ),
            clientId: this._getEnv(EnvironmentVariable.FIRSTER_SSO_CLIENT_ID),
            clientSecret: this._getEnv(
              EnvironmentVariable.FIRSTER_SSO_CLIENT_SECRET
            ),
            scope: this._getEnv(EnvironmentVariable.FIRSTER_SSO_CLIENT_SCOPE),
          },
          kp: {
            getTokenEndpoint: this._getEnv(EnvironmentVariable.KP_SSO_ENDPOINT),
            clientId: this._getEnv(EnvironmentVariable.KP_SSO_CLIENT_ID),
            clientSecret: this._getEnv(
              EnvironmentVariable.KP_SSO_CLIENT_SECRET
            ),
            scope: this._getEnv(EnvironmentVariable.KP_SSO_CLIENT_SCOPE),
          },
        },
        sso: {
          validateTokenEndpoint: this._getEnv(
            EnvironmentVariable.LOGISTICS_SSO_INTROSPECTION_ENDPOINT
          ),
          clientId: this._getEnv(EnvironmentVariable.LOGISTICS_SSO_CLIENT_ID),
          clientSecret: this._getEnv(
            EnvironmentVariable.LOGISTICS_SSO_CLIENT_SECRET
          ),
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

  public getDbConfig(): DatabaseConfig {
    return {
      host: this._configuration.db.host,
      port: this._configuration.db.port,
      database: this._configuration.db.database,
      replicaSetName: this._configuration.db.replicaSetName,
      user: this._configuration.db.user,
      password: this._configuration.db.password,
    };
  }
  public getAppInsightsConfig(): AppInsightsConfig {
    return {
      key: this._configuration.appInsights.key,
      roleName: this._configuration.appInsights.roleName,
      developerMode: this._configuration.appInsights.developerMode,
      samplingPercentage: this._configuration.appInsights.samplingPercentage,
    };
  }

  public getCourierConfig(): CourierConfig {
    return {
      scg: this._configuration.courier.scg,
      cj: this._configuration.courier.cj,
      kerry: this._configuration.courier.kerry,
    };
  }
  public getPlatformConfig(): PlatformConfig {
    return {
      firster: this._configuration.platform.firster,
      kp: this._configuration.platform.kp,
    };
  }

  public getNotificationConfig(): NotificationConfig {
    return {
      email: {
        host: this._configuration.notification.email.host,
        username: this._configuration.notification.email.username,
        password: this._configuration.notification.email.password,
        recieverEmailTest:
          this._configuration.notification.email.recieverEmailTest,
        providerEmail: this._configuration.notification.email.providerEmail,
        port: this._configuration.notification.email.port,
        isSecure: this._configuration.notification.email.isSecure,
      },
    };
  }

  public getSsoPlatformConfig(): SsoPlatformConfig {
    return {
      firster: {
        getTokenEndpoint:
          this._configuration.ssoPlatform.firster.getTokenEndpoint,
        clientId: this._configuration.ssoPlatform.firster.clientId,
        clientSecret: this._configuration.ssoPlatform.firster.clientSecret,
        scope: this._configuration.ssoPlatform.firster.scope,
      },
      kp: {
        getTokenEndpoint: this._configuration.ssoPlatform.kp.getTokenEndpoint,
        clientId: this._configuration.ssoPlatform.kp.clientId,
        clientSecret: this._configuration.ssoPlatform.kp.clientSecret,
        scope: this._configuration.ssoPlatform.kp.scope,
      },
    };
  }

  public getSsoConfig(): SsoConfig {
    return {
      validateTokenEndpoint: this._configuration.sso.validateTokenEndpoint,
      clientId: this._configuration.sso.clientId,
      clientSecret: this._configuration.sso.clientSecret,
    };
  }
}
