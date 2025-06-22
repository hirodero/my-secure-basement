import mysql from 'mysql2/promise'

export async function query(sql, values = []) {
  const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}

  const connection = await mysql.createConnection(config)
  try {
    const [rows] = await connection.execute(sql, values)
    return rows
  } finally {
    await connection.end()
  }
}
