"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Finance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Finance.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Finance.init(
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

      type: {
        type: DataTypes.ENUM("pemasukan", "pengeluaran"),
      },

      category: {
        type: DataTypes.STRING(100),
      },

      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },

      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Finance",
      tableName: "finance",
    },
  );
  return Finance;
};
