require("dotenv");
const db = require("../../db/models/index.js");
const { User } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const { tambahUser, findUsername, tampilUser } = require("./service");
const { resSukses, resGagal } = require("../../payloads/payload.js");
const token = require("../../payloads/tknJwt.js");

const register = async (req, res) => {
  try {
    const { username, email, password, konfirmasi_password } = req.body;
    const salt = Number(process.env.BCRYPT_SALT);
    const passwordAcak = await bcrypt.hash(password, salt);
    const body = {
      username,
      email,
      password: passwordAcak,
      "konfirmasi-password": konfirmasi_password,
    };
    await tambahUser(body);
    return resSukses(res, 201, "success", "User berhasil ditambahkan");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUsername(username);
    if (user === null) {
      return resGagal(res, 500, "error", "Maaf, username tidak ditemukan");
    }

    const passwordAcak = await bcrypt.compare(password, user.password);

    if (!passwordAcak) {
      return resGagal(res, 500, "error", "Maaf, password salah");
    }

    const aksestoken = token(user);
    const decode = jwt.verify(aksestoken, process.env.JWT_SECRET);
    return res.status(201).json({
      status: "success",
      message: "Login berhasil",
      token: aksestoken,
      user: {
        id: decode.id,
        username: decode.username,
      },
    });
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const readUser = async (req, res) => {
  try {
    const data = await tampilUser();
    return resSukses(res, 200, "success", "Data user", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
module.exports = { register, login, readUser };
