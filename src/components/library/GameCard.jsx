import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RARITY_GLOW = {
  mythic: {
    boxShadow: '0 0 20px rgba(255, 0, 0, 0.5), inset 0 0 20px rgba(255, 0, 0, 0.5)',
    animation: 'pulse-mythic'
  },
  legendary: {
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 215, 0, 0.5)',
    animation: 'pulse-legendary'
  },
  epic: {
    boxShadow: '0 0 20px rgba(163, 53, 238, 0.5), inset 0 0 20px rgba(163, 53, 238, 0.5)',
    animation: 'pulse-epic'
  },
  rare: {
    boxShadow: '0 0 20px rgba(0, 112, 221, 0.5), inset 0 0 20px rgba(0, 112, 221, 0.5)',
    animation: 'pulse-rare'
  },
  uncommon: {
    boxShadow: '0 0 20px rgba(30, 255, 0, 0.5), inset 0 0 20px rgba(30, 255, 0, 0.5)',
    animation: 'pulse-uncommon'
  },
  common: {
    boxShadow: '0 0 20px rgba(128, 128, 128, 0.5), inset 0 0 20px rgba(128, 128, 128, 0.5)',
    animation: 'pulse-common'
  }
};

const RARITY_COLORS = {
  mythic: 'text-red-500',
  legendary: 'text-yellow-400',
  epic: 'text-purple-500',
  rare: 'text-blue-500',
  uncommon: 'text-green-500',
  common: 'text-gray-400'
};

export default function GameCard({ game, index }) {
  const glowStyle = RARITY_GLOW[game.rarity.toLowerCase()];
  const textColor = RARITY_COLORS[game.rarity.toLowerCase()];
  
  return (
    <Link to={`/library/${game.game.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative rounded-xl overflow-hidden aspect-[3/4] group hover:scale-[1.02] transition-all duration-300"
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
          <span className={`px-3 py-1 rounded-md bg-black/80 ${textColor} text-sm font-bold uppercase tracking-wider`}>
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
