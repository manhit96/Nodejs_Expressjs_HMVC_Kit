const { resolve } = require("path");
const { DATABASE } = require(resolve("config"))();
const { TYPE, HOST, PORT, NAME, USERNAME, PASSWORD } = DATABASE;
const { Sequelize } = require("sequelize");

const dataSource = new Sequelize(NAME, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: TYPE,
  logging: false,
});

module.exports = dataSource;
