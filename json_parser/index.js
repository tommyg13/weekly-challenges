export function tokenizeJSON(jsonContent) {
  return (
    jsonContent
      .match(/(\{|\}|:|,|true|false|null|\d+|"[^"]*"|\s+)/g)
      ?.filter((token) => !/\s+/.test(token)) || []
  );
}

export function isValidJSON(tokens) {
  if (tokens[0] !== "{" || tokens.at(-1) !== "}") {
    return false;
  }
  if (tokens.length === 2) {
    return tokens[0] === "{" && tokens[1] === "}";
  }
  const jsonBody = tokens.slice(1, -1);
  if (jsonBody && jsonBody.length === 3) {
    return (
      typeof jsonBody[0] === "string" &&
      jsonBody[1] === ":" &&
      jsonBody[2].match(/(\{|\}|:|,|true|false|null|\d+|"[^"]*"|\s+)/g)
        ?.length > 0
    );
  }

  let isValid = true;
  for (let i = 0; i <= jsonBody.length; i += 4) {
    const current = jsonBody[i];
    const next = jsonBody[i + 1];
    const third = jsonBody[i + 2];
    let fourth = jsonBody[i + 3] || ",";

    if (
      !(
        typeof current === "string" &&
        current.startsWith('"') &&
        current.endsWith('"') &&
        next === ":" &&
        third.match(/(\{|\}|:|,|true|false|null|\d+|"[^"]*"|\s+)/g)?.length >
          0 &&
        fourth === ","
      )
    ) {
      isValid = false;
    }
  }

  return isValid;
}
