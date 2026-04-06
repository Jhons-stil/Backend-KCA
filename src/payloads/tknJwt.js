const jwt = require("jsonwebtoken");
const token = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
  );
};
module.exports = token;
