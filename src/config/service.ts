import dotenv from 'dotenv'
import path from 'path'
import _ from 'lodash'

export interface DatabaseConfig {
    host: string
    port: number
    database: string
    user: string
    password: string
}
export interface RedisDatabaseConfig {
    uri: string
}
interface AppInsightsConfig {
    key: string
    roleName: string
    developerMode: boolean
    samplingPercentage: number
}

interface Config {
    dbPostgres: DatabaseConfig
    platform: PlatformConfig
    aws: AWSConfig
    jwt: JWTConfig
    appInsights: AppInsightsConfig
    dbRedis: RedisDatabaseConfig
}

export interface JWTConfig {
    secret: string
    expire: string
}

export interface PlatformConfig {
    firster: {
        apiBpEndpoint: string
        apiOrderHistory: string
        apiProductEndpoint: string
    }
}

export interface AWSConfig {
    s3: {
        accessKeyId: string
        secretAccessKey: string
        region: string
        bucket: string
    }
}
enum EnvironmentVariable {
    POSTGRES_HOST = 'POSTGRES_HOST',
    POSTGRES_PORT = 'POSTGRES_PORT',
    POSTGRES_DATABASE = 'POSTGRES_DATABASE',
    POSTGRES_USER = 'POSTGRES_USER',
    POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
    FIRSTER_BP_API_ENDPOINT = 'FIRSTER_BP_API_ENDPOINT',
    FIRSTER_PRODUCT_API_ENDPOINT = 'FIRSTER_PRODUCT_API_ENDPOINT',
    FIRSTER_ORDER_HISTORY_API_ENDPOINT = 'FIRSTER_ORDER_HISTORY_API_ENDPOINT',
    REDIS_URI = 'REDIS_URI',
    REDIS_EXPIRED = 'REDIS_EXPIRED',
    JWT_SECRET = 'JWT_SECRET',
    JWT_EXPIRE = 'JWT_EXPIRE',
    AZURE_APP_INSIGHTS_KEY = 'AZURE_APP_INSIGHTS_KEY',
    AZURE_APP_INSIGHTS_ROLE = 'AZURE_APP_INSIGHTS_ROLE',
    AZURE_APP_INSIGHTS_DEV_MODE = 'AZURE_APP_INSIGHTS_DEV_MODE',
    AZURE_APP_INSIGHTS_PERCENTAGE = 'AZURE_APP_INSIGHTS_PERCENTAGE',
    AWS_S3_ACCESS_KEY = 'AWS_S3_ACCESS_KEY',
    AWS_S3_SECRET_KEY = 'AWS_S3_SECRET_KEY',
    AWS_S3_BUCKET_REGION = 'AWS_S3_BUCKET_REGION',
    AWS_S3_DESTINATION_BUCKET = 'AWS_S3_DESTINATION_BUCKET',
}

export class ConfigService {
    private _configuration: Config

    constructor() {
        this._preload()

        const loadConfig: Config = (() => {
            return {
                dbRedis: {
                    uri: this._getEnv(EnvironmentVariable.REDIS_URI),
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
                        apiBpEndpoint: this._getEnv(EnvironmentVariable.FIRSTER_BP_API_ENDPOINT),
                        apiProductEndpoint: this._getEnv(EnvironmentVariable.FIRSTER_PRODUCT_API_ENDPOINT),
                        apiOrderHistory: this._getEnv(EnvironmentVariable.FIRSTER_ORDER_HISTORY_API_ENDPOINT),
                    },
                },
                aws: {
                    s3: {
                        accessKeyId: this._getEnv(EnvironmentVariable.AWS_S3_ACCESS_KEY),
                        secretAccessKey: this._getEnv(EnvironmentVariable.AWS_S3_SECRET_KEY),
                        region: this._getEnv(EnvironmentVariable.AWS_S3_BUCKET_REGION),
                        bucket: this._getEnv(EnvironmentVariable.AWS_S3_DESTINATION_BUCKET),
                    },
                },
                jwt: {
                    secret: this._getEnv(EnvironmentVariable.JWT_SECRET),
                    expire: this._getEnv(EnvironmentVariable.JWT_EXPIRE),
                },
                appInsights: {
                    key: this._getEnv(EnvironmentVariable.AZURE_APP_INSIGHTS_KEY),
                    roleName: this._getEnv(EnvironmentVariable.AZURE_APP_INSIGHTS_ROLE),
                    developerMode: this._getEnv(EnvironmentVariable.AZURE_APP_INSIGHTS_DEV_MODE),
                    samplingPercentage: this._getEnv(EnvironmentVariable.AZURE_APP_INSIGHTS_PERCENTAGE),
                },
            }
        })()

        this._configuration = loadConfig
    }

    private _preload() {
        const env = process.env.NODE_ENV ?? 'local'

        const isInterestedEnv = ['local', 'e2e'].some((interestedEnv) => interestedEnv === env)
        if (isInterestedEnv) {
            const envFilePath = path.resolve(__dirname, `${env}.env`)
            dotenv.config({ path: envFilePath, encoding: 'utf-8' })
        }
    }

    private _getEnv(variable: EnvironmentVariable): any {
        return process.env[variable]
    }

    public getPostgresDbConfig(): DatabaseConfig {
        return {
            host: this._configuration.dbPostgres.host,
            port: this._configuration.dbPostgres.port,
            database: this._configuration.dbPostgres.database,
            user: this._configuration.dbPostgres.user,
            password: this._configuration.dbPostgres.password,
        }
    }
    public getRedisConfig(): RedisDatabaseConfig {
        return {
            uri: this._configuration.dbRedis.uri,
        }
    }
    public getPlatformConfig(): PlatformConfig {
        return {
            firster: this._configuration.platform.firster,
        }
    }
    public getAWSConfig(): AWSConfig {
        return {
            s3: this._configuration.aws.s3,
        }
    }
    public getJWTSecret(): JWTConfig {
        return {
            secret: this._configuration.jwt.secret,
            expire: this._configuration.jwt.expire,
        }
    }
    public getAppInsightsConfig(): AppInsightsConfig {
        return {
            key: this._configuration.appInsights.key,
            roleName: this._configuration.appInsights.roleName,
            developerMode: this._configuration.appInsights.developerMode,
            samplingPercentage: this._configuration.appInsights.samplingPercentage,
        }
    }
}
