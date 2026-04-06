const express = require("express");
const {
  createActivities,
  readActivities,
  updateActivities,
  deleteActivities,
} = require("./controller");
const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware");
const {
  cekActivities,
  cekActivitiesUpdate,
} = require("../../middlewares/middlewareactivities/activitiesMiddleware");
const { cekError } = require("../../middlewares/middlewareUser/usermiddleware");
const router = express.Router();

router.post("/create", verifyToken, cekActivities, cekError, createActivities);
router.get("/", verifyToken, readActivities);
router.patch("/update/:id", verifyToken, cekActivitiesUpdate, updateActivities);
router.delete("/delete", verifyToken, deleteActivities);
module.exports = router;
