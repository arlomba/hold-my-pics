const express = require("express");
const multer = require("multer");
const path = require("path");
const imageController = require("../controllers/imageController");

const router = express.Router();
const upload = multer({
  dest: "public/storage",
  limits: { fileSize: 1_000_000 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname);

    if (!allowedExtensions.includes(ext)) {
      cb(new Error("Only jpg, jpeg and png are allowed"), false);
    }

    cb(null, true);
  },
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/images", imageController.getImages);
router.post(
  "/images/upload",
  upload.single("uploaded_file"),
  imageController.createImage
);
router.get("/images/upload", imageController.getImageUpload);
router.get("/images/:id", imageController.getImageById);

module.exports = router;
