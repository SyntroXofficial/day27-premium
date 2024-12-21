import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';

export default function GameCard({ game, index }) {
  const rarityConfig = RARITY_CONFIGS[game.rarity];
  const glowStyle = RARITY_GLOW[game.rarity];
  
  return (
    <Link to={`/library/${game.game.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative rounded-xl overflow-hidden h-[300px] group hover:scale-[1.02] transition-all duration-300"
        style={{
          boxShadow: glowStyle.boxShadow,
          animation: `${glowStyle.animation} 3s ease-in-out infinite`
        }}
      >
        <img
          src={game.imageUrl}
          alt={game.game}
          className="w-full h-full object-cover"
        />
        
        {/* Rarity Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-md bg-black/80 text-sm font-bold uppercase tracking-wider">
            {game.rarity}
          </span>
        </div>

        {/* Genre Badge */}
        <div className="absolute bottom-[60px] left-3">
          <span className="px-3 py-1 rounded-md bg-black/80 text-sm text-white/90">
            {game.features?.find(f => f.label === 'Genre')?.value || 'Action'}
          </span>
        </div>

        {/* Game Info */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-lg font-bold text-white mb-1">{game.game}</h3>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>Steam</span>
            <span>{game.releaseYear || '2024'}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
