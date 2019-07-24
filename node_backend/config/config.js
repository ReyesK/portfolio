require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.NODE_BACKEND_DB_USER,
    "password": process.env.NODE_BACKEND_DB_PASS,
    "database": process.env.NODE_BACKEND_DB_NAME,
    "host": process.env.NODE_BACKEND_DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.NODE_BACKEND_DB_USER,
    "password": process.env.NODE_BACKEND_DB_PASS,
    "database": process.env.NODE_BACKEND_DB_NAME,
    "host": process.env.NODE_BACKEND_DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.NODE_BACKEND_DB_USER,
    "password": process.env.NODE_BACKEND_DB_PASS,
    "database": process.env.NODE_BACKEND_DB_NAME,
    "host": process.env.NODE_BACKEND_DB_HOST,
    "dialect": "postgres"
  }
}
