import { getWeatherInfor } from "../src/client/js/getWeatherInfor";

describe("Testing Get country weather", () => {
  test("Testing the getWeatherInfor() function", () => {
    expect(getWeatherInfor).toBeDefined();
  });
});
