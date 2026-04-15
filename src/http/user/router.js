const express = require("express");
const {
  register,
  login,
  readUser,
  updateUser,
  updatePassword,
} = require("./controller.js");
const {
  cekRegister,
  cekError,
  cekUpdateUser,
  cekpassword,
} = require("../../middlewares/middlewareUser/usermiddleware.js");

const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware.js");

const router = express.Router();

router.post("/auth/register", cekRegister, cekError, register);
router.post("/auth/login", login);
router.get("/user", readUser);
router.patch(
  "/update/user",
  verifyToken,

  cekUpdateUser,
  cekError,
  updateUser,
);
router.patch(
  "/update/password",
  verifyToken,
  cekpassword,
  cekError,
  updatePassword,
);

module.exports = router;
