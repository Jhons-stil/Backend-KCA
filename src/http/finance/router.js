const express = require("express");
const router = express.Router();

const {
  cekFinance,
  cekError,
  cekId,
} = require("../../middlewares/middlewareFinance/financeMiddleware.js");
const authMidd = require("../../middlewares/authMiddleware/authMidd.js");

const {
  getAllFinance,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
} = require("./controller.js");
router.get("/", getAllFinance);
router.get("/:id", cekId, getFinanceById);
router.post("/create", authMidd, cekFinance, cekError, createFinance);
router.patch(
  "/update/:id",
  authMidd,
  cekId,
  cekFinance,
  cekError,
  updateFinance,
);
router.delete("/delete/:id", authMidd, cekId, deleteFinance);

module.exports = router;
