import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-xl mx-auto mb-8"
    >
      <div className="relative group">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 
                   text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                   transition-all duration-300
                   group-hover:border-white/20"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 
                                      text-gray-400 group-hover:text-gray-300 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}