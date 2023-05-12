import * as dotenv from 'dotenv'
dotenv.config()

import Sequelize from 'sequelize'

const user = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const host = process.env.POSTGRES_HOST
const database = process.env.POSTGRES_DB
const port = process.env.POSTGRES_PORT

const db = new Sequelize(
    database, user, password,
    { 
        dialect: 'postgres', 
        host: host,
        port: port,
    }
)

export default db