'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('habit_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      habit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"habits",
          key:"id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull:false,  
      },
      status: {
        type: Sequelize.ENUM("done", "miss"),
        allowNull:false,
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
      }
    });
    await queryInterface.addConstraint("habit_logs", {
      fields: ["habit_id", "date"],
      type: 'unique',
      name: "unique_habit_date"
    })  
  },

  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('habit_logs');
  }
};