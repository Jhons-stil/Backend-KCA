const { body, validationResult } = require("express-validator");
const { resGagal } = require("../../payloads/payload.js");
const { cariHabitLogsById } = require("../../http/habit_logs/service.js");

const cekId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await cariHabitLogsById(id);
    if (!user) {
      return resGagal(res, 404, "error", "Data tidak ditemukan");
    }
    next();
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const cekError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const arrayError = errors.array().map((err) => {
      return {
        field: err.path,
        message: err.msg,
      };
    });

    return resGagal(res, 400, "error", "Terjadi kesalahan", arrayError);
  }

  next();
};

const validateCreateHabitLogs = [
  body("status")
    .notEmpty()
    .withMessage("status wajib diisi")
    .bail()
    .isIn(["done", "miss"])
    .withMessage("status hanya boleh done atau miss"),
];

const validateUpdateHabitLogs = [
  body("status")
    .optional({ checkFalsy: true })
    .isIn(["done", "miss"])
    .withMessage("status hanya boleh done atau skip"),
];

module.exports = {
  cekId,
  cekError,
  validateCreateHabitLogs,
  validateUpdateHabitLogs,
};
