const express = require("express");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "pug");
app.use(compression());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening on: http://localhost:${PORT}`);
});
