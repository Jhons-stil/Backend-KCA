"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("habits", {
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
      habit_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      target_frequency: {
        type: Sequelize.ENUM("harian", "mingguan"),
        allowNull: false,
      },

      current_streak: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },

      last_completed: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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
    await queryInterface.dropTable("habits");
  },
};
