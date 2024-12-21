import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';

const METHOD_IMAGES = {
  'xbox-gamepass': 'https://www.stuff.tv/wp-content/uploads/sites/2/2023/04/Game-Pass.png',
  'steam-family': 'https://i0.wp.com/www.consolecreatures.com/wp-content/uploads/2024/09/Steam-Families.webp',
  'epic-games': 'https://preview.redd.it/mystery-game-gift-wrapping-v0-7ur8bkyswg7a1.jpg?width=1080&crop=smart&auto=webp&s=25a5e458ff77a7671808f7c0409bded466ad5a8d'
};

export default function MethodCard({ method, index }) {
  const rarityConfig = RARITY_CONFIGS[method.rarity];
  const glowStyle = RARITY_GLOW[method.rarity];
  
  return (
    <Link to={`/methods/${method.id}`}>
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
          src={METHOD_IMAGES[method.id]}
          alt={method.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <span className={`inline-block px-4 py-2 rounded-lg text-sm ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor} w-full text-center font-bold text-lg`}>
              {rarityConfig.label}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}