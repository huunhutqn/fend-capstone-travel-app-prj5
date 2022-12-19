import { TestScheduler } from "jest";
import { checkForURL } from "../src/client/js/urlChecker";

describe("Input URL validation", () => {
  test("Testing the checkForURL() function", () => {
    expect(checkForURL).toBeDefined();
    expect(checkForURL("abcd")).toBeFalsy();
    expect(checkForURL(" 35 z@")).toBeFalsy();
    // Test on https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/console
    expect(
      checkForURL(
        "https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc"
      )
    ).toBeTruthy();
  });
});
