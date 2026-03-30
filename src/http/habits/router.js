const express = require("express");
const router = express.Router();

const {
  cekHabits,

  cekId,
  cekHabitsUpdate,
} = require("../../middlewares/middlewareHabits/habitsMiddleware.js");

const {
  readHabits,

  createHabits,
  updateHabits,
  deleteHabits,
  // getHabitsByUser,
} = require("./controller.js");
const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware.js");
const {
  cekError,
} = require("../../middlewares/middlewareUser/usermiddleware.js");

router.get("/", verifyToken, readHabits);
// router.get("/my-habits", verifyToken, getHabitsByUser);
router.post("/create", verifyToken, cekHabits, cekError, createHabits);
router.patch(
  "/update/:id",
  verifyToken,
  cekHabitsUpdate,
  cekError,
  updateHabits,
);
router.delete("/delete/:id", verifyToken, deleteHabits);

module.exports = router;
