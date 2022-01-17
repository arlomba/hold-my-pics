const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 3,
    max: 75,
    required: true,
  },
  description: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Image", imageSchema);
