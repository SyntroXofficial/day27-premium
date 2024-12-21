import React from 'react';
import { motion } from 'framer-motion';

export default function AccountsHeader() {
  return (
    <div className="h-[40vh] relative flex items-center justify-center mb-12 mt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/80" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl font-bold mb-6 text-red-500 drop-shadow-lg"
        >
          Premium Accounts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-gray-200 leading-relaxed drop-shadow-lg mb-8"
        >
          Unlock Premium Gaming Experiences with Our Curated Collection
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-6 py-2 bg-gradient-to-r from-red-500/20 via-black/40 to-red-500/20 border border-red-500/30 rounded-lg"
        >
          <span className="text-white font-bold">
            {/* You can add account count here if needed */}
            Premium Accounts Available
          </span>
        </motion.div>
      </div>
    </div>
  );
}