const { body } = require("express-validator");

const cekFinanceUpdate = [
  body("type")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Type harus berupa text")
    .bail()
    .trim()
    .toLowerCase()
    .isIn(["pemasukan", "pengeluaran"])
    .withMessage("type harus pilih salah satu: pemasukan atau pengeluaran"),

  body("category")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Category harus berupa text"),

  body("amount")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Amount harus berupa angka"),

  body("date")
    .optional({ checkFalsy: true })
    .isDate()
    .withMessage("Format tanggal tidak valid"),

  body("note")
    .optional({ checkFalsy: true })

    .isString()
    .withMessage("Note harus berupa teks"),
];

const cekFinanceCreate = [
  body("type")
    .notEmpty()
    .withMessage("Type wajib diisi")
    .bail()
    .trim()
    .toLowerCase()
    .isIn(["pemasukan", "pengeluaran"])
    .withMessage("type harus pilih salah satu: pemasukan atau pengeluaran"),

  body("category").notEmpty().withMessage("Category wajib diisi"),

  body("amount").notEmpty().withMessage("Amount wajib diisi"),

  body("date").notEmpty().withMessage("Date wajib diisi"),

  body("note").notEmpty().withMessage("Note wajib diisi"),
];

module.exports = { cekFinanceUpdate, cekFinanceCreate };
