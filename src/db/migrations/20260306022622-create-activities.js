"use strict";

const { ENUM } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING(100),
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("1", "2"),
        defaultValue: "1",
      },
      categories: {
        type: Sequelize.ENUM("kesehatan", "ibadah", "produktif"),
      },
      mood_rating: {
        type: Sequelize.ENUM("1", "2", "3", "4", "5"),
        defaultValue: "1",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("activities");
  },
};
