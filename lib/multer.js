const multer = require("multer");
const path = require("path");

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ERROR_FILE_SIZE = "LIMIT_FILE_SIZE";

exports.upload = multer({
  dest: "public/storage",
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
    case ERROR_FILE_SIZE:
      return "La imagen debe tener un tamaño igual o menor a 2MB.";
  }
};
