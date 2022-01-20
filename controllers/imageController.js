const Image = require("../models/image");
const multer = require("multer");
const { upload } = require("../lib/multer");
const { formatDate } = require("../lib/formatDate");

// GET /
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().lean();

    images.forEach((image) => {
      formatDate(image);
    });

    res.render("index", { images });
  } catch (err) {
    console.error(err);
  }
};

// POST /upload
exports.createImage = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      // TODO: Fix error handling when the file input has errors or is empty
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        new Error(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        new Error(err);
      }

      if (!req.file) {
        new Error("No input file!");
      }

      const { title, description } = req.body;
      const { filename } = req.file;

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
    const image = await Image.findOne({ _id: id }).lean();

    formatDate(image);

    res.render("images/id", { image });
  } catch (err) {
    console.error(err);
  }
};
