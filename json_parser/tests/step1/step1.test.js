import { readFileSync } from "fs";
import { lexer, parser } from "../..";

describe("Step 1 Tests", () => {
  test("Valid JSON", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    const input = readFileSync("./tests/step1/valid.json", "utf8");
    const tokens = lexer(input);
    parser(tokens);

    expect(mockExit).toHaveBeenCalledWith(0);

    mockExit.mockRestore();
  });

  test("Invalid JSON", () => {
    const input = readFileSync("./tests/step1/invalid.json", "utf8");
    const tokens = lexer(input);
    expect(() => parser(tokens)).toThrow();
  });
});
