/* eslint-disable */
const dotenv = require('dotenv')
const path = require('path')
const env = 'local' // when deployment to cluster k8s Unused variable NODE_ENV
const envFilePath = path.resolve(__dirname, `${env}.env`)
dotenv.config({ path: envFilePath, encoding: 'utf-8' })

module.exports = {
    defaultEnv: 'local',
    local: {
        driver: 'pg',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    },
}