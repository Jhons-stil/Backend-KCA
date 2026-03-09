process.env.TZ = "Asia/Jakarta";
const express = require("express");
const routerUser = require("./http/user/router.js");
const routerFinance = require("./http/finance/router.js")

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerUser);
app.use("/api/finance", routerFinance)
app.listen(PORT, () => {
  console.log("Server Berjalann................");
});
