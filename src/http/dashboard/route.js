const express = require("express");
const { getDashboard } = require("./controller");
const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware");

const router = express.Router();

router.get("/", verifyToken, getDashboard);

module.exports = router;
