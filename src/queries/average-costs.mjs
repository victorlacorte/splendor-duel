import { benchmark } from "./queries.mjs";

import {
  jewelCards,
  tier1Cards,
  tier2Cards,
  tier3Cards,
} from "../jewel-cards.mjs";
import { toPrecision } from "../utils.mjs";

/**
 * @typedef Card
 * @prop {number} [prestigePoints]
 * @prop {Record<string, number>} cost
 *
 * @param {Array<Card>} cards
 */
function averagePrestigeCost(cards) {
  const cardsWithPrestige = cards.filter(
    (card) => card.prestigePoints !== undefined,
  );

  const totalCost = cardsWithPrestige.reduce((prev, curr) => {
    return prev + Object.values(curr.cost).reduce((p, c) => p + c);
  }, 0);

  const totalPrestige = cardsWithPrestige.reduce((prev, curr) => {
    return prev + curr.prestigePoints;
  }, 0);

  return toPrecision(2)(totalCost / totalPrestige);
}

benchmark(() => {
  //average prestige cost = 3.6
  //tier 1 cost = 4.64
  //tier 2 cost = 4.16
  //tier 3 cost = 2.86
  console.log("average prestige cost =", averagePrestigeCost(jewelCards));
  console.log("tier 1 cost =", averagePrestigeCost(tier1Cards));
  console.log("tier 2 cost =", averagePrestigeCost(tier2Cards));
  console.log("tier 3 cost =", averagePrestigeCost(tier3Cards));
});
