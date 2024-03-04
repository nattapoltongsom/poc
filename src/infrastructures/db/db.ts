import { MongoClient, Db, Collection } from 'mongodb'
import { ConfigService } from '../../config/service'

export enum CollectionName {
    ORDERS = 'orders',
    SUBORDERS = 'sub_orders',
    LOGS = 'logs',
}

export class Database {
    private _db: Db

    constructor(configService: ConfigService, private readonly client: MongoClient) {
        this._db = this.client.db(configService.getDbConfig().database)
        this._db.stats().catch((error: Error) => {
            console.error(error)
            client.close()
            process.exit(1)
        })
    }

    public getDb(): Db {
        return this._db
    }

    public getCollection(collectionName: CollectionName): Collection {
        return this._db.collection(collectionName)
    }
}
