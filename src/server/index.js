var path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const pixabayAPIKey = process.env.PIXABAY_KEY;
const geonamesUsername = process.env.GEONAMES_USERNAME;
const weatherbitAPIKey = process.env.WEATHERBIT_KEY;
const meaningcloudAPIKey = process.env.API_KEY;

// https://pixabay.com/api/docs/
const pixabayAPI = `https://pixabay.com/api/?key=${pixabayAPIKey}&image_type=photo`;
// Example: https://pixabay.com/api/?key=${pixabayAPIKey}&q=Viet+Nam&image_type=photo&pretty=true
const pixabayFindByCountryNameAPI = (countryName) =>
  `https://pixabay.com/api/?key=${pixabayAPIKey}&q=${countryName}&image_type=photo&pretty=true`;

// http://www.geonames.org/export/web-services.html
const geonamesFetchCountriesAPI = `http://api.geonames.org/countryInfoJSON?username=${geonamesUsername}`;
// Example: http://api.geonames.org/countryInfoJSON?country=VN&username=${geonamesUsername}
const geonamesFindByCountryCodeAPI = (countryCode) =>
  `http://api.geonames.org/countryInfoJSON?country=${countryCode}&username=${geonamesUsername}`;
// Example: http://api.geonames.org/childrenJSON?geonameId=1562822&username=${geonamesUsername}
const geonamesFindCitiesByGeonameIdAPI = (geonameId) =>
  `http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=${geonamesUsername}`;

// https://www.weatherbit.io/api/weather-current
// Example: https://api.weatherbit.io/v2.0/current?lat=16.08333&lon=108.08333&key=${weatherbitAPIKey}&include=minutely
const weatherbitFindByLatLonCityAPI = (lat, lon) =>
  `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherbitAPIKey}&include=minutely`;

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
  // res.sendFile(path.resolve("src/client/views/index.html")); // dev
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

// Fetch all countries
app.get("/get-countries", async function (req, res) {
  try {
    const response = await fetch(geonamesFetchCountriesAPI);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("Error when call fetch all countries from server", error);
  }
});

// Get country infor by country geonameId
app.post("/get-cities-infor", async function (req, res) {
  const geonameId = req.body.geonameId;
  try {
    const response = await fetch(geonamesFindCitiesByGeonameIdAPI(geonameId));
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("Error when get cities infor from server", error);
  }
});

// Get country infor by country code
app.post("/get-country-infor", async function (req, res) {
  const countryCode = req.body.countryCode;
  try {
    const response = await fetch(geonamesFindByCountryCodeAPI(countryCode));
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("Error when get country infor from server", error);
  }
});

// Get weather infor by lat lon
app.post("/get-weather-infor", async function (req, res) {
  const lat = req.body.lat;
  const lon = req.body.lon;
  try {
    const response = await fetch(weatherbitFindByLatLonCityAPI(lat, lon));
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("Error when get weather infor from server", error);
  }
});

// Get some photos of country
app.post("/get-country-photos", async function (req, res) {
  const countryName = req.body.countryName;
  try {
    const response = await fetch(pixabayFindByCountryNameAPI(countryName));
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("Error when get photos of country from server", error);
  }
});
