require('dotenv').config();
const env=process.env;

  const development = {
    username: "root",
    password: env.PASSWORD,
    database: "User",
    host: "127.0.0.1",
    dialect: "mysql"
  };

  const test = {
    username: "root",
    password: env.PASSWORD,
    database: "User",
    host: "127.0.0.1",
    dialect: "mysql"
  }

  const production = {
    username: "root",
    password: env.PASSWORD,
    database: "User",
    host: "127.0.0.1",
    dialect: "mysql"
  }

module.exports = { development, production, test}