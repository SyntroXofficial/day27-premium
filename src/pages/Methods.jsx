import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { methods } from '../data/methods';

const methodCategories = [
  'PayPal',
  'Credit Card',
  'Crypto',
  'Bank Transfer',
  'Gift Card',
  'Other'
];

const featuredMethods = methods.slice(0, 12);

export default function Methods() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredMethods, setFilteredMethods] = useState(methods);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Auto-slide effect for featured methods
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMethods.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Filter methods based on search and category
  useEffect(() => {
    let filtered = methods;
    if (searchQuery) {
      filtered = filtered.filter(method =>
        method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        method.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(method => method.type === selectedCategory);
    }
    setFilteredMethods(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Featured Section */}
      <div className="relative h-[600px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ x: -currentSlide * 100 + '%' }}
          transition={{ type: 'tween', duration: 0.5 }}
        >
          <div className="flex h-full">
            {featuredMethods.map((method, index) => (
              <div
                key={method.id || index}
                className="relative w-full h-full flex-shrink-0"
              >
                <div 
                  className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${method.imageUrl})`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 p-8">
                    <h2 className="text-4xl font-bold mb-4">{method.name}</h2>
                    <p className="text-xl mb-6">{method.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                        {method.type}
                      </span>
                      <span className="text-gray-400">
                        {method.methodsAvailable} Methods Available
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedMethod(method)}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Slide Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredMethods.length) % featuredMethods.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredMethods.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredMethods.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-red-600' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search and Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search payment methods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="All">All Categories</option>
            {methodCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMethods.map((method, index) => (
            <motion.div
              key={method.id || index}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setSelectedMethod(method)}
            >
              <div className="aspect-video relative">
                <img
                  src={method.imageUrl}
                  alt={method.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/75 text-sm">
                  {method.type}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-sm ${
                    method.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {method.available ? 'Available' : 'Unavailable'}
                  </span>
                  <span className="text-sm text-gray-400">
                    {method.methodsAvailable} Methods
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Method Details Modal */}
      <AnimatePresence>
        {selectedMethod && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMethod(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 rounded-xl max-w-2xl w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video relative mb-4">
                <img
                  src={selectedMethod.imageUrl}
                  alt={selectedMethod.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">{selectedMethod.name}</h2>
              <p className="text-gray-400 mb-4">{selectedMethod.description}</p>
              <div className="flex gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedMethod.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {selectedMethod.available ? 'Available' : 'Unavailable'}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                  {selectedMethod.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                  {selectedMethod.methodsAvailable} Methods
                </span>
              </div>
              <button
                onClick={() => setSelectedMethod(null)}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
