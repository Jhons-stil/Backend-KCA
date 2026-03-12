const express = require("express");
const { createActivities } = require("./controller");
const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware");
const {
  cekActivities,
} = require("../../middlewares/middlewareactivities/activitiesMiddleware");
const { cekError } = require("../../middlewares/middlewareUser/usermiddleware");
const router = express.Router();

router.post("/create", verifyToken, cekActivities, cekError, createActivities);

module.exports = router;
