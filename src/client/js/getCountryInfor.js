/** Get country infor by country countryCode */
async function getCountryInfor(countryCode) {
  console.log("::: Running getCountryInfor :::", countryCode);
  try {
    fetch(Client.globalVariales.baseURL + "/get-country-infor", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ countryCode: countryCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("country infor: ", data);

        const country = data.geonames.find(
          (country) => country.countryCode == countryCode
        );
        Client.globalVariales.currentCountry = country;
        Client.globalVariales.tripDestinationOutput.innerHTML =
          country.countryName;

        // Fetch cities of country => to get lat lon
        fetch(Client.globalVariales.baseURL + "/get-cities-infor", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ geonameId: country.geonameId }),
        })
          .then((res1) => res1.json())
          .then(async (cities) => {
            console.log("cities of  infor: ", cities);
            const capitalName = country.capital;
            const capitalObject = cities.geonames.find(
              (capital) => capital.name == capitalName
            );
            console.log("capitalObject: ", capitalObject);

            // Get country weather
            await Client.getWeatherInfor(capitalObject.lat, capitalObject.lng);
            await Client.getCountryPhotos(country.countryName);
          });
      });
  } catch (error) {
    console.log("Error when fetch country infor from client side", error);
  }
}

async function getCountries() {
  console.log("::: Running getCountries :::");
  try {
    fetch(Client.globalVariales.baseURL + "/get-countries", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("countries: ", data);
        if (Client.globalVariales.tripDestinationInput.options.length > 0) {
          Client.globalVariales.tripDestinationInput.remove(0);
        }
        if (data.geonames && data.geonames.length > 0) {
          data.geonames.map((country) => {
            const newOptionEl = document.createElement("option");
            newOptionEl.text = country.countryName;
            newOptionEl.value = country.countryCode;
            // Set default selected for VN country
            if (country.countryCode == "VN") {
              newOptionEl.selected = true;
            }
            Client.globalVariales.tripDestinationInput.options.add(newOptionEl);
          });
          Client.globalVariales.countries = data.geonames;

          await getCountryInfor("VN");
        }
      });
  } catch (error) {
    console.log("Error when fetch countries from client side", error);
  }
}

export { getCountryInfor, getCountries };
