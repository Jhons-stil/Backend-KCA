const db = require("../../db/models/index.js");
const { Activities } = db;

const tampilActivities = async (userId) => {
  return await Activities.findAll({
    where: { user_id: userId },
    order: [["createdAt", "DESC"]],
  });
};

const cariActivitiById = async (id) => {
  return await Activities.findByPk(id);
};

const tambahActivities = async (body) => {
  return await Activities.create(body);
};

const ubahActivities = async (id, body) => {
  const data = await Activities.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusActivities = async (id) => {
  return await Activities.destroy({
    where: { id: id },
  });
};

const hitungStatistikUser = async (userId) => {
  const total = await Activities.count({ where: { user_id: userId } });
  const selesai = await Activities.count({
    where: { user_id: userId, status: "selesai " },
  });
  return {
    total,
    selesai,
    progress: total > 0 ? Math.round((selesai / total) * 100) : 0,
  };
};

module.exports = {
  tambahActivities,
  tampilActivities,
  cariActivitiById,
  ubahActivities,
  hapusActivities,
  hitungStatistikUser,
};
