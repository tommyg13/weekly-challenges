import { readFileSync } from "fs";
import { lexer, parser } from "..";

describe("folder Step 2 Tests", () => {
  // Iterate over fail files
  for (let i = 1; i <= 33; i++) {
    test(`Fail File ${i}`, () => {
      const input = readFileSync(`tests/test 2/fail${i}.json`, "utf8");
      const tokens = lexer(input);
      expect(() => parser(tokens)).toThrow();
    });
  }

  // Iterate over pass files
  //   for (let i = 1; i <= 3; i++) {
  //     test(`Pass File ${i}`, () => {
  //       const input = readFileSync(`tests/test 2/pass${i}.json`, "utf8");
  //       const tokens = lexer(input);
  //       const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
  //       parser(tokens);
  //       expect(mockExit).toHaveBeenCalledWith(0);
  //       mockExit.mockRestore();
  //     });
  //   }
});
