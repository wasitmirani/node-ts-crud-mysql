import { createPool, Pool } from 'mysql2/promise'
require('dotenv').config();

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        connectionLimit: 10
    });
    return connection;
}