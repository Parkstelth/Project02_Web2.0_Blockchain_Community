require('dotenv').config();
const env=process.env;

  const development = {
    username: "root",
    password: env.PASSWORD,
    database: "User",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00"
  };

  const test = {
    username: "root",
    password: env.PASSWORD,
    database: "User",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00"
  }

  const production = {
    username: "root",
    password: env.PASSWORD,
    database: "User",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00"
  }

module.exports = { development, production, test}