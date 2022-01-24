const express = require("express");
const imageController = require("../controllers/imageController");

const router = express.Router();

router.get("/", imageController.getImages);
router.post("/", imageController.createImage);
router.get("/upload", imageController.getImageUpload);
router.get("/images/:id", imageController.getImageById);

module.exports = router;
