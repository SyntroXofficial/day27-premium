import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { steamAccounts } from '../data/steamAccounts';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import { RARITY_GLOW } from '../utils/glowStyles';
import { sortByRarity } from '../utils/sortByRarity';
import SearchBar from '../components/SearchBar';
import RarityFilter from '../components/RarityFilter';

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');

  const filteredGames = steamAccounts.filter(game => {
    const matchesSearch = game.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || game.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const sortedGames = sortByRarity(filteredGames);

  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-4">Game Library</h1>
          <p className="text-gray-400">Browse our collection of premium gaming accounts</p>
        </motion.div>

        <SearchBar onSearch={setSearchTerm} />
        <RarityFilter selectedRarity={selectedRarity} onRarityChange={setSelectedRarity} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedGames.map((game, index) => {
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{game.game}</h3>
                      <span className={`px-3 py-1 rounded-lg text-sm ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
                        {rarityConfig.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {game.features.map((feature, idx) => (
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