import { buildHuffmanTree, generatePrefixCodes } from "../huffman";

describe("build Huffman tree", () => {
  test("should build correct tree for given frequencies", () => {
    const frequencyTable = {
      b: 50,
      a: 77,
      c: 32,
    };
    const root = buildHuffmanTree(frequencyTable);
    expect(root.frequency).toBe(159);
    expect(root.left.frequency).toBe(77);
    expect(root.right.frequency).toBe(82);
    expect(root.right.left.frequency).toBe(32);
    expect(root.right.right.frequency).toBe(50);
  });
});

describe("generate prefix codes", () => {
  test("should generate correct prefix codes for given tree", () => {
    const frequencyTable = {
      b: 50,
      a: 77,
      c: 32,
    };
    const root = buildHuffmanTree(frequencyTable);
    const prefixCodes = generatePrefixCodes(root);
    expect(prefixCodes["a"]).toBe("0");
    expect(prefixCodes["b"]).toBe("11");
    expect(prefixCodes["c"]).toBe("10");
  });
});
