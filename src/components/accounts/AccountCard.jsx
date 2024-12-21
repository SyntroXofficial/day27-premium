import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';

export default function AccountCard({ account, index }) {
  const rarityConfig = RARITY_CONFIGS[account.rarity];
  const glowStyle = RARITY_GLOW[account.rarity];
  
  return (
    <Link to={`/accounts/${account.id}`}>
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
          src={account.imageUrl}
          alt={account.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <span className={`inline-block px-4 py-2 rounded-lg text-sm ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor} w-full text-center font-bold`}>
              {rarityConfig.label}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}