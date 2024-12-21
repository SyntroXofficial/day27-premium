import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { steamAccounts } from '../data/steamAccounts';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import { RARITY_GLOW } from '../utils/glowStyles';
import { sortByRarity } from '../utils/sortByRarity';

export default function Home() {
  const featuredGame = sortByRarity(steamAccounts)[0];
  const latestReleases = sortByRarity(steamAccounts).slice(0, 6);

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-screen">
        <img
          src={featuredGame.imageUrl}
          alt={featuredGame.game}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-6xl font-bold text-white mb-4">{featuredGame.game}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-lg ${RARITY_CONFIGS[featuredGame.rarity].bgColor} ${RARITY_CONFIGS[featuredGame.rarity].textColor} border ${RARITY_CONFIGS[featuredGame.rarity].borderColor}`}>
                {RARITY_CONFIGS[featuredGame.rarity].label}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {featuredGame.features.map((feature, index) => (
                <span key={index} className="px-4 py-2 bg-black/50 rounded-lg text-gray-300 border border-white/10">
                  {feature.value}
                </span>
              ))}
            </div>
            <Link
              to={`/library/${featuredGame.game.toLowerCase().replace(/\s+/g, '-')}`}
              className={`inline-flex items-center px-8 py-3 rounded-lg ${RARITY_CONFIGS[featuredGame.rarity].bgColor} ${RARITY_CONFIGS[featuredGame.rarity].textColor} transition-all duration-300 hover:scale-105`}
            >
              View in Library
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Latest Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestReleases.map((game, index) => {
            const rarityConfig = RARITY_CONFIGS[game.rarity];
            const glowStyle = RARITY_GLOW[game.rarity];

            return (
              <Link
                key={game.game}
                to={`/library/${game.game.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden group h-[400px]"
                  style={{
                    boxShadow: glowStyle.boxShadow,
                    animation: `${glowStyle.animation} 3s ease-in-out infinite`
                  }}
                >
                  <img
                    src={game.imageUrl}
                    alt={game.game}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-lg text-sm ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
                        {rarityConfig.label}
                      </span>
                      {game.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-black/50 rounded-lg text-sm text-gray-300">
                          {feature.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}