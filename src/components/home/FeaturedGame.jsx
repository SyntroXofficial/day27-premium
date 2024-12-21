import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { steamAccounts } from '../../data/steamAccounts';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';

export default function FeaturedGame() {
  const featuredAccount = steamAccounts.find(account => 
    account.rarity === 'mythic' || account.rarity === 'legendary'
  );

  const rarityConfig = RARITY_CONFIGS[featuredAccount.rarity];
  const glowStyle = RARITY_GLOW[featuredAccount.rarity];

  return (
    <div className="relative h-[600px] rounded-xl overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          boxShadow: glowStyle.boxShadow,
          animation: `${glowStyle.animation} 3s ease-in-out infinite`
        }}
      >
        <img
          src={featuredAccount.imageUrl}
          alt={featuredAccount.game}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-6xl font-bold text-white mb-4">{featuredAccount.game}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-4 py-2 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
              {rarityConfig.label}
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">{featuredAccount.description}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            {featuredAccount.features.map((feature, index) => (
              <span key={index} className="px-4 py-2 bg-black/50 rounded-lg text-gray-300 border border-white/10">
                {feature.value}
              </span>
            ))}
          </div>
          <Link
            to={`/library/${featuredAccount.game.toLowerCase().replace(/\s+/g, '-')}`}
            className={`inline-flex items-center px-8 py-3 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} transition-all duration-300 hover:scale-105`}
            style={{
              boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
            }}
          >
            View in Library
          </Link>
        </motion.div>
      </div>
    </div>
  );
}