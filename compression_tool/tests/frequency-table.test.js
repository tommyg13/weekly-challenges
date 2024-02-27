import { getFrequencyTable } from "../huffman";

describe("get frequency table", () => {
  test("should return correct occurrences for case sensitive text", () => {
    const text = "Hello there!";
    const frequencyTable = getFrequencyTable(text);
    expect(frequencyTable["H"]).toBe(1);
    expect(frequencyTable["h"]).toBe(1);
    expect(frequencyTable["e"]).toBe(3);
  });

  test("should return empty object for empty string", () => {
    const text = "";
    const frequencyTable = getFrequencyTable(text);
    expect(Object.keys(frequencyTable).length).toBe(0);
  });

  test("should return correct occurrences for single character text", () => {
    const text = "aaaaa";
    const frequencyTable = getFrequencyTable(text);
    expect(frequencyTable["a"]).toBe(5);
  });

  test("should treat uppercase and lowercase letters separately", () => {
    const text = "AbcABC";
    const frequencyTable = getFrequencyTable(text);
    expect(frequencyTable["A"]).toBe(2);
    expect(frequencyTable["a"]).toBe(undefined);
    expect(frequencyTable["B"]).toBe(1);
    expect(frequencyTable["b"]).toBe(1);
    expect(frequencyTable["c"]).toBe(1);
  });
});
