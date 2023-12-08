import path from "node:path/posix";
import * as utils from "../utils";

const input = utils.getInput();

interface Node {
  me: string;
  left: string;
  right: string;
}

interface NodeBetter {
  me: string;
  left?: NodeBetter;
  right?: NodeBetter;
}

const instructions = input.split("\n")[0].split("");
const nodes: Node[] = [];
input
  .split("\n")
  .slice(2)
  .forEach((line) => {
    nodes.push({
      me: line.split(" ")[0],
      left: line.split(" ")[2].substring(1, 4),
      right: line.split(" ")[3].substring(0, 3),
    });
  });

function part1() {
  let currentNode = nodes.find((node) => node.me == "AAA")!;
  let pathLen = 0;
  while (currentNode.me != "ZZZ") {
    const instruction = instructions[pathLen % instructions.length];
    if (instruction == "L") {
      currentNode = nodes.find((node) => node.me == currentNode.left)!;
    } else if (instruction == "R") {
      currentNode = nodes.find((node) => node.me == currentNode.right)!;
    }
    pathLen++;
  }

  return pathLen;
}

function checkAllNodes(nodes: NodeBetter[]) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].me[2] != "Z") {
      return true;
    }
  }
  return false;
}

const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => (a * b) / gcd(a, b));
};

function part2() {
  const realNodes: NodeBetter[] = [];
  for (let i = 0; i < nodes.length; i++) {
    realNodes.push({
      me: nodes[i].me,
    });
  }
  for (let i = 0; i < realNodes.length; i++) {
    realNodes[i].left = realNodes.find((node) => node.me == nodes[i].left);
    realNodes[i].right = realNodes.find((node) => node.me == nodes[i].right);
  }
  const currentNodes = realNodes.filter((node) => node.me[2] == "A")!;
  const pathLengths = new Array(currentNodes.length).fill(0);
  for (let i = 0; i < currentNodes.length; i++) {
    while (currentNodes[i].me[2] !== "Z") {
      const instruction = instructions[pathLengths[i] % instructions.length];
      if (instruction == "L") {
        currentNodes[i] = currentNodes[i].left!;
      } else if (instruction == "R") {
        currentNodes[i] = currentNodes[i].right!;
      }
      pathLengths[i]++;
    }
  }
  console.log(pathLengths);
  return lcm(...pathLengths);
}

utils.writeOutput(part1(), part2());
