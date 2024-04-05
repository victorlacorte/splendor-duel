import assert from "node:assert/strict";

import { jewelCardsSchema, jewelCards } from "./jewel-cards.mjs";

jewelCardsSchema.parse(jewelCards);
assert.equal(jewelCards.length, 67);
