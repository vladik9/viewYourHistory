const express = require("express");
const app = express();
const path = require("path");
const https = require("https"); // use https module for nodeJS
const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Alexander&utf8=&format=json";
const newVewsPath = path.join(__dirname, "./Public/views");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.set("views", newVewsPath);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(8080, () => console.log("Port started at 8080"));
