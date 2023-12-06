import * as utils from "../utils";

const input = utils.getInput();

interface Race {
  time: number;
  record: number;
}

function part1() {
  const times = input.split("\n")[0].match(/\d+/g)!;
  const records = input.split("\n")[1].match(/\d+/g)!;
  const races: Race[] = times.map((time, index) => {
    return {
      time: parseInt(time),
      record: parseInt(records[index]),
    };
  });
  let product = 1;
  for (const race of races) {
    for (let i = 1; i < race.time; i++) {
      const timeLeft = race.time - i;
      const distanceReached = i * timeLeft;
      if (distanceReached > race.record) {
        const waysToBeat = race.time - i - i + 1;
        product *= waysToBeat;
        break;
      }
    }
  }
  return product;
}

function part2() {
  const race: Race = {
    time: parseInt(input.split("\n")[0].match(/\d+/g)!.join().replace(/,/g, "")),
    record: parseInt(input.split("\n")[1].match(/\d+/g)!.join().replace(/,/g, "")),
  };
  
  let product = 1;
  for (let i = 1; i < race.time; i++) {
    const timeLeft = race.time - i;
    const distanceReached = i * timeLeft;
    if (distanceReached > race.record) {
      const waysToBeat = race.time - i - i + 1;
      product *= waysToBeat;
      break;
    }
  }
  return product;
}

utils.writeOutput(part1(), part2());
