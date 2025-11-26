require('dotenv').config();
import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({
    connectionString
});

pool.on("connect", () => {
    console.log("Connection pool established with database");
})

export default pool;