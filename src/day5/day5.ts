import * as utils from "../utils";

const input = utils.getInput();

interface Map {
  inputType: string;
  outputType: string;
  mappingRules: MappingRule[];
}

interface MappingRule {
  destRange: number;
  srcRange: number;
  rangeLen: number;
}

const maps: Map[] = input
  .split(/\n\s*\n/)
  .slice(1)
  .map((x) => {
    const map: Map = {
      inputType: x.split("-")[0],
      outputType: x.split("-")[2].split(" ")[0],
      mappingRules: [],
    };
    for (const line of x.split("\n").slice(1)) {
      const mappingRule: MappingRule = {
        destRange: parseInt(line.split(" ")[0]),
        srcRange: parseInt(line.split(" ")[1]),
        rangeLen: parseInt(line.split(" ")[2]),
      };
      map.mappingRules.push(mappingRule);
    }
    return map;
  });

function part1() {
  const seeds = input
    .split("\n")[0]
    .substring(input.split("\n")[0].indexOf(": ") + 2)
    .split(" ")
    .map((x) => parseInt(x));
    let lowestNr = -1;
  for (const seed of seeds) {
    let nextSeedNr = seed;
    for (const map of maps) {
      for (const mappingRule of map.mappingRules) {
        if (mappingRule.srcRange <= nextSeedNr && nextSeedNr < mappingRule.srcRange + mappingRule.rangeLen) {
          nextSeedNr = mappingRule.destRange + (nextSeedNr - mappingRule.srcRange);
          break;
        }
      }
    }
    if (nextSeedNr < lowestNr || lowestNr == -1) {
      lowestNr = nextSeedNr;
    }
  }
  return lowestNr;
}

function part2() {
  const seedRanges = input
    .split("\n")[0]
    .substring(input.split("\n")[0].indexOf(": ") + 2)
    .split(/([0-9]* [0-9]*)[ ]?/g)
    .filter((x) => x != "")
    .map((x) => x.split(" ").map((x) => parseInt(x)));
  console.log(seedRanges);
  let lowestNr = -1;
  for (const seedRange of seedRanges) {
    console.log("New range...");
    for (let i = seedRange[0]; i < seedRange[0] + seedRange[1]; i++) {
      let nextSeedNr = i;
      for (const map of maps) {
        for (const mappingRule of map.mappingRules) {
          if (mappingRule.srcRange <= nextSeedNr && nextSeedNr < mappingRule.srcRange + mappingRule.rangeLen) {
            nextSeedNr = mappingRule.destRange + (nextSeedNr - mappingRule.srcRange);
            break;
          }
        }
      }
      if (nextSeedNr < lowestNr || lowestNr == -1) {
        lowestNr = nextSeedNr;
      }
    }
  }

  return lowestNr;
}

utils.writeOutput(part1(), part2());
