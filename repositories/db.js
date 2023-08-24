import * as dotenv from 'dotenv'
dotenv.config()

import Sequelize from 'sequelize'

const { 
    POSTGRES_DB, 
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT 
} = process.env

const db = new Sequelize(
    POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
    }
)

export default db