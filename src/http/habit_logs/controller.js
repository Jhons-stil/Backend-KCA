const {
  tampilHabitLogs,
  tambahHabitLogs,
  ubahHabitLogs,
  hapusHabitLogs,
} = require("./service.js");

const { resSukses, resGagal } = require("../../payloads/payload.js");
const { cariHabitsById, ubahHabits } = require("../habits/service.js");

const getAllHabitLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await tampilHabitLogs(userId);
    return resSukses(res, 201, "success", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createHabitLogs = async (req, res) => {
  try {
    const habit_id = parseInt(req.params.id);
    const { status } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const habit = await cariHabitsById(habit_id);
    if (!habit) {
      return resGagal(res, 404, "error", "Habit tidak ditemukan");
    }

    const log = await tambahHabitLogs({
      habit_id,
      date: today,
      status,
    });

    if (status === "done") {
      await ubahHabits(habit_id, {
        current_streak: habit.current_streak + 1,
        last_completed: today,
      });
    }

    return resSukses(res, 201, "success", "Habit berhasil dicheck", log);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateHabitLogs = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const body = {
      status,
    };

    const data = await ubahHabitLogs(id, body);

    return resSukses(res, 200, "success", "Habit Log berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteHabitLogs = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await hapusHabitLogs(id);

    return resSukses(res, 200, "success", "Habit Log berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const getLogsByHabit = async (req, res) => {
  try {
    const habit_id = parseInt(req.params.id);

    const data = await cariLogsByHabit(habit_id);

    if (!data || data.length === 0) {
      return resGagal(res, 404, "error", "Data tidak ditemukan");
    }
    return resSukses(res, 200, "success", "Data habits log", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
module.exports = {
  getAllHabitLogs,
  createHabitLogs,
  updateHabitLogs,
  deleteHabitLogs,
  getLogsByHabit,
};
