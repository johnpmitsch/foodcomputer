module.exports = {
  development: {
    username: "foodcomputer",
    password: "foodcomputer",
    database: "foodcomputer_development",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: "foodcomputer",
    password: "foodcomputer",
    database: "foodcomputer_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
    operatorsAliases: false
  },
  production: {
    username: process.env.FCDB_USERNAME,
    password: process.env.FCDB_PASSWORD,
    database: process.env.FCDB_NAME,
    host: process.env.FCDB_HOSTNAME,
    dialect: "postgres",
    operatorsAliases: false
  }
};
