import { jewelCards } from "./jewel-cards.mjs";
import { shuffle, take } from "./utils.mjs";

// 3 from tier 3, 4 from tier 2, 5 from tier 1
function init() {
  const tier1 = shuffle(jewelCards.filter((card) => card.tier == 1));
  const tier2 = shuffle(jewelCards.filter((card) => card.tier == 2));
  const tier3 = shuffle(jewelCards.filter((card) => card.tier == 3));

  return take(tier3, 3).concat(take(tier2, 4)).concat(take(tier1, 5));
}

//console.time();
const initBoard = init();
//console.timeEnd();
console.log(initBoard);
