import mysql from 'mysql2/promise'

export async function query(sql, values = []) {
  const config = {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
  const connection = await mysql.createConnection(config)
  try {
    const [rows] = await connection.execute(sql, values)
    return rows
  } finally {
    await connection.end()
  }
}
