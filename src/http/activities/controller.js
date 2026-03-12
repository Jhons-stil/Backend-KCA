const { resSukses, resGagal } = require("../../payloads/payload");
const { tambahActivities } = require("./service");

const createActivities = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user.id;
    const body = { user_id: user, title, description };
    const data = await tambahActivities(body);
    return resSukses(
      res,
      200,
      "success",
      "Berhasil menambahkan Activities",
      data,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  createActivities,
};
