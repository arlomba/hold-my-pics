const Image = require("../models/image");

// GET /images
exports.getImages = async (req, res) => {
  const images = await Image.find({});

  res.render("images/index", { images });
};

// POST /images/upload
exports.createImage = async (req, res) => {
  try {
    const { title, description } = await req.body;
    await Image.create({ title, description });

    res.redirect("/images");
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
  res.render("images/id");
};
