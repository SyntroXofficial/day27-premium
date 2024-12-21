import React from 'react';
import { motion } from 'framer-motion';
import { RARITY_CONFIGS } from '../utils/rarityConfig';

export default function RarityFilter({ selectedRarity, onRarityChange }) {
  const rarities = ['all', 'mythic', 'legendary', 'epic', 'rare', 'uncommon', 'common'];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {rarities.map(rarity => {
        const config = RARITY_CONFIGS[rarity] || {
          bgColor: 'bg-gray-500/20',
          textColor: 'text-white',
          label: 'ALL'
        };

        return (
          <motion.button
            key={rarity}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRarityChange(rarity)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedRarity === rarity
                ? `${config.bgColor} ${config.textColor}`
                : 'bg-black/50 text-gray-300 hover:bg-black/70'
            }`}
          >
            {config.label}
          </motion.button>
        );
      })}
    </div>
  );
}