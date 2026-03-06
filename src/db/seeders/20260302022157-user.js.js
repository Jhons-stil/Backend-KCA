"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordAcak = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert("user", [
      {
        username: "admin",
        email: "admin@gmail.com",
        password: passwordAcak,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};
