const { body } = require("express-validator");

const cekHabits = [
  body("habit_name")
    .notEmpty()
    .withMessage("Habit name wajib diisi")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Habit name minimal 3 karakter ")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Habit name maksimal 100 karakter"),

  body("target_frequency")
    .notEmpty()
    .withMessage("Target Frequency wajib diisi")
    .bail()
    .isIn(["harian", "mingguan"])
    .withMessage("Target Frequency hanya boleh harian dan mingguan"),
];

cekHabitsUpdate = [
  body("habit_name")
    .optional({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Habit name minimal 3 karakter ")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Habit name maksimal 100 karakter"),

  body("target_frequency")
    .optional({ checkFalsy: true })
    .isIn(["harian", "mingguan"])
    .withMessage("Target Frequency hanya boleh harian dan mingguan"),

  body("current_streak")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Current streak harus berupa angka"),
];
module.exports = {
  cekHabits,
  cekHabitsUpdate,
};
