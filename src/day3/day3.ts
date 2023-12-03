import { match } from "assert";
import * as utils from "../utils";

const input = utils.getInput();

interface Part {
  partnr: number;
  x: number;
  y: number;
}

const engineSchematic = input.split("\r\n").map((line) => line.split(""));
const w = engineSchematic[0].length;
const h = engineSchematic.length;

function getAdjacentChars(part: Part): number {
  let sum = 0;
  let innerSum = 0;
  for (let y = part.y - 1; y < part.y + 2; y++) {
    innerSum = 0;
    if (y < 0 || y >= h) continue;
    for (let x = part.x - 1; x < part.x + 1 + part.partnr.toString().length; x++) {
      if (x < 0 || x >= w) continue;
      if (engineSchematic[y][x].match(/[*@\-+#%=/$&]/) != null && innerSum == 0) {
        innerSum++;
        break;
      }
    }
    sum += innerSum;
    if (innerSum > 0) break;
  }
  return sum;
}

function part1() {
  const partNrs: Part[] = [];
  let sum = 0;

  input.split("\n").forEach((line, y) => {
    const re = /[\d]+/g;
    let partNr;
    while ((partNr = re.exec(line)) != null) {
      if (partNr[0] === "") return;
      partNrs.push({
        partnr: parseInt(partNr[0]),
        x: partNr.index,
        y,
      } as Part);
    }
  });

  for (const part of partNrs) {
    const adjacentChars = getAdjacentChars(part);
    if (adjacentChars > 0) {
      sum += part.partnr;
    }
  }
  return sum;
}

interface Gear {
  x: number;
  y: number;
}

const parsedSchematic: number[][] = new Array(h).fill(0).map(() => new Array(w).fill(0));[];

function findNumber(x: number, y: number) {
  let number = "";
  let i = x;
  do {
    if (parsedSchematic[y][i] == 1) return null;
    if (engineSchematic[y][i].match(/[\d]/) != null) {
      number += engineSchematic[y][i];
      parsedSchematic[y][i] = 1;
    }
    i++;
  } while (i <= w - 1 && engineSchematic[y][i].match(/[\d]/) != null)
  i = x - 1;
  if (i < 0 || engineSchematic[y][i].match(/[\d]/) == null ) return parseInt(number);
  do {
    if (parsedSchematic[y][i] == 1) return null;
    if (engineSchematic[y][i].match(/[\d]/) != null) {
      number = engineSchematic[y][i] + number;
      parsedSchematic[y][i] = 1;
    }
    i--;
  } while (i >= 0 && engineSchematic[y][i].match(/[\d]/) != null)
  return parseInt(number);
}

function getAdjacentNumbers(gear: Gear) {
  const adjacentNumbers: number[] = [];
  for (let y = gear.y - 1; y <= gear.y + 1; y++) {
    if (y < 0 || y >= h) continue;
    for (let x = gear.x - 1; x <= gear.x + 1; x++) {
      if (x < 0 || x >= w) continue;
      if (engineSchematic[y][x].match(/[\d]/) != null) {
        const newNumber = findNumber(x, y);
        if (newNumber) adjacentNumbers.push(newNumber);
      }
    }
  }
  return adjacentNumbers;
}

function part2() {
  const gears: Gear[] = [];
  let sum = 0;

  input.split("\n").forEach((line, y) => {
    const re = /[*]+/g;
    let gear;
    while ((gear = re.exec(line)) != null) {
      if (gear[0] === "") return;
      gears.push({
        x: gear.index,
        y,
      } as Gear);
    }
  });

  for (const gear of gears) {
    const adjacentNumbers = getAdjacentNumbers(gear);
    if (adjacentNumbers.length > 1) {
      console.log(adjacentNumbers);
      sum += adjacentNumbers[0] * adjacentNumbers[1];
    }
  }
  return sum;
}

utils.writeOutput(part1(), part2());
