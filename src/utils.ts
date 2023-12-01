import fs from "node:fs";

export interface Dict<T> {
  [key: string]: T;
}

export function currentDayFolder(): string {
  const day = process.argv[2];
  return `${__dirname}\\day${day}\\`;
}

export function getTestInput() {
  console.log();
  const input = fs.readFileSync(`${currentDayFolder()}test.txt`, "utf8");
  return input;
}

export function getPuzzleInput() {
  const input = fs.readFileSync(`${currentDayFolder()}input.txt`, "utf8");
  return input;
}
