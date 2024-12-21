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

  const rarityTextColors = {
    common: 'text-gray-400',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-yellow-400',
    mythic: 'text-red-400'
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
              <div className="absolute inset-0">
                <img
                  src={featuredGames[currentSlide]?.imageUrl}
                  alt={featuredGames[currentSlide]?.game}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {featuredGames[currentSlide]?.game}
                </h1>
                <p className="text-base max-w-2xl mb-4 text-gray-200">
                  {featuredGames[currentSlide]?.description}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4 max-w-2xl">
                  {[
                    { label: 'Genre', value: featuredGames[currentSlide]?.features?.find(f => f.label === 'Genre')?.value || 'N/A' },
                    { label: 'Platform', value: featuredGames[currentSlide]?.features?.find(f => f.label === 'Platform')?.value || 'N/A' },
                    { 
                      label: 'Rarity', 
                      value: featuredGames[currentSlide]?.rarity.toUpperCase(),
                      className: `font-medium ${rarityTextColors[featuredGames[currentSlide]?.rarity.toLowerCase()]}`
                    }
                  ].map((feature, index) => (
                    <div key={index} className="bg-black/30 backdrop-blur-sm px-2 py-1.5 rounded-lg">
                      <span className="text-gray-400 text-xs">{feature.label}</span>
                      <div className={`text-sm ${feature.className || 'text-white'}`}>{feature.value}</div>
                    </div>
                  ))}
                </div>
              </div>
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
              className={`bg-[#0a0a0a] rounded-lg overflow-hidden border ${rarityColors[game.rarity.toLowerCase()]} ${rarityGlowColors[game.rarity.toLowerCase()]} cursor-pointer`}
              onClick={() => setSelectedGame(game)}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Details Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="fixed inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedGame(null);
              setShowPinPrompt(false);
              setPinInput('');
              setPinError(false);
            }}
          >
            <div className="min-h-screen px-4 text-center flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-black border border-gray-800 rounded-lg p-6 relative max-w-2xl w-full mx-auto"
                onClick={(e) => e.stopPropagation()}
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
                      <span className={`px-3 py-1 rounded-lg text-sm ${rarityBgColors[selectedGame.rarity.toLowerCase()]} ${rarityTextColors[selectedGame.rarity.toLowerCase()]} border ${rarityColors[selectedGame.rarity.toLowerCase()]} mr-2`}>
                        {selectedGame.rarity.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-black/50 rounded-lg text-sm text-gray-300 border border-gray-800 mr-2">
                        GLOBAL
                      </span>
                      <span className="px-3 py-1 bg-black/50 rounded-lg text-sm text-gray-300 border border-gray-800">
                        STEAM
                      </span>
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
            className="fixed inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPinPrompt(false)}
          >
            <div className="w-full max-w-md px-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-black border border-gray-800 rounded-lg p-6 relative w-full mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">Enter Pin</h3>
                <div className="flex flex-col gap-4">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    placeholder="Enter pin code"
                  />
                  {pinError && (
                    <p className="text-red-500 text-sm">Incorrect pin. Please try again.</p>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedGame(null);
                        setShowPinPrompt(false);
                        setPinInput('');
                        setPinError(false);
                      }}
                      className="px-4 py-2 rounded bg-black border border-gray-800 text-white hover:bg-gray-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePinSubmit}
                      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
