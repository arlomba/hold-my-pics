const express = require("express");
const multer = require("multer");
const imageController = require("../controllers/imageController");

const router = express.Router();
const upload = multer({ dest: "public/storage" });

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/images", imageController.getImages);
router.post(
  "/images/upload",
  upload.single("image"),
  imageController.createImage
);
router.get("/images/upload", imageController.getImageUpload);
router.get("/images/:id", imageController.getImageById);

module.exports = router;
