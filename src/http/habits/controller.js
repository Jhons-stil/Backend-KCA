const {
  tambahHabits,
  tampilHabits,
  cariHabitsById,
  ubahHabits,
  hapusHabits,
  findHabits,
} = require("./service.js");

const { resSukses, resGagal } = require("../../payloads/payload.js");

const readHabits = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await tampilHabits(userId);
    return resSukses(res, 200, "succes", "Data Habits", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const getHabitsById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cariHabitsById(id);
    return resSukses(res, 200, "success", "Data berdasarkan ID", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createHabits = async (req, res) => {
  try {
    const { habit_name, target_frequency } = req.body;
    const user_id = req.user.id;

    const data = await tambahHabits({
      user_id,
      habit_name,
      target_frequency,
      current_streak: 0,
      last_completed: null,
    });
    return resSukses(res, 201, "success", "Habit berhasil ditambahkan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateHabits = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { habit_name, target_frequency } = req.body;

    const body = {
      habit_name,
      target_frequency,
    };

    const data = await ubahHabits(id, body);
    return resSukses(res, 200, "success", "Data berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteHabits = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await hapusHabits(id);
    return resSukses(res, 200, "success", "Data berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const getHabitsByUser = async (req, res) => {
  try {
    const user_id = req.user.id;

    const data = await findHabits(user_id);

    if (!data || data.length === 0) {
      return resGagal(res, 404, "error", "Data tidak ditemukan");
    }
    return resSukses(res, 200, "success", "Data habits user", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  readHabits,
  getHabitsById,
  createHabits,
  updateHabits,
  deleteHabits,
  getHabitsByUser,
};
