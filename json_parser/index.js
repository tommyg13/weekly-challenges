export function lexer(input) {
  if (input[0] !== "{" && input[0] !== "[") {
    return [];
  }
  let index = 0;
  const tokens = [];

  while (index < input.length) {
    let char = input[index];

    if (char === "{" || char === "}") {
      tokens.push({ type: "BRACE", value: char });
      index++;
      continue;
    }

    if (char === "[" || char === "]") {
      tokens.push({ type: "BRACKET", value: char });
      index++;
      continue;
    }

    if (char === '"') {
      let value = "";
      index++;
      while (input[index] !== '"') {
        value += input[index];
        index++;
      }
      tokens.push({ type: "STRING", value });
      index++;
      continue;
    }

    if (char === ":" || char === ",") {
      let value = "";
      value += input[index];
      tokens.push({ type: char === ":" ? "SEMI" : "COMMA", value });
      index++;
      continue;
    }

    if (char.trim() === "") {
      index++;
      continue;
    }

    const word = [];
    while (/[a-zA-Z0-9]/.test(input[index])) {
      word.push(input[index]);
      index++;
    }
    const wordStr = word.join("");
    if (wordStr === "true" || wordStr === "false") {
      tokens.push({ type: "BOOLEAN", value: wordStr === "true" });
      continue;
    } else if (wordStr === "null") {
      tokens.push({ type: "NULL", value: null });
      continue;
    } else if (!isNaN(wordStr)) {
      tokens.push({ type: "NUMBER", value: parseFloat(wordStr) });
      continue;
    }

    return [];
  }

  return tokens;
}

export function parser(tokens) {
  let index = 0;
  function parseValue() {
    if (
      tokens[index]?.type === "STRING" ||
      tokens[index]?.type === "NUMBER" ||
      tokens[index]?.type === "BOOLEAN" ||
      tokens[index]?.type === "NULL"
    ) {
      const value = tokens[index]?.value;
      index++;
      return value;
    } else if (
      tokens[index]?.type === "BRACE" &&
      tokens[index]?.value === "{"
    ) {
      return parseObject();
    } else if (
      tokens[index]?.type === "BRACKET" &&
      tokens[index]?.value === "["
    ) {
      return parseArray();
    } else {
      throw new Error("Invalid JSON: Unexpected token");
    }
  }

  function parseObject() {
    const obj = {};

    // Check for opening brace
    if (tokens[index]?.type !== "BRACE" || tokens[index]?.value !== "{") {
      throw new Error("Invalid JSON: Expecting '{'");
    }
    index++;

    // Parsing key-value pairs
    while (index < tokens.length) {
      // Check for closing brace
      if (tokens[index]?.type === "BRACE" && tokens[index]?.value === "}") {
        index++;
        return obj;
      }

      // Parsing key
      if (tokens[index]?.type !== "STRING") {
        throw new Error("Invalid JSON: Expecting string as key");
      }
      const key = tokens[index]?.value;
      index++;

      // Expecting colon
      if (tokens[index]?.type !== "SEMI") {
        throw new Error("Invalid JSON: Expecting ':'");
      }
      index++;

      // Parsing value
      obj[key] = parseValue();

      // Expecting comma or closing brace
      if (tokens[index]?.type === "COMMA") {
        if (tokens[index + 1]?.value === "}") {
          throw new Error("Invalid JSON: Trailing comma");
        }
        index++;
      } else if (
        !(tokens[index]?.type === "BRACE" && tokens[index]?.value === "}")
      ) {
        throw new Error("Invalid JSON: Expecting ',' or '}'");
      }
    }

    throw new Error("Invalid JSON: Unexpected end of input");
  }

  function parseArray() {
    const arr = [];

    // Check for opening bracket
    if (tokens[index]?.type !== "BRACKET" || tokens[index]?.value !== "[") {
      throw new Error("Invalid JSON: Expecting '['");
    }
    index++;

    // Parsing array elements
    while (index < tokens.length) {
      // Check for closing bracket
      if (tokens[index]?.type === "BRACKET" && tokens[index]?.value === "]") {
        index++;
        return arr;
      }

      // Parsing value
      arr.push(parseValue());

      // Expecting comma or closing bracket
      if (tokens[index]?.type === "COMMA") {
        if (tokens[index + 1]?.value === "}") {
          throw new Error("Invalid JSON: Trailing comma");
        }
        index++;
      } else if (
        !(tokens[index]?.type === "BRACKET" && tokens[index]?.value === "]")
      ) {
        throw new Error("Invalid JSON: Expecting ',' or ']'");
      }
    }

    throw new Error("Invalid JSON: Unexpected end of input");
  }

  // Starting the parsing process
  const result = parseValue();

  // Check for any extra tokens at the end
  if (index !== tokens.length) {
    throw new Error("Invalid JSON: Extra tokens found");
  }

  process.exit(0); // Exiting with code 0 upon successful parsing
}
