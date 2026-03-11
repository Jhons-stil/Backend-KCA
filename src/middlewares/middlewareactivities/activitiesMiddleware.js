const { body } = require("express-validator");

const cekActivities = [
  body("title").notEmpty().withMessage("title tidak boleh kosong"),
  body("description").notEmpty().withMessage("Description tidak boleh kosong"),
];

module.exports = { cekActivities };
