const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const dir = "src/uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ambilExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ambilExt);
  },
});

const fileFilter = (req, file, cb) => {
  const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.validatorFileError = "file harus PNG, JPG dan JPEG";
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

module.exports = upload;
