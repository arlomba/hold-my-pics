const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [3, "El campo 'Título' debe tener como mínimo 3 caracteres."],
    maxlength: [75, "El campo 'Título' debe tener como máximo 75 caracteres."],
    required: [true, "El campo 'Título' es requerido."],
  },
  description: {
    type: String,
    minlength: [
      3,
      "El campo 'Descripción' debe tener como mínimo 3 caracteres.",
    ],
    maxlength: [
      255,
      "El campo 'Descripción' debe tener como máximo 255 caracteres.",
    ],
    required: [true, "El campo 'Descripción' es requerido."],
  },
  filename: String,
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Image", imageSchema);
