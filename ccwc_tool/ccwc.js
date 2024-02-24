import * as fs from "fs";

function countBytes(data) {
  console.log(`${Buffer.byteLength(data)}`);
}

function countLines(data) {
  const lines = data.split(/\r?\n/).length;
  console.log(lines);
}

function countWords(data) {
  const words = data.split(/\s+/).filter((word) => word !== "").length;
  console.log(words);
}

function countCharacters(data) {
  console.log(data.length);
}

function defaultOutput(data) {
  const lines = data.split(/\r?\n/).length;
  const words = data.split(/\s+/).filter((word) => word !== "").length;
  const bytes = Buffer.byteLength(data);
  console.log(`${lines} ${words} ${bytes}`);
}

function handleNoImageProvided() {
  let data = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("readable", () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      data += chunk;
    }
  });
  process.stdin.on("end", () => {
    processInput(data, "-l");
  });
}

function main() {
  if (!process.stdin.isTTY) {
    handleNoImageProvided();
  } else {
    let option = process.argv[2];
    if (!option || option.length > 2) {
      option = undefined;
    }
    const filename = option ? process.argv[3] : process.argv[2];

    if (!fs.existsSync(filename)) {
      console.error("File not found:", filename);
      process.exit(1);
    }

    const fileData = fs.readFileSync(filename, { encoding: "utf-8" });
    processInput(fileData, option);
  }
}

function processInput(data, option) {
  switch (option) {
    case "-c":
      countBytes(data);
      break;
    case "-l":
      countLines(data);
      break;
    case "-w":
      countWords(data);
      break;
    case "-m":
      countCharacters(data);
      break;
    default:
      defaultOutput(data);
  }
}

main();
