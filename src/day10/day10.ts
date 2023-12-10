import { start } from "repl";
import * as utils from "../utils";

const input = utils.getInput();

interface AdjacentList {
  north?: boolean;
  west?: boolean;
  east?: boolean;
  south?: boolean;
}

type PipeTypes = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

interface Pipe {
  char: string;
  adjacents: AdjacentList;
}

const adajacentChars = new Map<PipeTypes, Pipe>([
  [
    "|",
    {
      char: "|",
      adjacents: {
        north: true,
        south: true,
      },
    },
  ],
  [
    "-",
    {
      char: "-",
      adjacents: {
        west: true,
        east: true,
      },
    },
  ],
  [
    "L",
    {
      char: "L",
      adjacents: {
        north: true,
        east: true,
      },
    },
  ],
  [
    "J",
    {
      char: "J",
      adjacents: {
        north: true,
        west: true,
      },
    },
  ],
  [
    "7",
    {
      char: "7",
      adjacents: {
        south: true,
        west: true,
      },
    },
  ],
  [
    "F",
    {
      char: "F",
      adjacents: {
        south: true,
        east: true,
      },
    },
  ],
  [
    ".",
    {
      char: ".",
      adjacents: {},
    },
  ],
  [
    "S",
    {
      char: "S",
      adjacents: {},
    },
  ],
]);

const getIndexOf2DArray = (arr: string[][], char: string) => {
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i].findIndex((c) => c === char);
    if (index !== -1) {
      return [i, index];
    }
  }
  return [-1, -1];
};

const getChar = (direction: "north" | "south" | "east" | "west" | "x", map: string[][], index: number[]) => {
  switch (direction) {
    case "north":
      return map[index[0] - 1][index[1]];
    case "south":
      return map[index[0] + 1][index[1]];
    case "east":
      return map[index[0]][index[1] + 1];
    case "west":
      return map[index[0]][index[1] - 1];
    case "x":
      return map[index[0]][index[1]];
  }
};

const getPointLocation = (direction: "north" | "south" | "east" | "west" | "x", index: number[]) => {
  switch (direction) {
    case "north":
      return [index[0] - 1, index[1]];
    case "south":
      return [index[0] + 1, index[1]];
    case "east":
      return [index[0], index[1] + 1];
    case "west":
      return [index[0], index[1] - 1];
    case "x":
      return [index[0], index[1]];
  }
};

const arraysMatch = (arr1: Array<unknown>, arr2: Array<unknown>): boolean => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  // Otherwise, return true
  return true;
};

const getNextPath = (
  map: string[][],
  distanceMap: number[][],
  point: number[],
  previous: number[],
): number[] | null => {
  const char = getChar("x", map, point);
  const previousChar = getChar("x", map, previous);
  const adjacents = adajacentChars.get(char as PipeTypes)!.adjacents;
  for (const direction in adjacents) {
    // Check character in each valid direction
    const nextChar = getChar(direction as "north" | "south" | "east" | "west", map, point);
    const nextCharPos = getPointLocation(direction as "north" | "south" | "east" | "west", point);
    if (arraysMatch(previous, nextCharPos) && nextChar == previousChar) {
      continue;
    }
    if (nextChar == ".") {
      throw new Error("Invalid path");
    }
    if (distanceMap[nextCharPos[0]][nextCharPos[1]] !== 0) {
      return null;
    }
    distanceMap[nextCharPos[0]][nextCharPos[1]] = distanceMap[point[0]][point[1]] + 1;
    return nextCharPos;
  }
  throw new Error("No valid path");
};

const map = input.split("\n").map((line) => line.split(""));
const distanceMap: number[][] = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill(0));
const sP = getIndexOf2DArray(map, "S");

function part1() {
  const previousPoints: number[][] = [sP, sP];
  const points: number[][] = [];

  // Check north, south, east and west of character
  // Figure out which two are available
  if (sP[0] != 0 && ["|", "7", "F"].includes(getChar("north", map, sP))) {
    distanceMap[sP[0] - 1][sP[1]] = 1;
    points.push([sP[0] - 1, sP[1]]);
  }
  if (sP[0] != map.length && ["|", "J", "L"].includes(getChar("south", map, sP))) {
    distanceMap[sP[0] + 1][sP[1]] = 1;
    points.push([sP[0] + 1, sP[1]]);
  }
  if (sP[1] != map[0].length && ["-", "J", "7"].includes(getChar("east", map, sP))) {
    distanceMap[sP[0]][sP[1] + 1] = 1;
    points.push([sP[0], sP[1] + 1]);
  }
  if (sP[1] != 0 && ["-", "L", "F"].includes(getChar("west", map, sP))) {
    distanceMap[sP[0]][sP[1] - 1] = 1;
    points.push([sP[0], sP[1] - 1]);
  }
  if (points.length > 2) {
    throw new Error("Too many points");
  }
  do {
    const firstWay = getNextPath(map, distanceMap, points[0], previousPoints[0]);
    const secondWay = getNextPath(map, distanceMap, points[1], previousPoints[1]);
    if (firstWay == null || secondWay == null) {
      break;
    }
    previousPoints[0] = points[0];
    previousPoints[1] = points[1];
    points[0] = firstWay;
    points[1] = secondWay;
    // eslint-disable-next-line no-constant-condition
  } while (true);

  return Math.max(...distanceMap.flat());
}

function part2() {
  const corners: number[][] = [];
  distanceMap.forEach((row, i) => {
    row.forEach((val, j) => {
      if (val > 0 && ["L", "J", "7", "F"].includes(map[i][j])) {
        corners.push([i, j]);
      }
    });
  });
  let area = 0;
  for (let i = 0; i < corners.length; i++) {
    const first = i != corners.length - 1 ? corners[i][0] * corners[i + 1][1] : corners[i][0] * corners[0][1];
    const second = i != corners.length - 1 ? corners[i][1] * corners[i + 1][0] : corners[i][1] * corners[0][0];
    area += first - second;
  }
  console.log(corners.length)
  return Math.round(Math.abs(area / 2) - (corners.length / 2 / 2) + 1);
}

utils.writeOutput(part1(), part2());
