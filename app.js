require("dotenv").config();
const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

if (process.env.NODE_ENV === "dev") {
  mongoose.connect(MONGO_URI);
}

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static("public"));
app.use(routes);
app.use((req, res) => res.status(404).render("errors/404"));

try {
  app.listen(PORT);
  console.log(`Listening on: http://localhost:${PORT}`);
} catch (err) {
  console.error(err);
}
