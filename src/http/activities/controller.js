const { resSukses, resGagal } = require("../../payloads/payload");
const {
  tambahActivities,
  tampilActivities,
  cariActivitiById,
  ubahActivities,
} = require("./service");

const createActivities = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user.id;
    const body = { user_id: user, title, description };
    const data = await tambahActivities(body);
    return resSukses(
      res,
      200,
      "success",
      "Berhasil menambahkan Activities",
      data,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const readActivities = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await tampilActivities(userId);

    return resSukses(res, 200, "success", "Data Activities", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateActivities = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const dataActivities = await cariActivitiById(id);

    if (!dataActivities) {
      return resGagal(res, 404, "error", "Maaf, data tidak ditemukan");
    }

    if (dataActivities.user_id !== userId) {
      return resGagal(res, 403, "error", "Maaf, akses ditolak!!");
    }
    const { title, status, mood_rating } = req.body;

    const updateData = {};

    updateData.title = title ? title : dataActivities.title;
    updateData.status = status ? status : dataActivities.status;
    updateData.mood_rating = mood_rating
      ? mood_rating
      : dataActivities.mood_rating;

    const data = await ubahActivities(id, updateData);
    return resSukses(res, 200, "success", "Data berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteActivities = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const dataActivities = await cariActivitiById(id);

    if (!dataActivities) {
      return resGagal(res, 404, "error", "Maaf, data tidak ditemukan");
    }

    if (dataActivities.user_id !== userId) {
      return resGagal(res, 403, "error", "Maaf, akses ditolak!!");
    }
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
module.exports = {
  createActivities,
  readActivities,
  updateActivities,
  deleteActivities,
};
