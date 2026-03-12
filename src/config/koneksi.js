// ini adalah file konfig ke database

const { Sequelize } = require("sequelize");
const config = require("./database.js").development;

// susunan koneksi,
// nama_db, username, password, {host, dialect}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: true,
  },
);

module.exports = sequelize;
