import { createPool, Pool, QueryError } from 'mysql2'
import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

export const pool: Pool = createPool({
    namedPlaceholders: true,
    multipleStatements: true,
    charset: 'utf8',
    host: process.env.db_host,
    port: parseInt(process.env.db_port),
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name,
})

export const handleSqlError = (error: QueryError) => {
    console.log(`[${Date.now()}] db_error:`, error.code)
    switch (error.code) {
        case "ECONNREFUSED": //server inaccessible
        case "ER_ACCESS_DENIED_ERROR": //database credential incorrect 
        case "ER_NO_SUCH_TABLE": //database table not found 
        case "ER_BAD_DB_ERROR": //database name not found 
        case "ER_BAD_FIELD_ERROR": /* sql field error */ {
            return "Internal Server Error";
        }
        case "ER_DUP_ENTRY": /* data duplicate */ {
            return "Duplicate Data"
        }
        default: {
            return "Unknown Error"
        }
    }
}
