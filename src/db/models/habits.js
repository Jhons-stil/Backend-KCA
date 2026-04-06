"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Habits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Habits.belongsTo(models.User, {
      foreignKey: "user_id",
      as:"user"
    });

    Habits.hasMany(models.HabitLogs,{
      foreignKey: "habit_id",
      as:"logs"
    })
    }
  }
  Habits.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },

      habit_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      target_frequency: {
        type: DataTypes.ENUM("harian", "mingguan"),
        allowNull: false,
      },

      current_streak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      last_completed: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "habits",
      modelName: "Habits",
    },
  );
  return Habits;
};
