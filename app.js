const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === "dev") {
  mongoose.connect("mongodb://localhost:27017/myapp");
}

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static("public"));
app.use(routes);

try {
  app.listen(PORT);
  console.log(`Listening on: http://localhost:${PORT}`);
} catch (err) {
  console.error(err);
}
