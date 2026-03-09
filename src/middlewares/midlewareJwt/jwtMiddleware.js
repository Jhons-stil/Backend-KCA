const jwt = require("jsonwebtoken");
const { resGagal } = require("../../payloads/payload.js");
const { User } = require("../../db/models");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return resGagal(
        res,
        401,
        "error",
        "Maaf, token tidak ada, silakan login",
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return resGagal(res, 401, "error", "Format token salah");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decode.id);

    if (!user) {
      return resGagal(res, 401, "error", "User tidak ditemukan");
    }

    req.user = user;
    next();
  } catch (error) {
    return resGagal(res, 500, "error");
  }
};
module.exports = verifyToken;
