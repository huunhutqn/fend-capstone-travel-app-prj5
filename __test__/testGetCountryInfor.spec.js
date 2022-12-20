import {
  getCountries,
  getCountryInfor,
} from "../src/client/js/getCountryInfor";

describe("Testing Get country information", () => {
  test("Testing the getCountries() function", () => {
    expect(getCountries).toBeDefined();
  });
  test("Testing the getCountryInfor() function", () => {
    expect(getCountryInfor).toBeDefined();
  });
});
