const db = require("../../db/models/index.js");
const { Finance } = db;

const tampilKeuangan = async (userId) => {
  return await Finance.findAll({
    where: { user_id: userId },
    order: [["createdAt", "DESC"]],
  });
};

const cariFinanceById = async (id) => {
  return await Finance.findByPk(id);
};

const tambahFinance = async (body) => {
  return await Finance.create(body);
};

const ubahFinance = async (id, body) => {
  const data = await Finance.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusFinance = async (id) => {
  return await Finance.destroy({
    where: { id: id },
  });
};
const findUser = async (user_id) => {
  return await Finance.findOne({
    where: { user_id },
  });
};

module.exports = {
  tambahFinance,
  tampilKeuangan,
  cariFinanceById,
  ubahFinance,
  hapusFinance,
  findUser,
};
