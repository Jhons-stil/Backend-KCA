const { body } = require("express-validator");

const cekFinance = [
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
    .isDate({ format: "DD-MM-YYYY" })
    .withMessage("Format tanggal tidak valid"),

  body("note")
    .optional({ checkFalsy: true })

    .isString()
    .withMessage("Note harus berupa teks"),
];

module.exports = { cekFinance };
