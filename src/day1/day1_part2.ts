import { exit } from "node:process";
import { getTestInput, getPuzzleInput, Dict } from "../utils";

const testInput = getPuzzleInput();
let sum: number = 0;

const numberDict: Dict<number> = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
}

function parseNumber(name: string): number {
  if (parseInt(name)) return parseInt(name);
  return numberDict[name];
}

for (let line of testInput.split("\n")) {
  line = line.trim();
  const matches = Array.from(line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g), x => x[1]);
  const firstnumber = parseNumber(matches[0]) * 10;
  const lastnumber = parseNumber(matches[matches.length - 1]);
  sum += firstnumber + lastnumber;
}

console.log(sum);
