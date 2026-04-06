const {
  tambahHabits,
  tampilHabits,

  ubahHabits,
  hapusHabits,
  findHabits,
  cariHabitsById,
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

const createHabits = async (req, res) => {
  try {
    const { habit_name, target_frequency } = req.body;
    const user_id = req.user.id;

    const body = {
      user_id,
      habit_name,
      target_frequency,
      current_streak: 0,
      last_completed: null,
    };

    const data = await tambahHabits(body);
    return resSukses(res, 201, "success", "Habit berhasil ditambahkan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateHabits = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const dataHabits = await cariHabitsById(id);

    if (!dataHabits) {
      return resGagal(res, 404, "error", "Maaf, data tidak ditemukan");
    }

    if (dataHabits.user_id !== userId) {
      return resGagal(res, 403, "error", "Maaf, akses ditolak!!");
    }

    const { habit_name, target_frequency, current_streak, last_completed } =
      req.body;

    const updateData = {};

    updateData.habit_name = habit_name ? habit_name : dataHabits.habit_name;
    updateData.target_frequency = target_frequency
      ? target_frequency
      : dataHabits.target_frequency;
    updateData.current_streak = current_streak
      ? current_streak
      : dataHabits.current_streak;
    updateData.last_completed = last_completed
      ? last_completed
      : dataHabits.last_completed;

    const data = await ubahHabits(id, updateData);
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

module.exports = {
  readHabits,
  createHabits,
  updateHabits,
  deleteHabits,
};
