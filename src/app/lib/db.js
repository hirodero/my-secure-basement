import mysql from 'mysql2/promise'

export async function query(sql, values = []) {
  const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT 
}

  const connection = await mysql.createConnection(config)
  try {
    const [rows] = await connection.execute(sql, values)
    return rows
  } finally {
    await connection.end()
  }
}
