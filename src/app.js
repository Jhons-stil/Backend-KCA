process.env.TZ = "Asia/Jakarta";
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const routerUser = require("./http/user/router.js");
const routerFinance = require("./http/finance/router.js");

const routerActivities = require("./http/activities/router.js");
const routerDashboard = require("./http/dashboard/route.js");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err);
    return res.status(400).json({ status: "error", message: err.message });
  }
  next(err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerUser);
app.use("/api/finance", routerFinance);

app.use("/api/activities", routerActivities);
app.use("/api/dashboard", routerDashboard);

app.listen(PORT, () => {
  console.log("Server Berjalann................");
});
