import { jewelCards } from "./jewel-cards.mjs";
import { toPrecision } from "./utils.mjs";

function getFromTier(tier) {
  return jewelCards.filter((card) => card.tier == tier);
}

const tier1 = getFromTier(1);
const tier2 = getFromTier(2);
const tier3 = getFromTier(3);

const twoDecPlaces = toPrecision(2);

function createSummary(totalCards, filteredCards) {
  const total = totalCards.length,
    filteredTotal = filteredCards.length;

  return `${filteredTotal} of ${total} (${twoDecPlaces(filteredTotal / total) * 100}%)`;
}

const cost2OrLessTier2 = tier2.filter((card) =>
  Object.values(card.cost).every((cost) => cost <= 2),
);

const cost4OrLessTier2 = tier2.filter((card) =>
  Object.values(card.cost).every((cost) => cost <= 4),
);

function benchmark(callback) {
  console.time("time elapsed");
  callback();
  console.timeEnd("time elapsed");
}

benchmark(() => {
  //console.log(createSummary(tier2, viableTier2), viableTier2);
  console.log(createSummary(tier2, viableTier2));
});

const viableTier3 = tier3.filter((card) =>
  Object.values(card.cost).every((cost) => cost < 6),
);

//benchmark(() => {
//  console.log(createSummary(tier3, viableTier3), viableTier3);
//});
