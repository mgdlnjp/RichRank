// Rank ladder: thresholds are annual gross income, in the chosen currency.
// Every tier teases kindly; nobody gets a mean card.

export const TIERS = [
  {
    id: "dreamer",
    min: 0,
    name: "Le Rêveur",
    rarity: "Commune",
    foil: ["#D9D4F2", "#A69FD1"],
    quip: "Tout grand rêve commence petit.",
  },
  {
    id: "hustler",
    min: 15000,
    name: "Le Débrouillard",
    rarity: "Commune",
    foil: ["#D9D4F2", "#A69FD1"],
    quip: "Tu fais des miracles avec un budget serré.",
  },
  {
    id: "comfy",
    min: 30000,
    name: "Le Confortable",
    rarity: "Peu commune",
    foil: ["#7CF0BF", "#1FB57A"],
    quip: "Le resto du samedi soir est validé.",
  },
  {
    id: "bigfish",
    min: 60000,
    name: "Le Gros Poisson",
    rarity: "Rare",
    foil: ["#7DB6FF", "#2B6BFF"],
    quip: "Au resto, tout le monde regarde vers toi au moment de l'addition.",
  },
  {
    id: "shark",
    min: 120000,
    name: "Le Requin",
    rarity: "Épique",
    foil: ["#B9A2FF", "#6C3BFF"],
    quip: "Tu dis « investir » au lieu de « dépenser ».",
  },
  {
    id: "almost",
    min: 500000,
    name: "Le Presque Millionnaire",
    rarity: "Légendaire",
    foil: ["#FFE989", "#FFB800"],
    quip: "Le million est en vue. Garde le cap.",
  },
  {
    id: "millionaire",
    min: 1e6,
    name: "Le Millionnaire Express",
    rarity: "Mythique",
    foil: ["#FF9CC8", "#FF3D8B"],
    quip: "Un million par an. Tranquille.",
  },
  {
    id: "billionaire",
    min: 1e9,
    name: "Le Milliardaire",
    rarity: "Unique",
    foil: ["#FF5FA2", "#6C3BFF", "#FFD23F", "#3DDC97"],
    quip: "Tu pourrais racheter l'App Store. Deux fois.",
  },
];

// Iridescent foil: tier hue, white sheen, the neighbouring tier's hue, back to the tier hue.
export const foilStops = (index) => {
  const tier = TIERS[index];
  if (tier.foil.length > 2) return tier.foil;
  const neighbour = (TIERS[index + 1] || TIERS[index - 1]).foil[0];
  return [tier.foil[1], tier.foil[0], "#FFFFFF", neighbour, tier.foil[0], tier.foil[1]];
};

export const tierIndexFor = (annual) => {
  let index = 0;
  TIERS.forEach((tier, i) => {
    if (annual >= tier.min) index = i;
  });
  return index;
};

export const FREQUENCIES = [
  { value: "daily", label: "Jour", factor: 260, hint: "Par jour, sur 260 jours travaillés par an" },
  { value: "weekly", label: "Semaine", factor: 52, hint: "Par semaine, sur 52 semaines par an" },
  { value: "monthly", label: "Mois", factor: 12, hint: "Par mois, sur 12 mois par an" },
];

export const CURRENCIES = [
  { value: "EUR", label: "€", symbol: "€" },
  { value: "USD", label: "$", symbol: "$" },
];
