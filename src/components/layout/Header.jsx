import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header({ isCollapsed }) {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 bg-transparent fixed top-0 right-0 z-40 flex items-center px-4"
      style={{ left: isCollapsed ? '80px' : '256px' }}
    >
      <div className="flex-1 max-w-xl relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>
    </motion.header>
  );
}
