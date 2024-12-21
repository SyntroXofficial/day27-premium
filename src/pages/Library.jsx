import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { steamAccounts } from '../data/steamAccounts';

const gameCategories = [
  'All',
  'Action',
  'Adventure',
  'RPG',
  'Strategy',
  'Simulation',
  'Sports',
  'Racing',
  'FPS',
  'MMO'
];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Get featured games (mythic and legendary rarity)
  const featuredGames = steamAccounts.filter(game => 
    game.rarity === 'mythic' || game.rarity === 'legendary'
  );

  // Auto-change slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const filteredGames = steamAccounts.filter(game => {
    const matchesSearch = game.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                          (game.features && game.features.some(f => 
                            f.label === 'Genre' && f.value.toLowerCase().includes(selectedCategory.toLowerCase())
                          ));
    return matchesSearch && matchesCategory;
  });

  // Handle pin submission
  const handlePinSubmit = () => {
    const rarityPins = {
      mythic: '5026',
      legendary: '2716',
      epic: '4617',
      rare: '8293',
      uncommon: '2222',
      common: '1111'
    };

    const rarity = selectedGame.rarity.toLowerCase() || 'common';
    const correctPin = rarityPins[rarity];

    if (pinInput === correctPin) {
      setPinError(false);
      setShowPinPrompt(false);
      setPinInput('');
      // Show account credentials
      alert(`Username: ${selectedGame.username}\nPassword: ${selectedGame.password}`);
    } else {
      setPinError(true);
    }
  };

  const rarityColors = {
    common: 'border-gray-400 animate-pulse-slow shadow-[0_0_20px_rgba(156,163,175,0.3)]',
    uncommon: 'border-green-400 animate-pulse-slow shadow-[0_0_20px_rgba(74,222,128,0.3)]',
    rare: 'border-blue-400 animate-pulse-slow shadow-[0_0_20px_rgba(96,165,250,0.3)]',
    epic: 'border-purple-400 animate-pulse-slow shadow-[0_0_20px_rgba(192,132,252,0.3)]',
    legendary: 'border-yellow-400 animate-pulse-slow shadow-[0_0_20px_rgba(250,204,21,0.3)]',
    mythic: 'border-red-400 animate-pulse-slow shadow-[0_0_20px_rgba(248,113,113,0.3)]'
  };

  const rarityBgColors = {
    common: 'bg-[#000000] text-gray-300',
    uncommon: 'bg-[#000000] text-green-400',
    rare: 'bg-[#000000] text-blue-400',
    epic: 'bg-[#000000] text-purple-400',
    legendary: 'bg-[#000000] text-yellow-400',
    mythic: 'bg-[#000000] text-red-400'
  };

  const rarityGlowColors = {
    common: 'hover:shadow-[0_0_15px_rgba(156,163,175,0.5)] transition-shadow duration-300',
    uncommon: 'hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-shadow duration-300',
    rare: 'hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-shadow duration-300',
    epic: 'hover:shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-shadow duration-300',
    legendary: 'hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-shadow duration-300',
    mythic: 'hover:shadow-[0_0_15px_rgba(248,113,113,0.5)] transition-shadow duration-300'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Featured Hero Section */}
      <div className="relative h-[600px] w-full">
        {/* Featured Game Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black">
                <img
                  src={featuredGames[currentSlide]?.imageUrl}
                  alt={featuredGames[currentSlide]?.game}
                  className="w-full h-full object-cover"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative h-full">
          <div className="absolute inset-0 h-full flex items-center">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-[500px] pl-4"
            >
              <div className={`inline-block px-4 py-1.5 rounded-[4px] text-sm font-semibold uppercase tracking-wide ${
                rarityBgColors[featuredGames[currentSlide]?.rarity.toLowerCase()]
              }`} style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                {featuredGames[currentSlide]?.rarity}
              </div>
              <h1 className="text-4xl font-bold mb-3">
                {featuredGames[currentSlide]?.game}
              </h1>
              <p className="text-lg text-gray-300 mb-4 line-clamp-2">
                {featuredGames[currentSlide]?.features?.find(f => f.label === 'Description')?.value || 'No description available'}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {featuredGames[currentSlide]?.features?.slice(0, 4).map((feature, index) => (
                  <div key={index} className="bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <span className="text-base">{feature.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedGame(featuredGames[currentSlide])}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-base font-medium"
              >
                View Details
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {gameCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-[#1A1A1A] text-gray-300 hover:bg-[#252525]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className={`bg-[#0a0a0a] rounded-lg overflow-hidden border ${rarityColors[game.rarity.toLowerCase()]} ${rarityGlowColors[game.rarity.toLowerCase()]}`}
            >
              <div className="relative h-48">
                <img
                  src={game.imageUrl}
                  alt={game.game}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold uppercase ${rarityBgColors[game.rarity.toLowerCase()]}`}>
                  {game.rarity.toUpperCase()}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{game.game}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>
                <button
                  onClick={() => {
                    setSelectedGame(game);
                    setShowPinPrompt(true);
                  }}
                  className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Unlock Game Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Details Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={() => setSelectedGame(null)}
          >
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden"
              >
                {/* Modal Image */}
                <div className="relative h-[400px]">
                  <img
                    src={selectedGame.imageUrl}
                    alt={selectedGame.game}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                        rarityBgColors[selectedGame.rarity.toLowerCase()]
                      }`}>
                        {selectedGame.rarity}
                      </div>
                      {selectedGame.features?.slice(0, 2).map((feature, index) => (
                        <div key={index} className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-black/50">
                          {feature.value}
                        </div>
                      ))}
                    </div>
                    <h1 className="text-4xl font-bold mb-2">{selectedGame.game}</h1>
                    <p className="text-lg text-gray-300">
                      {selectedGame.features?.find(f => f.label === 'Description')?.value || 'No description available'}
                    </p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedGame.features?.map((feature, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-lg">
                        <h4 className="text-sm text-gray-400 mb-1">{feature.label}</h4>
                        <p className="text-lg">{feature.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setSelectedGame(null);
                        setShowPinPrompt(false);
                        setPinInput('');
                        setPinError(false);
                      }}
                      className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setShowPinPrompt(true)}
                      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Unlock Game Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pin Prompt Modal */}
      <AnimatePresence>
        {showPinPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-[100]"
            onClick={() => setShowPinPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Enter Pin for {selectedGame.rarity}</h3>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePinSubmit();
                  }
                }}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter pin..."
                autoFocus
              />
              {pinError && (
                <p className="text-red-500 mb-4">Incorrect pin. Please try again.</p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowPinPrompt(false);
                    setPinInput('');
                    setPinError(false);
                  }}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePinSubmit}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
