import * as utils from "../utils";

const input = utils.getInput();

type CardType = {
  [card: string]: number;
}

const CardValue: CardType = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const HandValue = {
  FIVE_OF_A_KIND: 9,
  FOUR_OF_A_KIND: 8,
  FULL_HOUSE: 7,
  THREE_OF_A_KIND: 6,
  TWO_PAIR: 5,
  ONE_PAIR: 4,
  HIGH_CARD: 0,
};

interface Hand {
  cards: number[];
  bid: number;
  value: number;
}

function getHandValue(hand: number[]) {
  const handSet = new Set(hand);
  if (handSet.size === hand.length) {
    return HandValue.HIGH_CARD;
  } else if (handSet.size === 4) {
    return HandValue.ONE_PAIR;
  } else if (handSet.size === 3) {
    // Can be two pair or three of a kind
    // If we have counts of 2 + 2 + 1 then we have two pair
    // If we have counts of 3 + 1 + 1, then we have three of a kind
    const counts = new Map<number, number>();
    for (const card of hand) {
      counts.set(card, (counts.get(card) ?? 0) + 1);
    }
    if (Math.max(...counts.values()) === 3) {
      return HandValue.THREE_OF_A_KIND;
    } else {
      return HandValue.TWO_PAIR;
    }
  } else if (handSet.size === 2) {
    // Either full house or four of a kind
    const counts = new Map<number, number>();
    for (const card of hand) {
      counts.set(card, (counts.get(card) ?? 0) + 1);
    }
    if (Math.max(...counts.values()) === 4) {
      return HandValue.FOUR_OF_A_KIND;
    } else {
      return HandValue.FULL_HOUSE;
    }
  } else if (handSet.size === 1) {
    return HandValue.FIVE_OF_A_KIND;
  }
  throw new Error("Invalid hand");
}

function parseCard(card: string) {
  return CardValue[card];
}

function part1() {
  const hands: Hand[] = [];
  for (const line of input.split("\n")) {
    const [cardsStr, bid] = line.split(" ");
    const cards = cardsStr.split("").map((card) => parseCard(card));
    hands.push({
      cards: cards,
      bid: parseInt(bid),
      value: getHandValue(cards),
    })
  }
  hands.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    }
    // Same value, so compare cards
    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i] < b.cards[i]) {
        return -1;
      } else if (a.cards[i] > b.cards[i]) {
        return 1;
      }
    }
    return 0;
  });
  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += hands[i].bid * (i + 1);
  }
  return sum;
}

function getHandValueP2(hand: number[]) {
  const handSet = new Set(hand);
  if (handSet.size === 1) {
    return HandValue.FIVE_OF_A_KIND;
  }
  const counts = new Map<number, number>();
  for (const card of hand) {
    counts.set(card, (counts.get(card) ?? 0) + 1);
  }

  const jokers = counts.get(1) ?? 0;
  counts.delete(1);
  const highestCount = Math.max(...counts.values());
  const countsArr = Array.from(counts.values());
  countsArr.splice(countsArr.indexOf(highestCount), 1)
  const secondHighest = Math.max(...countsArr);
  if (highestCount == 5) {
    return HandValue.FIVE_OF_A_KIND;
  } else if (highestCount == 4) {
    if (jokers == 1) {
      // 4 + j
      return HandValue.FIVE_OF_A_KIND;
    } else {
      // 4 + x
      return HandValue.FOUR_OF_A_KIND;
    }
  } else if (highestCount == 3) {
    if (jokers == 2) {
       // 3 + j + j
      return HandValue.FIVE_OF_A_KIND;
    } else if (jokers == 1) {
      // 3 + j + x
      return HandValue.FOUR_OF_A_KIND;
    } else {
      if (secondHighest == 2) {
        // 3 + x + x
        return HandValue.FULL_HOUSE;
      } else {
        // 3 + x + y
        return HandValue.THREE_OF_A_KIND;
      }
    }
  } else if (highestCount == 2) {
    if (jokers == 3) {
      // 2 + j + j + j
      return HandValue.FIVE_OF_A_KIND;
    } else if (jokers == 2) {
      // 2 + j + j + x
      return HandValue.FOUR_OF_A_KIND;
    } else if (jokers == 1) {
      if (secondHighest == 2) {
        // 2 + j + x + x
        return HandValue.FULL_HOUSE;
      } else {
        // 2 + j + x + y
        return HandValue.THREE_OF_A_KIND;
      }
    } else {
      // zero jokers: either
      // 2 + 2 + 1
      // 2 + 1 + 1 + 1
      if (secondHighest == 2) {
        // 2 + x + x + y
        return HandValue.TWO_PAIR;
      } else {
        // 2 + x + y + z
        return HandValue.ONE_PAIR;
      }
    }
  } else if (highestCount == 1) {
    if (jokers == 4) {
      // j + j + j + j + x
      return HandValue.FIVE_OF_A_KIND;
    } else if (jokers == 3) {
      // j + j + j + x + y
      return HandValue.FOUR_OF_A_KIND;
    } else if (jokers == 2) {
      // j + j + x + y + z
      return HandValue.THREE_OF_A_KIND;
    } else if (jokers == 1) {
      // j + x + y + z + w
      return HandValue.ONE_PAIR;
    } else {
      // zero jokers
      return HandValue.HIGH_CARD;
    }
  }
  throw new Error("Invalid hand");
}

const CardValueP2: CardType = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};

function parseCardP2(card: string) {
  return CardValueP2[card];
}

function part2() {
  const hands: Hand[] = [];
  for (const line of input.split("\n")) {
    const [cardsStr, bid] = line.split(" ");
    const cards = cardsStr.split("").map((card) => parseCardP2(card));
    hands.push({
      cards: cards,
      bid: parseInt(bid),
      value: getHandValueP2(cards),
    })
  }
  hands.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    }
    // Same value, so compare cards
    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i] < b.cards[i]) {
        return -1;
      } else if (a.cards[i] > b.cards[i]) {
        return 1;
      }
    }
    return 0;
  });
  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += hands[i].bid * (i + 1);
  }
  return sum;
}

utils.writeOutput(part1(), part2());
