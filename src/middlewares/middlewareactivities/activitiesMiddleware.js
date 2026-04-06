const { body } = require("express-validator");

const cekActivities = [
  body("title").notEmpty().withMessage("title tidak boleh kosong"),
  body("description").notEmpty().withMessage("Description tidak boleh kosong"),
  body("categories").notEmpty().withMessage("Categoiry tidak boleh kosong"),
];

const cekActivitiesUpdate = [
  body("title")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Title harus berupa string"),
  body("description")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("description harus berupa string"),
  body("status")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Title harus berupa Number")
    .bail()
    .isIn(["1", "2", "3"])
    .withMessage("pilihannya cuman 1,2,3"),
];

module.exports = { cekActivities };
