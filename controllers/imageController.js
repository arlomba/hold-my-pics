const { getColor } = require("colorthief");
const Image = require("../models/image");
const { upload, getErrorMessage } = require("../lib/multer");
const { Types } = require("mongoose");

// GET /
exports.getImages = async (req, res) => {
  try {
    const allowedSort = ["asc", "desc"];

    const images = await Image.find({
      title: { $regex: req.query.q ?? "", $options: "i" },
    }).sort({
      filename: allowedSort.includes(req.query.sort) ? req.query.sort : "asc",
    });

    res.render("index", { images, search: req.query.q });
  } catch (err) {
    console.error(err);
  }
};

// POST /
exports.createImage = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        const error = getErrorMessage(err);

        res.render("upload/index", { error });
        return;
      }

      const { title, description } = req.body;
      const { filename, path } = req.file ?? "";
      let dominantColor;

      if (req.file) {
        dominantColor = await getColor(path);
      }

      const result = await Image.create({
        title,
        description,
        filename,
        dominantColor,
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
exports.getImageUpload = (req, res) => res.render("upload/index");

// GET /images/:id
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(404).render("errors/404");
      return;
    }

    const image = await Image.findOne({ _id: id });

    if (!image) {
      res.status(404).render("errors/404");
      return;
    }

    res.render("images/id", { image });
  } catch (err) {
    console.error(err);
  }
};
