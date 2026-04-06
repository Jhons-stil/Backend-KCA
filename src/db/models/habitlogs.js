'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HabitLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     HabitLogs.belongsTo(models.Habits, {
       foreignKey: "habit_id",
       as:"habit"
     })
    }
  }
  HabitLogs.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      habit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:"habits",
          key:"id"
        }
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull:false,  
      },
      status: {
        type: DataTypes.ENUM("done", "miss"),
        allowNull:false,
      },

  }, {
    sequelize,
    modelName: 'HabitLogs',
    tableName: 'habit_logs',
  });
  return HabitLogs;
};