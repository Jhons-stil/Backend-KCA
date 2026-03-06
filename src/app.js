process.env.TZ = "Asia/Jakarta";
const express = require("express");
const routerUser = require("./http/user/router");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerUser);
app.listen(PORT, () => {
  console.log("Server Berjalann................");
});
