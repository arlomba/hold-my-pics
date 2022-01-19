const multer = require("multer");
const path = require("path");

exports.upload = multer({
  dest: "public/storage",
  limits: { fileSize: 1_000_000 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname);

    if (!allowedExtensions.includes(ext)) {
      cb(new Error("Only jpg, jpeg and png are allowed!"));
    }

    cb(null, true);
  },
}).single("uploaded_file");
