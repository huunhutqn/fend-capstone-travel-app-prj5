var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const meaningcloudAPIKey = process.env.API_KEY;
console.log(`Your API key is ${process.env.API_KEY}`);
const meaningcloudAPI = `https://api.meaningcloud.com/sentiment-2.1?key=${meaningcloudAPIKey}&lang=en&url=`;
const meaningcloudRequestAPI = (url) => meaningcloudAPI + url;

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

// Homepage
app.get("/", function (req, res) {
  res.sendFile("dist/index.html"); // prod
  //   res.sendFile(path.resolve("src/client/views/index.html")); // dev
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

// Testing
app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

/** Fetch sentiment analysis */
// https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/dev-tools
app.post("/sentiment-analysis", async function (req, res) {
  try {
    // URL input
    const url = req.body.url;
    const response = await fetch(meaningcloudRequestAPI(url), {
      method: "POST",
    });
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
    console.log("Error when call API from meaning cloud: ", error);
  }
});
