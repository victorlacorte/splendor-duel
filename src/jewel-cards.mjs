import { z } from "zod";

const abilitySchema = z.enum([
  "take_another_turn",
  "take_privilege_scroll",
  "take_opp_token",
  "take_board_token",
  "copy_color",
]);

const costSchema = z.object({
  white: z.number(),
  blue: z.number(),
  black: z.number(),
  red: z.number(),
  green: z.number(),
  pearl: z.number(),
});

const colorSchema = z.enum([
  "white",
  "blue",
  "black",
  "red",
  "green",
  "colorless",
]);

const _jewelCardSchema = z.object({
  //id: z.number(),
  tier: z.number().refine(
    (data) => data >= 1 && data <= 3,
    (data) => ({
      message: `Only tiers 1, 2, and 3 are valid; got ${data}`,
    }),
  ),
  cost: costSchema.partial(),
  prestigePoints: z.optional(z.number()),
  crownPoints: z.optional(z.number()),
  color: colorSchema,
  jewelBonus: z.optional(z.number()),
  ability: z.optional(z.array(abilitySchema)),
});

const _jewelCardsSchema = z.array(_jewelCardSchema);

export const jewelCardSchema = _jewelCardSchema.merge(
  z.object({ id: z.number() }),
);

export const jewelCardsSchema = z.preprocess(
  (data) => {
    if (!Array.isArray(data)) return data;

    return data.map((card, index) => {
      card["id"] = index;

      return card;
    });
  },
  z.array(jewelCardSchema).refine(
    (data) => data.length === 67,
    (data) => ({ message: `Expected 67 cards, got ${data.length}` }),
  ),
);

/**
 * @satisfies {z.infer<typeof _jewelCardsSchema>}
 */
