const db = require("../../db/models/index.js");
const { Finance, Activities, User } = db;

const tampilDashboard = async (id) => {
  return await User.findByPk(id, {
    attributes: ["id", "username", "email"],
    include: [
      {
        model: Finance,
        as: "finance",
        attributes: ["id", "type", "category", "amount", "date", "note"],
        limit: 5,
        order: [["date", "DESC"]],
      },
      {
        model: Activities,
        as: "activities",
        attributes: ["id", "title", "description", "status", "categories"],
        required: false,
      },
    ],
  });
};

module.exports = {
  tampilDashboard,
};
