const db = require("../../db/models");

const { HabitLogs } = db;

const tampilHabitLogs = async () => {
  return await HabitLogs.findAll({
    where: { habit_id },
    order: [["date", "DESC"]],
  });
};

const tambahHabitLogs = async (body) => {
  return await HabitLogs.create(body);
};

const ubahHabitLogs = async (id, body) => {
  const data = await HabitLogs.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusHabitLogs = async (id) => {
  return await HabitLogs.destroy({ where: { id: id } });
};

module.exports = {
  tampilHabitLogs,

  tambahHabitLogs,
  ubahHabitLogs,
  hapusHabitLogs,
};
