import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();


interface postgresConfig {
    user: string|undefined,
    host: string|undefined,
    database: string|undefined,
    password: string|undefined,
    port: number|undefined
}


const config: postgresConfig = {
   user:  process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: parseInt(process.env.DB_PORT as string, 10),
}

const db = new Pool(config)

export default db;