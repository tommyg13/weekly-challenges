export function getFrequencyTable(data) {
  if (typeof data !== "string") {
    throw new Error("Input data should be a string");
  }

  const frequencyTable = {};
  for (let char of data) {
    if (frequencyTable[char] === undefined) {
      frequencyTable[char] = 1;
    } else {
      frequencyTable[char]++;
    }
  }
  return frequencyTable;
}

class Node {
  constructor(value, frequency) {
    this.value = value;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

export function buildHuffmanTree(frequencyTable) {
  const nodes = Object.entries(frequencyTable).map(
    ([char, freq]) => new Node(char, freq)
  );

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency); // reorder after finding two smaller frequencies

    const left = nodes.shift();
    const right = nodes.shift();

    const parent = new Node(null, left.frequency + right.frequency);
    parent.left = left;
    parent.right = right;

    nodes.push(parent);
  }

  return nodes[0];
}

export function generatePrefixCodes(root) {
  const prefixCodes = {};

  function traverse(node, currentCode) {
    if (node.value !== null) {
      prefixCodes[node.value] = currentCode;
    } else {
      traverse(node.left, currentCode + "0");
      traverse(node.right, currentCode + "1");
    }
  }

  traverse(root, "");

  return prefixCodes;
}
