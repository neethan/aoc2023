import { getTestInput, getPuzzleInput } from "../utils";

const testInput = getPuzzleInput();
let sum: number = 0;

for (let line of testInput.split("\n")) {
  line = line.replace(/[a-z]*/g, "").trim();
  const firstnumber = parseInt(line[0]) * 10;
  const lastnumber = parseInt(line[line.length - 1]);
  sum += firstnumber + lastnumber;
}

console.log(sum);
