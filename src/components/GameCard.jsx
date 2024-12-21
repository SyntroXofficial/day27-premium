import React from 'react';
import { motion } from 'framer-motion';
import { GlobeAltIcon, DevicePhoneMobileIcon, StarIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import { RARITY_GLOW } from '../utils/glowStyles';

export default function GameCard({ game }) {
  const rarityConfig = RARITY_CONFIGS[game.rarity];
  const glowStyle = RARITY_GLOW[game.rarity];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative group overflow-hidden rounded-xl rarity-glow-${game.rarity}`}
      style={{
        boxShadow: glowStyle.boxShadow
      }}
    >
      <img
        src={game.imageUrl}
        alt={game.title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="game-info-hover">
        <h3>{game.title}</h3>
        <div className="game-details">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor} mb-3`}>
            {rarityConfig.label}
          </span>
          
          <p>
            <GlobeAltIcon className="h-5 w-5" />
            Region: {game.region || 'Global'}
          </p>
          
          <p>
            <DevicePhoneMobileIcon className="h-5 w-5" />
            Platform: {game.platform || 'Steam'}
          </p>
          
          <p>
            <StarIcon className="h-5 w-5" />
            Rating: {game.rating || 'N/A'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}