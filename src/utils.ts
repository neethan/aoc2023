import fs from "node:fs";

export interface Dict<T> {
  [key: string]: T;
}

function currentDayFolder(): string {
  const day = process.argv[2];
  return `${__dirname}\\day${day}\\`;
}

function getTestInput() {
  console.log();
  const input = fs.readFileSync(`${currentDayFolder()}test.txt`, "utf8");
  return input;
}

function getPuzzleInput() {
  const input = fs.readFileSync(`${currentDayFolder()}input.txt`, "utf8");
  return input;
}

export function getInput() {
  const test = process.argv.length > 3 ? true : false;
  const input = test ? getTestInput() : getPuzzleInput();
  return input;
}

export function writeOutput(part1: unknown, part2: unknown = "") {
  const day = process.argv[2];
  const output = `Day ${day}\nPart 1: ${part1 as string}`;
  console.log(output + (part2 != "" ? `\nPart 2: ${part2 as string}` : ""));
  console.log()
}