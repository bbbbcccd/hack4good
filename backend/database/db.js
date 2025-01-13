import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  host: "db",
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

export default pool;
