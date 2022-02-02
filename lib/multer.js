const multer = require("multer");
const path = require("path");
const fs = require("fs");

const MAX_FILE_SIZE = 2 * 1024 * 1024; // Constante que definirá el tamaño máximo del archivo (2MB)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/storage"; // Directorio donde se guardarán las imágenes

    if (!fs.existsSync(dir)) {
      // Si no existe el directorio, lo creamos
      fs.mkdir(dir, (err) => cb(err, dir));
      return;
    }

    cb(null, dir); // Función de callback que devuelve un directorio
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Función de callback que devuelve un nombre para el archivo
  },
});

exports.upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtenemos la extensión original del archivo
    const allowedExtensions = /\.(jpg|jpeg|png)/; // Formatos de imagen aceptados

    if (!ext.match(allowedExtensions)) {
      cb(new Error("Only jpg, jpeg and png are allowed!"));
    }

    cb(null, true); // La subida del archivo ha ido bien
  },
}).single("uploaded_file"); // Únicamente se permite subir una imagen cada vez

// Función de ayuda para traducir los mensajes de error en multer
exports.getErrorMessage = ({ code }) => {
  switch (code) {
    case "LIMIT_FILE_SIZE":
      return "La imagen debe tener un tamaño igual o menor a 2MB.";
  }
};
