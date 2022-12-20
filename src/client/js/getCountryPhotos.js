/** Get country photos by country name. Ex: Viet Nam */
async function getCountryPhotos(countryName) {
  console.log("::: Running getCountryPhotos :::", countryName);
  const countryNameFormatted = countryName.replace(/\s/g, "+");
  Client.globalVariales.tripGalleryEl.innerHTML = "";
  try {
    fetch(Client.globalVariales.baseURL + "/get-country-photos", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ countryName: countryNameFormatted }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("pixabay result: ", data);
        Client.globalVariales.currentCountryPhotos = data.hits;
        Client.globalVariales.tripThumbImgEl.src = data.hits[0].largeImageURL;
      });
  } catch (error) {
    console.log("Error when fetch pixabay photos from client side", error);
  }
}

/** Show photos */
function showGalleryPhotos() {
  console.log("::: Running showGalleryPhotos :::");
  Client.globalVariales.tripGalleryEl.innerHTML = "";
  for (
    let index = 0;
    index < Client.globalVariales.currentCountryPhotos.length;
    index++
  ) {
    const photo = Client.globalVariales.currentCountryPhotos[index];
    if (index == 10) {
      break;
    }
    const photoItemEl = document.createElement("div");
    photoItemEl.classList.add("trip-content__input__gallery-photos__item");
    const photoImgEl = document.createElement("img");
    photoImgEl.classList.add("trip-content__input__gallery-photos__item--img");
    photoImgEl.src = photo.largeImageURL;
    photoItemEl.appendChild(photoImgEl);

    Client.globalVariales.tripGalleryEl.appendChild(photoItemEl);
  }
}

export { getCountryPhotos, showGalleryPhotos };
