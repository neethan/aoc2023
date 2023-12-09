import * as utils from "../utils";

const input = utils.getInput();

function solution(reverse: boolean) {
  const histories: number[][] = input.split("\n").map((line) => line.split(" ").map((num) => parseInt(num, 10)));
  let totalSum = 0;
  for (const history of histories) {
    const ds: number[][] = [];
    ds.push(reverse ? history.reverse() : history);
    do {
      const difference: number[] = [];
      ds[ds.length - 1].forEach((val, idx) => {
        if (idx === 0) return;
        difference.push(val - ds[ds.length - 1][idx - 1]);
      });
      ds.push(difference);
    } while (!ds[ds.length - 1].every((x) => x === 0));
    for (let i = ds.length - 2; i >= 0; i--) {
      const lastInDifference = ds[i][ds[i].length - 1] + ds[i + 1][ds[i + 1].length - 1];
      ds[i].push(lastInDifference);
    }
    totalSum += ds[0][ds[0].length - 1];
  }
  return totalSum;
}
function part1() {
  return solution(false);
}

function part2() {
  return solution(true);
}

utils.writeOutput(part1(), part2());
