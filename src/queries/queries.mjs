import { toPrecision } from "../utils.mjs";

export function benchmark(callback) {
  console.time("time elapsed");
  callback();
  console.timeEnd("time elapsed");
}

/**
 * @param {Array} totalCards
 * @param {Array} filteredCards
 */
export function createSummary(totalCards, filteredCards) {
  const total = totalCards.length,
    filteredTotal = filteredCards.length;

  return `${filteredTotal} of ${total} (${toPrecision(0)((filteredTotal / total) * 100)}%)`;
}
