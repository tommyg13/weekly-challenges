import { readFileSync } from "fs";
import { lexer, parser } from "../..";

describe("Step 4 Tests", () => {
  test("Valid JSON", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    const input = readFileSync("./tests/step4/valid.json", "utf8");
    const tokens = lexer(input);
    parser(tokens);

    expect(mockExit).toHaveBeenCalledWith(0);

    mockExit.mockRestore();
  });

  test("Valid 2 JSON", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    const input = readFileSync("./tests/step4/valid2.json", "utf8");
    const tokens = lexer(input);
    parser(tokens);

    expect(mockExit).toHaveBeenCalledWith(0);

    mockExit.mockRestore();
  });

  // test("Invalid JSON", () => {
  //   const input = readFileSync("./tests/step4/invalid.json", "utf8");
  //   const tokens = lexer(input);
  //   expect(() => parser(tokens)).toThrow();
  // });
});
