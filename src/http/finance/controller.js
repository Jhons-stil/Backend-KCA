const {
  tambahFinance,
  tampilKeuangan,
  ubahFinance,
  hapusFinance,
  cariFinanceById,
} = require("../finance/service.js")



const { resSukses, resGagal } = require("../../payloads/payload.js");

const getAllFinance = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await tampilKeuangan(userId);
    return resSukses(res, 200, "succes", "Data keuangan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createFinance = async (req, res) => {
  try {
    const { type, category, amount, date, note } = req.body;
    const userId = req.user.id;
    const body = {
      user_id: userId,
      type,
      category,
      amount,
      date,
      note,
    };
    const finance = await tambahFinance(body);
    return resSukses(res, 201, "success", "Data berhasil ditambahkan", finance);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateFinance = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = req.user.id;

    const dataFinance = await cariFinanceById(id);

    if (dataFinance.user_id !== user_id) {
      return resGagal(res, 403, "error", "Maaf, akses ditolak");
    }
    const { type, category, amount, date, note } = req.body;

    const updateData = {};

    if (type && type.trim() !== "") updateData.type = type.toLowerCase().trim();
    if (category && category.trim() !== "") updateData.category = category;
    if (amount) updateData.amount = amount;
    if (note !== undefined) updateData.note = note;

    if (date && date.trim() !== "") {
      const [day, month, year] = date.split("-");
      updateData.date = `${year}-${month}-${day}`;
    }

    const data = await ubahFinance(id, updateData);
    return resSukses(res, 200, "success", "Data berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteFinance = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = req.user.id;

    const dataFinance = await cariFinanceById(id);

    if (dataFinance.user_id !== user_id) {
      return resGagal(res, 403, "error", "Maaf, akses ditolak");
    }

    await hapusFinance(id);
    return resSukses(res, 201, "success", "Data berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};




module.exports = {
  getAllFinance,
  createFinance,
  updateFinance,
  deleteFinance,
};

