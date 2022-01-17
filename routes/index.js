const express = require("express");
const imageController = require("../controllers/imageController");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/images", imageController.getImages);
router.post("/images", imageController.createImage);
router.get("/images/upload", imageController.getImageUpload);
router.get("/images/:id", imageController.getImageById);

module.exports = router;