const _jewelCards = [
  // lady with earring on the right
  {
    tier: 1,
    cost: { white: 1, blue: 1, red: 1, black: 1 },
    color: "green",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { white: 1, blue: 1, green: 1, black: 1 },
    color: "red",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { white: 1, blue: 1, green: 1, red: 1 },
    color: "black",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { white: 1, green: 1, red: 1, black: 1 },
    color: "blue",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { blue: 1, green: 1, red: 1, black: 1 },
    color: "white",
    jewelBonus: 1,
  },
  // swords
  {
    tier: 1,
    cost: { white: 3, black: 2 },
    prestigePoints: 1,
    color: "green",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { white: 2, blue: 3 },
    prestigePoints: 1,
    color: "red",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { blue: 2, green: 3 },
    prestigePoints: 1,
    color: "black",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { red: 2, black: 3 },
    prestigePoints: 1,
    color: "blue",
    jewelBonus: 1,
  },
  {
    tier: 1,
    cost: { green: 2, red: 3 },
    prestigePoints: 1,
    color: "white",
    jewelBonus: 1,
  },
  // stones that take board token
  {
    tier: 1,
    cost: { white: 2, blue: 2 },
    color: "green",
    jewelBonus: 1,
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { blue: 2, green: 2 },
    color: "red",
    jewelBonus: 1,
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { green: 2, red: 2 },
    color: "black",
    jewelBonus: 1,
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { white: 2, black: 2 },
    color: "blue",
    jewelBonus: 1,
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { red: 2, black: 2 },
    color: "white",
    jewelBonus: 1,
    ability: ["take_board_token"],
  },
  // necklaces
  {
    tier: 1,
    cost: { red: 2, black: 2, pearl: 1 },
    color: "green",
    jewelBonus: 1,
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { white: 2, black: 2, pearl: 1 },
    color: "red",
    jewelBonus: 1,
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { white: 2, blue: 2, pearl: 1 },
    color: "black",
    jewelBonus: 1,
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { green: 2, red: 2, pearl: 1 },
    color: "blue",
    jewelBonus: 1,
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { blue: 2, green: 2, pearl: 1 },
    color: "white",
    jewelBonus: 1,
    ability: ["take_another_turn"],
  },
  // crown
  {
    tier: 1,
    cost: { red: 3 },
    color: "green",
    jewelBonus: 1,
    crownPoints: 1,
  },
  {
    tier: 1,
    cost: { black: 3 },
    color: "red",
    jewelBonus: 1,
    crownPoints: 1,
  },
  {
    tier: 1,
    cost: { white: 3 },
    color: "black",
    jewelBonus: 1,
    crownPoints: 1,
  },
  {
    tier: 1,
    cost: { green: 3 },
    color: "blue",
    jewelBonus: 1,
    crownPoints: 1,
  },
  {
    tier: 1,
    cost: { blue: 3 },
    color: "white",
    jewelBonus: 1,
    crownPoints: 1,
  },
  // colorless
  {
    tier: 1,
    cost: { blue: 2, red: 2, black: 1, pearl: 1 },
    prestigePoints: 1,
    color: "colorless",
    jewelBonus: 1,
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { white: 2, green: 2, black: 1, pearl: 1 },
    prestigePoints: 1,
    color: "colorless",
    jewelBonus: 1,
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { black: 4, pearl: 1 },
    prestigePoints: 1,
    color: "colorless",
    jewelBonus: 1,
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { white: 4, pearl: 1 },
    color: "colorless",
    jewelBonus: 1,
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { red: 4, pearl: 1 },
    color: "colorless",
    prestigePoints: 3,
  },
  // tier 2
  // fancy crown
  {
    tier: 2,
    cost: { white: 2, blue: 2, black: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    color: "green",
    jewelBonus: 1,
  },
  {
    tier: 2,
    cost: { white: 2, blue: 2, green: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    color: "red",
    jewelBonus: 1,
  },
  {
    tier: 2,
    cost: { blue: 2, green: 2, red: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    color: "black",
    jewelBonus: 1,
  },
  {
    tier: 2,
    cost: { white: 2, red: 2, black: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    color: "blue",
    jewelBonus: 1,
  },
  {
    tier: 2,
    cost: { green: 2, red: 2, black: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    color: "white",
    jewelBonus: 1,
  },
  // "s" ring
  {
    tier: 2,
    cost: { blue: 2, green: 4, pearl: 1 },
    prestigePoints: 2,
    color: "green",
    jewelBonus: 1,
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { green: 2, red: 4, pearl: 1 },
    prestigePoints: 2,
    color: "red",
    jewelBonus: 1,
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { red: 2, black: 4, pearl: 1 },
    prestigePoints: 2,
    color: "black",
    jewelBonus: 1,
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { white: 2, blue: 4, pearl: 1 },
    prestigePoints: 2,
    color: "blue",
    jewelBonus: 1,
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { white: 4, black: 2, pearl: 1 },
    prestigePoints: 2,
    color: "white",
    jewelBonus: 1,
    ability: ["take_privilege_scroll"],
  },
  // broken dome
  {
    tier: 2,
    cost: { white: 3, red: 4 },
    prestigePoints: 1,
    color: "green",
    jewelBonus: 1,
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { green: 4, black: 3 },
    prestigePoints: 1,
    color: "blue",
    jewelBonus: 1,
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { blue: 3, black: 4 },
    prestigePoints: 1,
    color: "red",
    jewelBonus: 1,
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { blue: 3, red: 4 },
    prestigePoints: 1,
    color: "white",
    jewelBonus: 1,
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { white: 4, green: 3 },
    prestigePoints: 1,
    color: "black",
    jewelBonus: 1,
    ability: ["take_opp_token"],
  },
  // two rings
  {
    tier: 2,
    cost: { green: 5, red: 2 },
    prestigePoints: 1,
    color: "blue",
    jewelBonus: 2,
  },
  {
    tier: 2,
    cost: { red: 5, black: 2 },
    prestigePoints: 1,
    color: "green",
    jewelBonus: 2,
  },
  {
    tier: 2,
    cost: { white: 5, blue: 2 },
    prestigePoints: 1,
    color: "black",
    jewelBonus: 2,
  },
  {
    tier: 2,
    cost: { white: 2, black: 5 },
    prestigePoints: 1,
    color: "red",
    jewelBonus: 2,
  },
  {
    tier: 2,
    cost: { blue: 5, green: 2 },
    prestigePoints: 1,
    color: "white",
    jewelBonus: 2,
  },
  // colorless
  {
    tier: 2,
    cost: { green: 6, pearl: 1 },
    prestigePoints: 2,
    color: "colorless",
    jewelBonus: 1,
    ability: ["copy_color"],
  },
  {
    tier: 2,
    cost: { green: 6, pearl: 1 },
    color: "colorless",
    jewelBonus: 1,
    crownPoints: 2,
    ability: ["copy_color"],
  },
  {
    tier: 2,
    cost: { blue: 6, pearl: 1 },
    color: "colorless",
    jewelBonus: 1,
    crownPoints: 2,
    ability: ["copy_color"],
  },
  {
    tier: 2,
    cost: { blue: 6, pearl: 1 },
    color: "colorless",
    prestigePoints: 5,
  },
  // tier 3
  // smile
  {
    tier: 3,
    cost: { white: 6, blue: 2, black: 2 },
    prestigePoints: 4,
    color: "white",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { green: 2, red: 6, black: 2 },
    prestigePoints: 4,
    color: "red",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { white: 2, red: 2, black: 6 },
    prestigePoints: 4,
    color: "black",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { white: 2, blue: 6, green: 2 },
    prestigePoints: 4,
    color: "blue",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { blue: 2, green: 6, red: 2 },
    prestigePoints: 4,
    color: "green",
    jewelBonus: 1,
  },
  // crown
  {
    tier: 3,
    cost: { blue: 3, red: 5, black: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    color: "white",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { blue: 5, green: 3, black: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    color: "red",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { white: 3, green: 3, black: 5, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    color: "blue",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { white: 5, blue: 3, red: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    color: "green",
    jewelBonus: 1,
  },
  {
    tier: 3,
    cost: { white: 3, green: 5, red: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    color: "black",
    jewelBonus: 1,
  },
  // colorless
  {
    tier: 3,
    cost: { white: 8 },
    color: "colorless",
    prestigePoints: 6,
  },
  {
    tier: 3,
    cost: { black: 8 },
    crownPoints: 3,
    color: "colorless",
    jewelBonus: 1,
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { red: 8 },
    prestigePoints: 3,
    color: "colorless",
    jewelBonus: 1,
    ability: ["copy_color", "take_another_turn"],
  },
];

export const jewelCards = jewelCardsSchema.parse(_jewelCards);

/**
 * @param {number} tier
 */
function cardsFromTier(tier) {
  return jewelCards.filter((card) => card.tier == tier);
}

export const tier1Cards = cardsFromTier(1);
export const tier2Cards = cardsFromTier(2);
export const tier3Cards = cardsFromTier(3);
