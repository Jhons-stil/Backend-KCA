const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dir = "src/uploads";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + unique + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg"];

  if (!allowed.includes(file.mimetype)) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

const uploadFoto = (req, res, next) => {
  upload.single("profile")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      let message = "Upload gagal";

      if (err.code === "LIMIT_FILE_SIZE") {
        message = "Ukuran file maksimal 5MB";
      }

      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Maaf, file harus berupa jpg, png atau jpeg";
      }

      return res.status(400).json({
        status: "error",
        message,
      });
    }

    if (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    next();
  });
};

module.exports = uploadFoto;
