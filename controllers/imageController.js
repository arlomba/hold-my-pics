const Image = require("../models/image");
const multer = require("multer");
const { upload, getErrorMessage } = require("../lib/multer");

// GET /
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();

    res.render("index", { images });
  } catch (err) {
    console.error(err);
  }
};

// POST /upload
exports.createImage = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        const error = getErrorMessage(err);

        res.render("upload/index", { error });
        return;
      }

      const { title, description } = req.body;
      const { filename } = req.file ?? "";

      const result = await Image.create({
        title,
        description,
        filename,
      });

      if (result) {
        res.status(201).redirect("/");
      }
    } catch (err) {
      const { errors } = err;
      res.render("upload/index", { errors });
    }
  });
};

// GET /upload
exports.getImageUpload = async (req, res) => {
  res.render("upload/index");
};

// GET /images/:id
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findOne({ _id: id });

    res.render("images/id", { image });
  } catch (err) {
    console.error(err);
  }
};
