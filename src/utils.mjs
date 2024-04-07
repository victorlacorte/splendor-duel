import { z } from "zod";

/**
 * Return a random number between [0, end[
 *
 * @param {number} max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Return `arr` shuffled in place with [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). **Notice**: this function mutates `arr`.
 *
 * @param {Array} arr
 */
export function shuffle(arr) {
  for (let i = arr.length - 1; i >= 1; i--) {
    const j = getRandomInt(i + 1);

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

/**
 * Return an array with `amount` elements from the beginning of `arr`.
 *
 * @param {Array} arr
 * @param {number} amount
 */
export function take(arr, amount) {
  return arr.slice(0, amount);
}

/**
 * @param {Object} config
 * @param {z.infer<typeof import('./jewel-cards.mjs').jewelCardSchema>['tier']} config.tier
 */
export function filterJewelCards(config) {}

/**
 * Return a function that rounds a number to `decimalPlaces`.
 */
export function toPrecision(decimalPlaces) {
  /**
   * @param {number} x
   */
  return (x) => {
    const power = Math.pow(10, decimalPlaces);

    return Math.round(x * power) / power;
  };
}

/**
 * @typedef Card
 * @prop {number} id
 *
 * @param {Array<Card>} cards
 */
export function createIdSetFrom(cards) {
  return new Set(cards.map((card) => card.id));
}

/**
 * @typedef Card
 * @prop {number} id
 *
 * @param {Set<number>} idSet
 * @param {Array<Card>} totalCards
 */
export function* getCardsFromIdSet(idSet, totalCards) {
  for (const id of idSet) {
    const card = totalCards.find((card) => card.id == id);

    if (card === undefined) throw new Error(`No card with id ${id} was found.`);

    yield card;
  }
}

/**
 * Return a Set with A - B
 *
 * @param {Set} a
 * @param {Set} b
 */
export function setDifference(a, b) {
  const ret = new Set();

  for (const aElem of a) {
    if (!b.has(aElem)) {
      ret.add(aElem);
    }
  }

  return ret;
}
