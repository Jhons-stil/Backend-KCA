process.env.TZ = "Asia/Jakarta";
const express = require("express");
const routerUser = require("./http/user/router.js");
const routerFinance = require("./http/finance/router.js");
const routerHabits = require("./http/habits/router.js");
const routerHabitLogs = require("./http/habit_logs/router.js");
const routerActivities = require("./http/activities/router.js");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerUser);
app.use("/api/finance", routerFinance);
app.use("/api/habits", routerHabits);
app.use("/api/habitLogs", routerHabitLogs);
app.use("/api/activities", routerActivities);

app.listen(PORT, () => {
  console.log("Server Berjalann................");
});
