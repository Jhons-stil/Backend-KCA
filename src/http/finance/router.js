const express = require("express");
const router = express.Router();

const {
  cekFinance,
} = require("../../middlewares/middlewareFinance/financeMiddleware.js");

const {
  getAllFinance,
  createFinance,
  updateFinance,
  deleteFinance,
} = require("./controller.js");

const verifyToken = require("../../middlewares/midlewareJwt/jwtMiddleware.js");
const { cekError } = require("../../middlewares/middlewareUser/usermiddleware.js");

router.get("/", verifyToken, getAllFinance);
router.post("/create", verifyToken, cekFinance, cekError, createFinance);
router.patch("/update/:id", verifyToken, cekFinance, cekError, updateFinance);
router.delete("/delete/:id", verifyToken, deleteFinance);

module.exports = router;
