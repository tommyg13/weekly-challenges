import { readFileSync } from "fs";
import { isValidJSON, tokenizeJSON } from "../../index.js";

test("valid json", () => {
  const jsonFile = readFileSync("tests/step1/valid.json", "utf8");
  const tokens = tokenizeJSON(jsonFile);
  expect(isValidJSON(tokens)).toBe(true);
});

test("invalid json", () => {
  const jsonFile = readFileSync("tests/step1/invalid.json", "utf8");
  const tokens = tokenizeJSON(jsonFile);
  expect(isValidJSON(tokens)).toBe(false);
});
