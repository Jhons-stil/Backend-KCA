const db = require("../../db/models/index.js");
const { User } = db;

const tampilUser = async () => {
  return await User.findAll();
};

const cariUserById = async (id) => {
  return await User.findByPk(id);
};

const tambahUser = async (body) => {
  return await User.create(body);
};

const ubahUser = async (id, body) => {
  const data = await User.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusUser = async (id) => {
  return await User.destroy({
    where: { id: id },
  });
};
const findEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

module.exports = {
  tambahUser,
  tampilUser,
  cariUserById,
  ubahUser,
  hapusUser,
  findEmail,
};
