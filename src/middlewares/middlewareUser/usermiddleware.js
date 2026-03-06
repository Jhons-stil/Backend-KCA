const { validationResult, body } = require("express-validator");
const { resGagal } = require("../../payloads/payload.js");
const db = require("../../db/models/index.js");
const { User } = db;

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

const cekRegister = [
  body("username")
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });

      if (user) {
        throw new Error("Username sudah ada, silakan isi yang lain");
      }
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Format email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("konfirmasi-password")
    .notEmpty()
    .withMessage("Konfirmasi password wajib diisi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password tidak cocok");
      }
      return true;
    }),
];

module.exports = {
  cekRegister,
  cekError,
};
