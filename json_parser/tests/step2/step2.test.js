import { readFileSync } from "fs";
import { isValidJSON, tokenizeJSON } from "../../index.js";

test("valid json", () => {
  const jsonFile = readFileSync("tests/step2/valid.json", "utf8");
  const tokens = tokenizeJSON(jsonFile);
  expect(isValidJSON(tokens)).toBe(true);
});

test("valid2 json", () => {
  const jsonFile = readFileSync("tests/step2/valid2.json", "utf8");
  const tokens = tokenizeJSON(jsonFile);
  expect(isValidJSON(tokens)).toBe(true);
});

test("invalid json", () => {
  const jsonFile = readFileSync("tests/step2/invalid.json", "utf8");
  const tokens = tokenizeJSON(jsonFile);
  expect(isValidJSON(tokens)).toBe(false);
});

test("invalid2 json", () => {
  const jsonFile = readFileSync("tests/step2/invalid2.json", "utf8");
  const tokens = tokenizeJSON(jsonFile);
  expect(isValidJSON(tokens)).toBe(false);
});
