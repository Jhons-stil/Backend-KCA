const cekFinance = [
  body("type").notEmpty().withMessage("Type wajib diisi"),

  body("category").notEmpty().withMessage("Category wajib diisi"),

  body("amount")
    .notEmpty()
    .withMessage("Amount wajib diisi")
    .isNumeric()
    .withMessage("Amount harus berupa angka"),

  body("date")
    .notEmpty()
    .withMessage("Tanggal wajib diisi")
    .isDate()
    .withMessage("Format tanggal tidak valid"),

  body("note")
    .notEmpty()
    .withMessage("note wajib diisi")
    .optional()
    .isString()
    .withMessage("Note harus berupa teks"),
];

module.exports = { cekFinance };
