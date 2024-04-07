import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { setDifference, toPrecision } from "./utils.mjs";

function each(tuples, callback) {
  for (let i = 0; i < tuples.length; i++) {
    callback(tuples.at(i));
  }
}

describe("utils", () => {
  it("toPrecision", () => {
    each(
      [
        [0, 0.224, 0],
        [0, 0.225, 0],
        [1, 0.224, 0.2],
        [1, 0.225, 0.2],
        [2, 0.224, 0.22],
        [2, 0.225, 0.23],
      ],
      ([decimalPlaces, number, expected]) => {
        assert.equal(toPrecision(decimalPlaces)(number), expected);
      },
    );
  });

  it("setDifference", () => {
    each(
      [
        [new Set([1, 2, 3]), new Set([]), new Set([1, 2, 3])],
        [new Set([1, 2, 3]), new Set([1]), new Set([2, 3])],
        [new Set([1, 2, 3]), new Set([1, 2]), new Set([3])],
        [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([])],

        [new Set([]), new Set([]), new Set([])],
        [new Set([]), new Set([1]), new Set([])],
        [new Set([]), new Set([1, 2]), new Set([])],
      ],
      ([a, b, expected]) => {
        assert.deepEqual(setDifference(a, b), expected);
      },
    );
  });
});
