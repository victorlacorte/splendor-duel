## On the viability of tier 1 jewel cards

How much should pursuiting tier 1 jewel cards be prioritized? How many should be purchased? It seems it depends on the most available tier 2 ones and how many gems are required to purchase them.

It seems that cards with individual gem requirements > 2 do not seem realistic for early game purchases, so how many of them are available from the pool? Let's check:

```js
// 5 of 24 tier 2 cards (21%) have individual gem costs <= 2
const result = [
  {
    tier: 2,
    cost: { white: 2, blue: 2, black: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    jewelBonus: { green: 1 },
  },
  {
    tier: 2,
    cost: { white: 2, blue: 2, green: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    jewelBonus: { red: 1 },
  },
  {
    tier: 2,
    cost: { blue: 2, green: 2, red: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    jewelBonus: { black: 1 },
  },
  {
    tier: 2,
    cost: { white: 2, red: 2, black: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    jewelBonus: { blue: 1 },
  },
  {
    tier: 2,
    cost: { green: 2, red: 2, black: 2, pearl: 1 },
    prestigePoints: 2,
    crownPoints: 1,
    jewelBonus: { white: 1 },
  },
];
```

These tier 2 cards should be prioritized as they cost a total of 7 gems and offer both prestige and crown points. Also, notice the next lower jewel cost is <= 4, not 3:

```js
// 10 of 24 tier 2 cards (42%) have individual gem costs <= 4
const result = [
  {
    tier: 2,
    cost: { blue: 2, green: 4, pearl: 1 },
    prestigePoints: 2,
    jewelBonus: { green: 1 },
    ability: ["take_privilege_scroll"],
    id: 35,
  },
  {
    tier: 2,
    cost: { green: 2, red: 4, pearl: 1 },
    prestigePoints: 2,
    jewelBonus: { red: 1 },
    ability: ["take_privilege_scroll"],
    id: 36,
  },
  {
    tier: 2,
    cost: { red: 2, black: 4, pearl: 1 },
    prestigePoints: 2,
    jewelBonus: { black: 1 },
    ability: ["take_privilege_scroll"],
    id: 37,
  },
  {
    tier: 2,
    cost: { white: 2, blue: 4, pearl: 1 },
    prestigePoints: 2,
    jewelBonus: { blue: 1 },
    ability: ["take_privilege_scroll"],
    id: 38,
  },
  {
    tier: 2,
    cost: { white: 4, black: 2, pearl: 1 },
    prestigePoints: 2,
    jewelBonus: { white: 1 },
    ability: ["take_privilege_scroll"],
    id: 39,
  },
  {
    tier: 2,
    cost: { white: 3, red: 4 },
    prestigePoints: 1,
    jewelBonus: { green: 1 },
    ability: ["take_opp_token"],
    id: 40,
  },
  {
    tier: 2,
    cost: { green: 4, black: 3 },
    prestigePoints: 1,
    jewelBonus: { blue: 1 },
    ability: ["take_opp_token"],
    id: 41,
  },
  {
    tier: 2,
    cost: { blue: 3, black: 4 },
    prestigePoints: 1,
    jewelBonus: { red: 1 },
    ability: ["take_opp_token"],
    id: 42,
  },
  {
    tier: 2,
    cost: { blue: 3, red: 4 },
    prestigePoints: 1,
    jewelBonus: { white: 1 },
    ability: ["take_opp_token"],
    id: 43,
  },
  {
    tier: 2,
    cost: { white: 4, green: 3 },
    prestigePoints: 1,
    jewelBonus: { black: 1 },
    ability: ["take_opp_token"],
    id: 44,
  },
];
```

```js
// 5 of 13 tier 3 cards (38%) have individual gem costs <= to 5
const result = [
  {
    tier: 3,
    cost: { blue: 3, red: 5, black: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    jewelBonus: { white: 1 },
  },
  {
    tier: 3,
    cost: { blue: 5, green: 3, black: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    jewelBonus: { red: 1 },
  },
  {
    tier: 3,
    cost: { white: 3, green: 3, black: 5, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    jewelBonus: { blue: 1 },
  },
  {
    tier: 3,
    cost: { white: 5, blue: 3, red: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    jewelBonus: { green: 1 },
  },
  {
    tier: 3,
    cost: { white: 3, green: 5, red: 3, pearl: 1 },
    prestigePoints: 3,
    crownPoints: 2,
    jewelBonus: { black: 1 },
  },
];
```
