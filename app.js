require("dotenv").config();
const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const routes = require("./routes");
const printTitle = require("./lib/printTitle");

bootstrap = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const MONGO_URI = process.env.MONGO_URI;

    const app = express();

    app.set("view engine", "pug");

    app.use(express.urlencoded({ extended: false }));
    app.use(compression());
    app.use(express.static("public"));
    app.get("/favicon.ico", (req, res) => res.status(204));
    app.use(routes);
    app.use((req, res) => res.status(404).render("errors/404"));

    printTitle();

    await mongoose.connect(MONGO_URI);
    console.log(`> Database connected.`);

    app.listen(PORT);
    console.log(`> Server listening on: http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

bootstrap();
