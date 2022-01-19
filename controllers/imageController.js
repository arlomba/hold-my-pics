const Image = require("../models/image");

// GET /images
exports.getImages = async (req, res) => {
  const images = await Image.find({});

  res.render("images/index", { images });
};

// POST /images/upload
exports.createImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { filename } = req.file;

    const image = new Image({
      title,
      description,
      filename,
    });

    const result = await image.save();

    if (result) {
      res.status(201).redirect("/images");
    }
  } catch (err) {
    const { errors } = err;
    res.render("images/upload/index", { errors });
  }
};

// GET /images/upload
exports.getImageUpload = async (req, res) => {
  res.render("images/upload/index");
};

// GET /images/:id
exports.getImageById = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findOne({ id });

  res.render("images/id", { image });
};
