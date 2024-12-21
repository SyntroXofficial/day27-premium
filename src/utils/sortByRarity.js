const RARITY_ORDER = {
  mythic: 0,
  legendary: 1,
  epic: 2,
  rare: 3,
  uncommon: 4,
  common: 5
};

export const sortByRarity = (items) => {
  return [...items].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
};

export const groupByRarity = (items) => {
  return items.reduce((groups, item) => {
    const rarity = item.rarity;
    if (!groups[rarity]) {
      groups[rarity] = [];
    }
    groups[rarity].push(item);
    return groups;
  }, {});
};