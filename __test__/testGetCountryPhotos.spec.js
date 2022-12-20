import {
  getCountryPhotos,
  showGalleryPhotos,
} from "../src/client/js/getCountryPhotos";

describe("Testing Get country photos", () => {
  test("Testing the showGalleryPhotos() function", () => {
    expect(showGalleryPhotos).toBeDefined();
  });
  test("Testing the getCountryInfor() function", () => {
    expect(getCountryPhotos).toBeDefined();
  });
});
