import { benchmark, createSummary } from "./query-utils.mjs";

import { tier2Cards } from "../jewel-cards.mjs";
import {
  createIdSetFrom,
  getCardsFromIdSet,
  setDifference,
} from "../utils.mjs";

const cost2OrLess = tier2Cards.filter((card) =>
  Object.values(card.cost).every((cost) => cost <= 2),
);

const cost4OrLess = tier2Cards.filter((card) =>
  Object.values(card.cost).every((cost) => cost <= 4),
);

const cost2OrLessSet = createIdSetFrom(cost2OrLess);
const cost4OrLessSet = createIdSetFrom(cost4OrLess);
const diff = setDifference(cost4OrLessSet, cost2OrLessSet);
const diffCards = Array.from(getCardsFromIdSet(diff, cost4OrLess));

benchmark(() => {
  console.log(createSummary(tier2Cards, diffCards), diffCards);
});
