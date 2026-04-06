const express = require("express");
const router = express.Router();

const {
  getAllHabitLogs,

  createHabitLogs,
  updateHabitLogs,
  deleteHabitLogs,
  getLogsByHabit,
} = require("./controller.js");

const {
  cekId,
  validateCreateHabitLogs,
  validateUpdateHabitLogs,
} = require("../../middlewares/middlewareHabitLogs/habitLogsMiddleware.js");

const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware.js");
const {
  cekError,
} = require("../../middlewares/middlewareUser/usermiddleware.js");

router.get("/habit", verifyToken, getLogsByHabit);

router.get("/", verifyToken, getAllHabitLogs);

router.post(
  "/create/:id/log",
  verifyToken,
  validateCreateHabitLogs,
  cekError,
  createHabitLogs,
);

router.patch(
  "/update/:id",
  verifyToken,
  validateUpdateHabitLogs,
  cekId,
  cekError,
  updateHabitLogs,
);

router.delete("/delete/:id", verifyToken, cekId, deleteHabitLogs);

module.exports = router;
