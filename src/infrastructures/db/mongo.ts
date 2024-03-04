import { MongoClient, MongoClientOptions } from 'mongodb'
import _ from 'lodash'

import { ConfigService } from '../../config/service'

interface CustomMongoClientOptions {
    user: string
    password: string
    replicaSetName: string
    database: string
}
export class MongoDBClient {
    private _mongoClient: Promise<MongoClient>

    constructor(configService: ConfigService) {
        const { host, port = 27017, replicaSetName, user, password, database } = configService.getDbConfig()
        const mappedHost = (host ?? '')
            .split(',')
            .map((item) => `${item}:${port}`)
            .join(',')
        const url = `mongodb://${mappedHost}`

        const fulfillOptions = [
            {
                shouldSet: (item: CustomMongoClientOptions) => !_.isNil(item.user) && !_.isNil(item.password),
                set: (accum: MongoClientOptions, item: CustomMongoClientOptions) => {
                    accum.auth = {
                        user: item.user,
                        password: item.password,
                    }
                    return accum
                },
            },
            {
                shouldSet: (item: CustomMongoClientOptions) => !_.isNil(item.replicaSetName),
                set: (accum: MongoClientOptions, item: CustomMongoClientOptions) => {
                    accum.replicaSet = item.replicaSetName
                    return accum
                },
            },
            {
                shouldSet: (item: CustomMongoClientOptions) =>
                    !_.isNil(item.database) && !_.isNil(item.user) && !_.isNil(item.password),
                set: (accum: MongoClientOptions, item: CustomMongoClientOptions) => {
                    accum.authSource = item.database
                    return accum
                },
            },
        ]

        const data: CustomMongoClientOptions = {
            user: user,
            password: password,
            replicaSetName: replicaSetName,
            database: database,
        }

        const options: MongoClientOptions = fulfillOptions.reduce(
            (accum: MongoClientOptions, option) => {
                if (option.shouldSet(data)) {
                    option.set(accum, data)
                }
                return accum
            },
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000,
                readPreference: 'secondaryPreferred',
            }
        )

        this._mongoClient = MongoClient.connect(url, options)
    }

    public getClient(): Promise<MongoClient> {
        return this._mongoClient.catch((error: Error) => {
            console.error('error: cannot connect to database server')
            console.error(error)
            process.exit(1)
        })
    }
}
