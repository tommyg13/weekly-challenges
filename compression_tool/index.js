import {
  getFrequencyTable,
  buildHuffmanTree,
  generatePrefixCodes,
} from "./huffman.js";
import {
  encodeText,
  writeCompressedData,
  writeHeader,
  readFromFile,
  rebuildPrefixFromFileHeader,
  decodeText,
  writeDecompressedData,
} from "./helpers.js";

const filename = "test.txt";
const outputFilename = "compressed.txt";
const decompressedFilename = "decompressed.txt";

const text = readFromFile(filename);
if (text !== null) {
  const frequencyTable = getFrequencyTable(text);

  const root = buildHuffmanTree(frequencyTable);

  const prefixCodes = generatePrefixCodes(root);

  writeHeader(outputFilename, frequencyTable);

  const encodedData = encodeText(text, prefixCodes);
  writeCompressedData(outputFilename, encodedData);

  const rebuildedHeaders = rebuildPrefixFromFileHeader(outputFilename);

  const compressedData = readFromFile(outputFilename);
  const decodedText = decodeText(compressedData, rebuildedHeaders);

  writeDecompressedData(decompressedFilename, decodedText);
}
