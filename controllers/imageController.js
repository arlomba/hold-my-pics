const Image = require("../models/image");

// GET /images
exports.getImages = async (req, res) => {
  res.render("images/index");
};

// POST /images
exports.createImage = async (req, res) => {
  res.redirect("/images");
};

// GET /images/upload
exports.getImageUpload = async (req, res) => {
  res.render("images/upload/index");
};

// GET /images/:id
exports.getImageById = async (req, res) => {
  res.render("images/id");
};
