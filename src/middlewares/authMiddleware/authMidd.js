const jwt = require("jsonwebtoken");
const { resGagal } = require("../../payloads/payload");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return resGagal(res, 401, "error", "Token tidak ditemukan");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return resGagal(res, 401, "error", "Token tidak valid");
  }
};

module.exports = authMiddleware;