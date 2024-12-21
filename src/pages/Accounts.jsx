import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
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
      {/* Featured Accounts Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Accounts Carousel */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Accounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '0 0 0 1px rgba(255, 0, 0, 0.3)',
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))'
                }}
              >
                <Link to={`/accounts/${account.id}`}>
                  <img
                    src={account.imageUrl}
                    alt={account.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Rarity Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-md bg-black/80 text-red-500 text-sm font-bold uppercase tracking-wider border border-red-500/30">
                      {account.rarity}
                    </span>
                  </div>

                  {/* Account Info */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{account.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>{account.platform || 'Steam'}</span>
                        <span>{account.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-black/50 text-sm text-white/90">
                          {account.status || 'In Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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
            {filteredAccounts.map((account, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition-all cursor-pointer group"
                onClick={() => setSelectedAccount(account)}
              >
                <div className="relative h-full">
                  <img
                    src={account.imageUrl}
                    alt={account.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className={`inline-block px-3 py-1 rounded-[4px] text-sm font-semibold uppercase tracking-wide ${
                        rarityBgColors[account.rarity.toLowerCase()]
                      }`} style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                        {account.rarity}
                      </div>
                      {account.inStock ? (
                        <div className="inline-block px-3 py-1 rounded-[4px] text-sm font-semibold uppercase tracking-wide bg-[#000000] text-green-400" style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                          In Stock
                        </div>
                      ) : (
                        <div className="inline-block px-3 py-1 rounded-[4px] text-sm font-semibold uppercase tracking-wide bg-[#000000] text-red-400" style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                          Out of Stock
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{account.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{account.description}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{account.type}</p>
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
                        className="absolute inset-0 bg-black/75 flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.9 }}
                          className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        >
                          <h3 className="text-xl font-bold mb-4">Enter Pin for {selectedAccount.rarity} Account</h3>
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
    </div>
  );
}
