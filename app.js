const express = require("express");
const app = express();
const path = require("path");
const https = require("https"); // use https module for nodeJS

const newVewsPath = path.join(__dirname, "./Public/views");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.set("views", newVewsPath);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.get("/", (req, res) => {
  res.render("home");
});
app.post("/", (req, res) => {
  const userName = req.body.userName;
  console.log(userName);
  res.redirect("userName");
});

app.get("/:userName", (req, res) => {
  const usName = req.params.userName;
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
    usName +
    "&utf8=&format=json";
  https.get(url, (apiResponse) => {
    apiResponse.on("data", function (data) {
      const jsonData = JSON.parse(data);
      const arrayTitles = [];
      const arrInfo = [];

      const point = jsonData.query.search;
      point.forEach(function (dataInfo) {
        arrayTitles.push(dataInfo.title);
        arrInfo.push(dataInfo.snippet);
      });
      // work whit data
      console.log(arrayTitles);
      console.log(arrInfo);
    });
  });
});

app.listen(8080, () => console.log("Port started at 8080"));
