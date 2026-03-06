const express = require("express");
const { register, login, readUser } = require("./controller.js");
const {
  cekRegister,
  cekError,
} = require("../../middlewares/middlewareUser/usermiddleware.js");

const router = express.Router();

router.post("/auth/register", cekRegister, cekError, register);
router.post("/auth/login", login);
router.get("/user", readUser);

module.exports = router;
