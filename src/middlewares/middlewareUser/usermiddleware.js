const { validationResult, body } = require("express-validator");
const { resGagal } = require("../../payloads/payload.js");
const db = require("../../db/models/index.js");
const { User } = db;
const fs = require("fs/promises");
const bcrypt = require("bcrypt");

const cekError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() || req.validatorFileError) {
    if (req.file) {
      const filePath = req.file.path;
      fs.unlink(filePath);
    }
    const arrayError = errors.array().map((err) => {
      return {
        field: err.path,
        message: err.msg,
      };
    });

    if (req.validatorFileError) {
      arrayError.push({
        field: "profil",
        message: req.validatorFileError,
      });
    }
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

cekUpdateUser = [
  body("username")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Username wajib diisi")
    .bail()
    .isLength({ min: 5 })
    .bail()
    .withMessage("username minimal 5 karakter"),
  body("email")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email wajib diisi")
    .bail()
    .isEmail()
    .withMessage("Format email tidak valid"),
];

cekpassword = [
  body("passwordLama")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .custom(async (value, { req }) => {
      const user = req.user;
      const passwordValid = await bcrypt.compare(value, user.password);

      if (!passwordValid) {
        throw new Error("Password lama salah!!!");
      }
      return true;
    }),
  body("passwordBaru")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password baru minimal 6 karakter")
    .custom((value, { req }) => {
      if (value === req.body.passwordLama) {
        throw new Error("Password baru tidak boleh sama dengan password lama");
      }

      return true;
    }),
  body("konfirmasi_password")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.passwordBaru) {
        throw new Error("Konfirmasi password tidak cocok");
      }
      return true;
    }),
];
module.exports = {
  cekRegister,
  cekUpdateUser,
  cekpassword,
  cekError,
};
