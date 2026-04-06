"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activities.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Activities.init(
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
      title: {
        type: DataTypes.STRING(100),
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("1", "2", "3"),
        defaultValue: "1",
      },
      categories: {
        type: DataTypes.ENUM("kesehatan", "produktif"),
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Activities",
      tableName: "activities",
    },
  );
  return Activities;
};
