import "./js/lib/fontawesome";

import { tripHandler } from "./js/tripHandler";
import { getCountryInfor, getCountries } from "./js/getCountryInfor";
import { getCountryPhotos, showGalleryPhotos } from "./js/getCountryPhotos";
import { getWeatherInfor } from "./js/getWeatherInfor";

const tripDestinationInput = document.getElementById("trip-destination-input");
const tripDestinationOutput = document.getElementById("trip-destination");
const tripDepartingOutput = document.getElementById("trip-departing");
const tripThumbImgEl = document.getElementById("trip-thumb");
const tripGalleryEl = document.getElementById("trip-content-gallery");
const tripWeatherInforEl = document.getElementById("trip-weather-infor");
const tripWeatherDescriptionEl = document.getElementById(
  "trip-weather-description"
);

const globalVariales = {
  baseURL: "http://localhost:8080",
  countries: [],
  currentCountry: {},
  currentCountryPhotos: [],
  tripDestinationInput: tripDestinationInput,
  tripDestinationOutput: tripDestinationOutput,
  tripDepartingOutput: tripDepartingOutput,
  tripThumbImgEl: tripThumbImgEl,
  tripGalleryEl: tripGalleryEl,
  tripWeatherInforEl: tripWeatherInforEl,
  tripWeatherDescriptionEl: tripWeatherDescriptionEl,
};

import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/header.scss";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("load");
  // Fetch all country and set default VN
  await getCountries();
  // Set value default for departing time
  const tripDepartingInput = document.getElementById("trip-departing-input");
  const tripDestinationInput = document.getElementById(
    "trip-destination-input"
  );
  const now = new Date();

  tripDepartingInput.value =
    now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();

  tripHandler(tripDepartingInput.value);

  // Add event listener
  tripDepartingInput.addEventListener("change", (event) => {
    console.log("tripDepartingInput changed: ", tripDepartingInput.value);
    tripHandler(tripDepartingInput.value);
  });
  tripDestinationInput.addEventListener("change", async (event) => {
    console.log("tripDestinationInput changed: ", tripDestinationInput.value);
    // Get country infor => weather => photho thumbnail
    await getCountryInfor(tripDestinationInput.value);
  });
});

export {
  globalVariales,
  getCountryPhotos,
  showGalleryPhotos,
  getWeatherInfor,
  getCountryInfor,
  getCountries,
  tripHandler,
};
