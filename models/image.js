const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 75,
    required: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Image", imageSchema);
