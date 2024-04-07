import { benchmark } from "./query-utils.mjs";

import {
  jewelCards,
  tier1Cards,
  tier2Cards,
  tier3Cards,
} from "../jewel-cards.mjs";
import { toPrecision } from "../utils.mjs";

/**
 * @template {{prestigePoints?: number; cost: Record<string, number>}} T
 *
 * @param {Array<T>} cards
 */
function averagePrestigeCost(cards) {
  const cardsWithPrestige = cards.filter(
    (card) => card.prestigePoints !== undefined,
  );

  const totalCost = cardsWithPrestige.reduce((prev, curr) => {
    return prev + Object.values(curr.cost).reduce((p, c) => p + c);
  }, 0);

  const totalPrestige = cardsWithPrestige.reduce((prev, curr) => {
    // @ts-ignore: undefined prestigePoints are filtered out
    return prev + curr.prestigePoints;
  }, 0);

  return toPrecision(1)(totalCost / totalPrestige);
}

/**
 * @template {{crownPoints?: number; cost: Record<string, number>}} T
 *
 * @param {Array<T>} cards
 */
function averageCrownCost(cards) {
  const cardsWithCrown = cards.filter((card) => card.crownPoints !== undefined);

  const totalCost = cardsWithCrown.reduce((prev, curr) => {
    return prev + Object.values(curr.cost).reduce((p, c) => p + c);
  }, 0);

  const totalCrownPoints = cardsWithCrown.reduce((prev, curr) => {
    // @ts-ignore: undefined crownPoints are filtered out
    return prev + curr.crownPoints;
  }, 0);

  return toPrecision(1)(totalCost / totalCrownPoints);
}

benchmark(() => {
  //average prestige cost = 3.6
  //tier 1 cost = 3.9
  //tier 2 cost = 4.2
  //tier 3 cost = 2.9
  console.log("average prestige cost =", averagePrestigeCost(jewelCards));
  console.log("tier 1 cost =", averagePrestigeCost(tier1Cards));
  console.log("tier 2 cost =", averagePrestigeCost(tier2Cards));
  console.log("tier 3 cost =", averagePrestigeCost(tier3Cards));
});

benchmark(() => {
  //average crown cost = 4.9
  //tier 1 cost = 3
  //tier 2 cost = 5.4
  //tier 3 cost = 5.2
  console.log("average crown cost =", averageCrownCost(jewelCards));
  console.log("tier 1 cost =", averageCrownCost(tier1Cards));
  console.log("tier 2 cost =", averageCrownCost(tier2Cards));
  console.log("tier 3 cost =", averageCrownCost(tier3Cards));
});
