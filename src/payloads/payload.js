const resSukses = (res, code, status, message, data) => {
  return res.status(code).json({ status, message, data });
};

const resGagal = (res, code, status, message, errors) => {
  return res.status(code).json({ status, message, errors });
};

module.exports = { resSukses, resGagal };
