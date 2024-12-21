import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { accounts } from '../data/accounts';
import { services } from '../data/services';

// Sort accounts by rarity
const rarityOrder = {
  'mythic': 0,
  'legendary': 1,
  'epic': 2,
  'rare': 3,
  'uncommon': 4,
  'common': 5
};

const sortedAccounts = [...accounts].sort((a, b) => 
  rarityOrder[a.rarity.toLowerCase()] - rarityOrder[b.rarity.toLowerCase()]
);

// Get featured accounts (mythic and legendary rarity)
const featuredAccounts = sortedAccounts.filter(account => 
  account.rarity === 'mythic' || account.rarity === 'legendary'
);

export default function Accounts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Auto-change slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredAccounts.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(accounts.map(account => account.type))].sort();

  // Filter accounts based on search and category
  const filteredAccounts = sortedAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         account.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || account.type === selectedCategory;
    const service = services.find(s => s.items.some(i => i.name === account.name));
    const item = service?.items.find(i => i.name === account.name);
    account.inStock = item?.status === 'inStock';
    return matchesSearch && matchesCategory;
  });

  // Handle pin submission
  const handlePinSubmit = () => {
    if (pinInput === selectedAccount.pin) {
      setPinError(false);
      setShowPinPrompt(false);
      setPinInput('');
      // Open the MEGA link in a new tab
      if (selectedAccount?.link) {
        window.open(selectedAccount.link, '_blank', 'noopener,noreferrer');
      }
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

  const rarityGlowColors = {
    common: 'hover:shadow-[0_0_15px_rgba(156,163,175,0.5)] transition-shadow duration-300',
    uncommon: 'hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-shadow duration-300',
    rare: 'hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-shadow duration-300',
    epic: 'hover:shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-shadow duration-300',
    legendary: 'hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-shadow duration-300',
    mythic: 'hover:shadow-[0_0_15px_rgba(248,113,113,0.5)] transition-shadow duration-300'
  };

  // Update the rarity colors with new dark theme styling
  const rarityBgColors = {
    common: 'bg-[#000000] text-gray-300',
    uncommon: 'bg-[#000000] text-green-400',
    rare: 'bg-[#000000] text-blue-400',
    epic: 'bg-[#000000] text-purple-400',
    legendary: 'bg-[#000000] text-yellow-400',
    mythic: 'bg-[#000000] text-red-400'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Featured Hero Section */}
      <div className="relative h-[600px] w-full">
        {/* Featured Account Image */}
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
                  src={featuredAccounts[currentSlide]?.imageUrl}
                  alt={featuredAccounts[currentSlide]?.name}
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
                rarityBgColors[featuredAccounts[currentSlide]?.rarity.toLowerCase()]
              }`} style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                {featuredAccounts[currentSlide]?.rarity}
              </div>
              <h1 className="text-4xl font-bold mb-3">
                {featuredAccounts[currentSlide]?.name}
              </h1>
              <p className="text-lg text-gray-300 mb-4 line-clamp-2">
                {featuredAccounts[currentSlide]?.description}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Type', value: featuredAccounts[currentSlide]?.type },
                  { label: 'Status', value: featuredAccounts[currentSlide]?.inStock ? 'In Stock' : 'Out of Stock' },
                  { label: 'Region', value: featuredAccounts[currentSlide]?.region || 'Global' }
                ].map((feature, index) => (
                  <div key={index} className="bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <span className="text-base">{feature.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedAccount(featuredAccounts[currentSlide])}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-base font-medium"
              >
                View Details
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search and Categories */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 min-w-0">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAccounts.map((account) => (
            <div
              key={account.name}
              className={`bg-[#0a0a0a] rounded-lg overflow-hidden border ${rarityColors[account.rarity.toLowerCase()]} ${rarityGlowColors[account.rarity.toLowerCase()]}`}
              onClick={() => {
                setSelectedAccount(account);
                setShowPinPrompt(true);
              }}
            >
              <div className="relative h-48">
                <img
                  src={account.imageUrl}
                  alt={account.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${rarityBgColors[account.rarity.toLowerCase()]}`}>
                  {account.rarity}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{account.name}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{account.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{account.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className={account.inStock ? 'text-green-400' : 'text-red-400'}>
                      {account.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  {account.features && account.features.map((feature, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">{feature.label}:</span>
                      <span className="text-white">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Details Modal */}
      <AnimatePresence>
        {selectedAccount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={() => setSelectedAccount(null)}
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
                    src={selectedAccount.imageUrl}
                    alt={selectedAccount.name}
                    className="w-full h-full object-cover object-center"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-2">{selectedAccount.name}</h2>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm backdrop-blur-sm">
                      {selectedAccount.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm ${
                      rarityBgColors[selectedAccount.rarity.toLowerCase()]
                    }`}>
                      {selectedAccount.rarity}
                    </span>
                    {selectedAccount.inStock && (
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm backdrop-blur-sm">
                        In Stock ({selectedAccount.stockCount})
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-6">{selectedAccount.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setSelectedAccount(null);
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
                      Unlock Account Details
                    </button>
                  </div>
                </div>

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
                        <h3 className="text-xl font-bold mb-4">Enter Pin for {selectedAccount.rarity}</h3>
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
