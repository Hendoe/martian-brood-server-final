module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || "postgresql://martian_brood:pap@localhost/martian_brood",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://martian_brood:pap@localhost/status",
};