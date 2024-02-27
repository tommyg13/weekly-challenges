import fs from "fs";

const HEADER_DELIMETER = "---HEADER_END---";

function serializeFrequencyTable(frequencyTable) {
  return JSON.stringify(frequencyTable);
}

function splitContentToHeaderAndFooter(filename, type = "header") {
  const text = readFromFile(filename);
  const index = type === "header" ? 0 : 1;
  const part = text.split(HEADER_DELIMETER)[index] || "";
  return part.trim().split(",");
}

export function writeHeader(filename, frequencyTable) {
  const header = serializeFrequencyTable(frequencyTable);
  const delimiter = `\n${HEADER_DELIMETER}\n`;
  fs.writeFileSync(filename, header + delimiter, { flag: "a" });
}

export function writeCompressedData(filename, encodedData) {
  fs.writeFileSync(filename, Buffer.from(encodedData), { flag: "a" });
}

export function encodeText(text, prefixCodes) {
  let encodedBits = "";
  for (let char of text) {
    encodedBits += prefixCodes[char];
  }

  // make bits length a multiple of 8
  const paddingLength = (8 - (encodedBits.length % 8)) % 8;
  encodedBits += "0".repeat(paddingLength);

  const encodedBytes = [];
  // Pack the encoded bits into bytes
  for (let i = 0; i < encodedBits.length; i += 8) {
    const byte = encodedBits.substr(i, 8);
    encodedBytes.push(parseInt(byte, 2));
  }

  return encodedBytes;
}

export function readFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

export function rebuildPrefixFromFileHeader(filename) {
  const header = splitContentToHeaderAndFooter(filename, "header");

  const table = JSON.parse(header);
  return table;
}

export function decodeText(compressedData, prefixTable) {
  let compressedBits = "";
  for (let byte of compressedData) {
    const binary = byte.toString(2).padStart(8, "0");
    compressedBits += binary;
  }

  let decodedText = "";
  let currentBit = "";
  for (let bit of compressedBits) {
    currentBit += bit;
    if (currentBit in prefixTable) {
      decodedText += prefixTable[currentBit];
      currentBit = "";
    }
    console.log("finished");
    return decodedText;
  }
}

export function writeDecompressedData(filename, decodedText) {
  fs.writeFileSync(filename, decodedText);
}
