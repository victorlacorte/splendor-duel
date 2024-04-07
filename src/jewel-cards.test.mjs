import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { tier1Cards, tier2Cards, tier3Cards } from "./jewel-cards.mjs";

describe("jewel-cards", () => {
  it("cards were correctly inputted", () => {
    assert.equal(tier1Cards.length, 31);
    assert.equal(tier2Cards.length, 24);
    assert.equal(tier3Cards.length, 12);
  });
});
