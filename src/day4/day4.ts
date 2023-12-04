import * as utils from "../utils";

const input = utils.getInput();

function getMyWinningNrs(card: string): number[] {
  const winningNrs = new Set(
    card
      .split(": ")[1]
      .substring(0, card.split(": ")[1].indexOf("|") - 1)
      .match(/(.{1,2})[ ]*/g)!
      .map((x) => parseInt(x)),
  );
  const myNrs = new Set(
    card
      .split("| ")[1]
      .match(/(.{1,2})[ ]*/g)!
      .map((x) => parseInt(x)),
  );
  const totalNrs = [];
  for (const nr of myNrs) if (winningNrs.has(nr)) totalNrs.push(nr);
  return totalNrs;
}

function part1() {
  const cards = input.split(/\r\n|\n|\r/);
  let score = 0;
  for (const card of cards) {
    const totalNrs = getMyWinningNrs(card);
    if (totalNrs.length > 0) score += 2 ** (totalNrs.length - 1);
  }
  return score;
}

function part2() {
  const cards = input.split(/\r\n|\n|\r/);
  const cardScores: number[] = new Array(cards.length).fill(0);
  const cardCopies: number[] = new Array(cards.length).fill(1);
 
  cards.forEach((card, idx) => {
    const totalNrs = getMyWinningNrs(card);
    cardScores[idx] = totalNrs.length;
    for (let i = 0; i < cardCopies[idx]; i++) {
      for (let scoreIdx = 0; scoreIdx < cardScores[idx]; scoreIdx++) {
        if (idx + scoreIdx + 1 > cards.length - 1) break;
        cardCopies[idx + scoreIdx + 1]++;
      }
    }
  });
  return cardCopies.reduce((a, b) => a + b, 0);
}

utils.writeOutput(part1(), part2());
