require("dotenv");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const { tambahUser, tampilUser, ubahUser, findEmail } = require("./service");
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
    const { email, password } = req.body;
    const user = await findEmail(email);
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

const updateUser = async (req, res) => {
  try {
    const user = req.user;

    const { username, email } = req.body;

    let foto = user.profile;

    if (req.file) {
      if (foto && typeof foto === "string") {
        const oldFoto = path.join(__dirname, "../../uploads", foto);
        if (fs.existsSync(oldFoto)) {
          fs.unlinkSync(oldFoto);
        }
      }

      foto = req.file.filename;
    }
    const dataNew = {
      username: username || user.username,
      email: email || user.email,
      profile: foto,
    };

    const data = await ubahUser(user.id, dataNew);

    const dataJson = data.get({ plain: true });

    const result = {
      ...dataJson,
      url: dataJson.profile
        ? `${req.protocol}://${req.get("host")}/uploads/${dataJson.profile}`
        : null,
    };
    return resSukses(res, 200, "success", "Data berhasil diubah", result);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { passwordBaru } = req.body;

    const passwordAcak = await bcrypt.hash(passwordBaru, 10);
    const body = { password: passwordAcak };
    await ubahUser(req.user.id, body);
    return resSukses(res, 200, "success", "Password berhasil diubah");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = { register, login, readUser, updateUser, updatePassword };
