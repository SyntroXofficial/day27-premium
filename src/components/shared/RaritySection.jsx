import React from 'react';
import { motion } from 'framer-motion';
import RarityCard from './RarityCard';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';

export default function RaritySection({ title, items, linkPrefix }) {
  const rarityConfig = RARITY_CONFIGS[items[0]?.rarity];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h2 className={`text-2xl font-bold ${rarityConfig.textColor} mb-6`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <RarityCard
            key={item.id || item.game}
            item={item}
            index={index}
            linkPrefix={linkPrefix}
          />
        ))}
      </div>
    </motion.div>
  );
}