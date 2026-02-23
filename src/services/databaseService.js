// src/services/databaseService.js
const mariadb = require("mariadb");

// Pool = återanvändbara DB-connections (bättre än att öppna/stänga varje gång)
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  connectionLimit: 5,
});


async function query(sql, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, params);
    return result;
  } catch (err) {

    console.error("DB query error:", err);
    throw err; 
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { pool, query };