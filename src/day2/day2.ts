import * as utils from "../utils";

const input = utils.getInput();

type Color = "red" | "green" | "blue";

interface Game {
  gameNr: number;
  draws: Draw[];
}

interface Draw {
  moves: Move[];
}

interface Move {
  color: Color;
  number: number;
}

function parseGame(input: string) {
  const game = {
    gameNr: parseInt(input.substring(5, input.indexOf(":"))),
    draws: input
      .substring(input.indexOf(":") + 2)
      .split("; ")
      .map((draw) => {
        return {
          moves: draw.split(", ").map((move) => {
            return {
              color: move.split(" ")[1] as Color,
              number: parseInt(move.split(" ")[0]),
            } as Move;
          }),
        } as Draw;
      }),
  } as Game;

  return game;
}

function part1() {
  let sum = 0;

  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;

  for (let game of input.split("\n")) {
    game = game.trim();
    
    const thisGame = parseGame(game);

    let increase = true;
    for (const draw of thisGame.draws) {
      let red = 0;
      let green = 0;
      let blue = 0;
      for (const move of draw.moves) {
        if (move.color === "red") red += move.number;
        if (move.color === "green") green += move.number;
        if (move.color === "blue") blue += move.number;
      }
      if (red > maxRed || green > maxGreen || blue > maxBlue) {
        increase = false;
        break;
      }
    }
    if (increase) sum += thisGame.gameNr;
  }

  return sum;
}

function part2() {
  let power = 0;

  for (let game of input.split("\n")) {
    game = game.trim();
    
    const thisGame = parseGame(game);

    let red = 0;
    let green = 0;
    let blue = 0;
    for (const draw of thisGame.draws) {
      for (const move of draw.moves) {
        if (move.color === "red" && move.number > red) red = move.number;
        if (move.color === "green" && move.number > green) green = move.number;
        if (move.color === "blue" && move.number > blue) blue = move.number;
      }
    }
    power += (red * green * blue);
  }

  return power;
}

utils.writeOutput(part1(), part2());
