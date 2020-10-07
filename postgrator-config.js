require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DB_URL,
  // "connectionString": process.env.DATABASE_URL,

}