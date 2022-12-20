/** Get weather infor by lat lon of city */
async function getWeatherInfor(lat, lon) {
  console.log(
    "::: Running getWeatherInfor :::\n" + "lat: " + lat + "\nlon: " + lon
  );
  try {
    fetch(Client.globalVariales.baseURL + "/get-weather-infor", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ lat: lat, lon: lon }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("weather infor: ", data);
        Client.globalVariales.tripWeatherInforEl.innerHTML = `Temp: ${data.data[0].temp} <i class="fa-solid fa-temperature-low"></i><br>Clouds: ${data.data[0].clouds}% <i class="fa-solid fa-cloud"></i>`;
        Client.globalVariales.tripWeatherDescriptionEl.innerHTML = `"${data.data[0].weather.description}"`;
      });
  } catch (error) {
    console.log("Error when fetch weather from client side", error);
  }
}

export { getWeatherInfor };
