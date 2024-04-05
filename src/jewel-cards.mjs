import { z } from "zod";

const abilitySchema = z.enum([
  "take_another_turn",
  "take_privilege_scroll",
  "take_opp_token",
  "take_board_token",
  "copy_color",
]);

const colorSchema = z.object({
  white: z.number(),
  blue: z.number(),
  black: z.number(),
  red: z.number(),
  green: z.number(),
  pearl: z.number(),
});

const jewelCardSchema = z.object({
  tier: z.number().refine(
    (data) => data > 0 && data < 4,
    (data) => ({
      message: `Only tiers 1, 2, and 3 are valid; got ${data}`,
    }),
  ),
  cost: colorSchema.partial(),
  prestige: z.optional(z.number()),
  ability: z.optional(z.array(abilitySchema)),
  jewelBonus: z
    .optional(colorSchema.merge(z.object({ any: z.number() })).partial())
    .refine(
      (data) => (data ? Object.keys(data).length == 1 : true),
      (data) => ({
        message: `Cards can have a single bonus; got ${data}`,
      }),
    ),
  crownBonus: z.optional(z.number()),
});

export const jewelCardsSchema = z.array(jewelCardSchema);

/**
 * @type {z.infer<typeof jewelCardsSchema>} jewelCards
 */
export const jewelCards = [
  // lady with earring on the right
  {
    tier: 1,
    cost: { white: 1, blue: 1, red: 1, black: 1 },
    prestige: 0,
    jewelBonus: { green: 1 },
  },
  {
    tier: 1,
    cost: { white: 1, blue: 1, green: 1, black: 1 },
    jewelBonus: { red: 1 },
  },
  {
    tier: 1,
    cost: { white: 1, blue: 1, green: 1, red: 1 },
    jewelBonus: { black: 1 },
  },
  {
    tier: 1,
    cost: { white: 1, green: 1, red: 1, black: 1 },
    jewelBonus: { blue: 1 },
  },
  {
    tier: 1,
    cost: { blue: 1, green: 1, red: 1, black: 1 },
    jewelBonus: { white: 1 },
  },

  // swords
  {
    tier: 1,
    cost: { white: 3, black: 2 },
    prestige: 1,
    jewelBonus: { green: 1 },
  },
  {
    tier: 1,
    cost: { white: 2, blue: 3 },
    prestige: 1,
    jewelBonus: { red: 1 },
  },
  {
    tier: 1,
    cost: { blue: 2, green: 3 },
    prestige: 1,
    jewelBonus: { black: 1 },
  },
  {
    tier: 1,
    cost: { red: 2, black: 3 },
    prestige: 1,
    jewelBonus: { blue: 1 },
  },
  {
    tier: 1,
    cost: { green: 2, red: 3 },
    prestige: 1,
    jewelBonus: { white: 1 },
  },

  // stones that take board token
  {
    tier: 1,
    cost: { white: 2, blue: 2 },
    jewelBonus: { green: 1 },
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { blue: 2, green: 2 },
    jewelBonus: { red: 1 },
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { green: 2, red: 2 },
    jewelBonus: { black: 1 },
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { white: 2, black: 2 },
    jewelBonus: { blue: 1 },
    ability: ["take_board_token"],
  },
  {
    tier: 1,
    cost: { red: 2, black: 2 },
    jewelBonus: { white: 1 },
    ability: ["take_board_token"],
  },

  // necklaces
  {
    tier: 1,
    cost: { red: 2, black: 2, pearl: 1 },
    jewelBonus: { green: 1 },
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { white: 2, black: 2, pearl: 1 },
    jewelBonus: { red: 1 },
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { white: 2, blue: 2, pearl: 1 },
    jewelBonus: { black: 1 },
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { green: 2, red: 2, pearl: 1 },
    jewelBonus: { blue: 1 },
    ability: ["take_another_turn"],
  },
  {
    tier: 1,
    cost: { blue: 2, green: 2, pearl: 1 },
    jewelBonus: { white: 1 },
    ability: ["take_another_turn"],
  },

  // crown
  {
    tier: 1,
    cost: { red: 3 },
    jewelBonus: { green: 1 },
    crownBonus: 1,
  },
  {
    tier: 1,
    cost: { black: 3 },
    jewelBonus: { red: 1 },
    crownBonus: 1,
  },
  {
    tier: 1,
    cost: { white: 3 },
    jewelBonus: { black: 1 },
    crownBonus: 1,
  },
  {
    tier: 1,
    cost: { green: 3 },
    jewelBonus: { blue: 1 },
    crownBonus: 1,
  },
  {
    tier: 1,
    cost: { blue: 3 },
    jewelBonus: { white: 1 },
    crownBonus: 1,
  },

  // colorless
  {
    tier: 1,
    cost: { blue: 2, red: 2, black: 1, pearl: 1 },
    prestige: 1,
    jewelBonus: { any: 1 },
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { white: 2, green: 2, black: 1, pearl: 1 },
    prestige: 1,
    jewelBonus: { any: 1 },
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { black: 4, pearl: 1 },
    prestige: 1,
    jewelBonus: { any: 1 },
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { white: 4, pearl: 1 },
    jewelBonus: { any: 1 },
    ability: ["copy_color"],
  },
  {
    tier: 1,
    cost: { red: 4, pearl: 1 },
    prestige: 3,
  },

  // tier 2
  // fancy crown
  {
    tier: 2,
    cost: { white: 2, blue: 2, black: 2, pearl: 1 },
    prestige: 2,
    crownBonus: 1,
    jewelBonus: { green: 1 },
  },
  {
    tier: 2,
    cost: { white: 2, blue: 2, green: 2, pearl: 1 },
    prestige: 2,
    crownBonus: 1,
    jewelBonus: { red: 1 },
  },
  {
    tier: 2,
    cost: { blue: 2, green: 2, red: 2, pearl: 1 },
    prestige: 2,
    crownBonus: 1,
    jewelBonus: { black: 1 },
  },
  {
    tier: 2,
    cost: { white: 2, red: 2, black: 2, pearl: 1 },
    prestige: 2,
    crownBonus: 1,
    jewelBonus: { blue: 1 },
  },
  {
    tier: 2,
    cost: { green: 2, red: 2, black: 2, pearl: 1 },
    prestige: 2,
    crownBonus: 1,
    jewelBonus: { white: 1 },
  },

  // "s" ring
  {
    tier: 2,
    cost: { blue: 2, green: 4, pearl: 1 },
    prestige: 2,
    jewelBonus: { green: 1 },
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { green: 2, red: 4, pearl: 1 },
    prestige: 2,
    jewelBonus: { red: 1 },
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { red: 2, black: 4, pearl: 1 },
    prestige: 2,
    jewelBonus: { black: 1 },
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { white: 2, blue: 4, pearl: 1 },
    prestige: 2,
    jewelBonus: { blue: 1 },
    ability: ["take_privilege_scroll"],
  },
  {
    tier: 2,
    cost: { white: 4, black: 2, pearl: 1 },
    prestige: 2,
    jewelBonus: { white: 1 },
    ability: ["take_privilege_scroll"],
  },

  // broken dome
  {
    tier: 2,
    cost: { white: 3, red: 4 },
    prestige: 1,
    jewelBonus: { green: 1 },
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { green: 4, black: 3 },
    prestige: 1,
    jewelBonus: { blue: 1 },
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { blue: 3, black: 4 },
    prestige: 1,
    jewelBonus: { red: 1 },
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { blue: 3, red: 4 },
    prestige: 1,
    jewelBonus: { white: 1 },
    ability: ["take_opp_token"],
  },
  {
    tier: 2,
    cost: { white: 4, green: 3 },
    prestige: 1,
    jewelBonus: { black: 1 },
    ability: ["take_opp_token"],
  },

  // two rings
  {
    tier: 2,
    cost: { green: 5, red: 2 },
    prestige: 1,
    jewelBonus: { blue: 2 },
  },
  {
    tier: 2,
    cost: { red: 5, black: 2 },
    prestige: 1,
    jewelBonus: { green: 2 },
  },
  {
    tier: 2,
    cost: { white: 5, blue: 2 },
    prestige: 1,
    jewelBonus: { black: 2 },
  },
  {
    tier: 2,
    cost: { white: 2, black: 5 },
    prestige: 1,
    jewelBonus: { red: 2 },
  },
  {
    tier: 2,
    cost: { blue: 5, green: 2 },
    prestige: 1,
    jewelBonus: { white: 2 },
  },

  // colorless
  {
    tier: 2,
    cost: { green: 6, pearl: 1 },
    prestige: 2,
    jewelBonus: { any: 1 },
    ability: ["copy_color"],
  },
  {
    tier: 2,
    cost: { green: 6, pearl: 1 },
    jewelBonus: { any: 1 },
    crownBonus: 2,
    ability: ["copy_color"],
  },
  {
    tier: 2,
    cost: { blue: 6, pearl: 1 },
    jewelBonus: { any: 1 },
    crownBonus: 2,
    ability: ["copy_color"],
  },
  {
    tier: 2,
    cost: { blue: 6, pearl: 1 },
    prestige: 5,
  },

  // tier 3
  // smile
  {
    tier: 3,
    cost: { white: 6, blue: 2, black: 2 },
    prestige: 4,
    jewelBonus: { white: 1 },
  },
  {
    tier: 3,
    cost: { green: 2, red: 6, black: 2 },
    prestige: 4,
    jewelBonus: { red: 1 },
  },
  {
    tier: 3,
    cost: { white: 2, red: 2, black: 6 },
    prestige: 4,
    jewelBonus: { black: 1 },
  },
  {
    tier: 3,
    cost: { white: 2, blue: 6, green: 2 },
    prestige: 4,
    jewelBonus: { blue: 1 },
  },
  {
    tier: 3,
    cost: { blue: 2, green: 6, red: 2 },
    prestige: 4,
    jewelBonus: { green: 1 },
  },

  // crown
  {
    tier: 3,
    cost: { blue: 3, red: 5, black: 3, pearl: 1 },
    prestige: 3,
    crownBonus: 2,
    jewelBonus: { white: 1 },
  },
  {
    tier: 3,
    cost: { blue: 5, green: 3, black: 3, pearl: 1 },
    prestige: 3,
    crownBonus: 2,
    jewelBonus: { red: 1 },
  },
  {
    tier: 3,
    cost: { white: 3, green: 3, black: 5, pearl: 1 },
    prestige: 3,
    crownBonus: 2,
    jewelBonus: { blue: 1 },
  },
  {
    tier: 3,
    cost: { white: 5, blue: 3, red: 3, pearl: 1 },
    prestige: 3,
    crownBonus: 2,
    jewelBonus: { green: 1 },
  },
  {
    tier: 3,
    cost: { white: 3, green: 5, red: 3, pearl: 1 },
    prestige: 3,
    crownBonus: 2,
    jewelBonus: { black: 1 },
  },

  // colorless
  {
    tier: 3,
    cost: { white: 8 },
    prestige: 6,
  },
  {
    tier: 3,
    cost: { black: 8 },
    crownBonus: 3,
    jewelBonus: { any: 1 },
    ability: ["copy_color"],
  },
  {
    tier: 3,
    cost: { red: 8 },
    prestige: 3,
    jewelBonus: { any: 1 },
    ability: ["copy_color", "take_another_turn"],
  },
];
