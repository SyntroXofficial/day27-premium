import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Mythic', value: 'mythic' },
  { label: 'Legendary', value: 'legendary' },
  { label: 'Epic', value: 'epic' },
  { label: 'Rare', value: 'rare' },
  { label: 'Uncommon', value: 'uncommon' }
];

export default function SteamCategories({ selectedCategory, onCategoryChange, counts }) {
  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedCategory === category.value
              ? 'bg-red-600 text-white'
              : 'bg-black/50 text-gray-300 hover:bg-black/70'
          }`}
        >
          {category.label}
          {counts[category.value] > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-black/30 rounded-full text-sm">
              {counts[category.value]}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}