import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { steamAccounts } from '../../data/steamAccounts';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';

export default function LatestReleases() {
  const latestAccounts = steamAccounts.slice(0, 6);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-8">Latest Releases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestAccounts.map((account, index) => {
          const rarityConfig = RARITY_CONFIGS[account.rarity];
          const glowStyle = RARITY_GLOW[account.rarity];
          
          return (
            <motion.div
              key={account.game}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden group"
              style={{
                boxShadow: glowStyle.boxShadow,
                animation: `${glowStyle.animation} 3s ease-in-out infinite`
              }}
            >
              <div className="relative h-64">
                <img
                  src={account.imageUrl}
                  alt={account.game}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{account.game}</h3>
                    <span className={`px-3 py-1 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
                      {rarityConfig.label}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {account.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${rarityConfig.bgColor}`}></span>
                        <span className="text-sm text-gray-300">{feature.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/library/${account.game.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`inline-block w-full px-4 py-2 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} text-center transition-all duration-300 hover:scale-105`}
                    style={{
                      boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
                    }}
                  >
                    View in Library
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}