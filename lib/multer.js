const multer = require("multer");
const path = require("path");
const fs = require("fs");

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/storage";

    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, (err) => cb(err, dir));
      return;
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const allowedExtensions = /\.(jpg|jpeg|png)/;

    if (!ext.match(allowedExtensions)) {
      cb(new Error("Only jpg, jpeg and png are allowed!"));
    }

    cb(null, true);
  },
}).single("uploaded_file");

exports.getErrorMessage = ({ code }) => {
  switch (code) {
    case "LIMIT_FILE_SIZE":
      return "La imagen debe tener un tamaño igual o menor a 2MB.";
  }
};
