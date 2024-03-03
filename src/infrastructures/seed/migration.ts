import { PostgresPool } from '../db/postgres'
import { Pool } from 'pg'
import { readFileSync } from 'fs'
import { ConfigService } from '../../config/service'

if (process.env.NODE_ENV !== 'production') {
    try {
        const configService = new ConfigService()
        
        const seedQuery = readFileSync(__dirname + '/seed.sql', { encoding: 'utf8' })
        const postgresDB = new PostgresPool(configService.getPostgresDbConfig())
        postgresDB.query(seedQuery)
    } catch (err) {
        console.log('error:', err)
    }
}
