import fs from "fs";

const args = process.argv;
const validExtensions = [".tsv", ".csv"];

function getFieldNumbers(fieldArg) {
  let fieldNumbers = [];

  for (let char of fieldArg) {
    if (parseInt(char)) {
      fieldNumbers.push(char - 1);
    }
  }

  return fieldNumbers;
}

function parseArgs() {
  const delimiterArg = args.find((arg) => arg.includes("-d"));
  const fieldArg = args.find((arg) => arg.includes("-f"));

  //first param is node, second is file to execute
  const file = args
    .slice(2)
    .find((arg) => validExtensions.some((ext) => arg.endsWith(ext)));

  const delimiter =
    delimiterArg && delimiterArg.length === 3 ? delimiterArg.at(-1) : "\t";

  const fieldNumbers = getFieldNumbers(fieldArg);

  return { delimiter, fieldNumbers, file };
}

function handleNoImageProvided(delimiter, fieldNumbers) {
  let data = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("readable", () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      data += chunk;
    }
  });
  process.stdin.on("end", () => {
    cut(delimiter, fieldNumbers, data);
  });
}

function cut(delimiter, fieldNumbers, fileData) {
  const splited = fileData.split("\n").map((el) => el.split(delimiter));
  let output = "";
  for (let data of splited) {
    fieldNumbers.map((num, index) => {
      if (data[num]) {
        output += `${data[num]} ${
          index === fieldNumbers.length - 1 ? "\n" : ""
        }`;
      }
    });
  }

  console.log(output);
}

function main() {
  const { delimiter, fieldNumbers, file } = parseArgs();
  if (!process.stdin.isTTY) {
    handleNoImageProvided(delimiter, fieldNumbers);
  } else {
    if (!fs.existsSync(file)) {
      console.error("Error: File not found or inaccessible.");
      process.exit(1);
    }

    const fileData = fs.readFileSync(file, { encoding: "utf-8" });

    cut(delimiter, fieldNumbers, fileData);
  }
}

main();
