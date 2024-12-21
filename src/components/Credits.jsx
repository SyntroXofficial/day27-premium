import React from 'react';
import { motion } from 'framer-motion';

export default function Credits() {
  return (
    <div className="bg-black/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400"
          >
            Created with ❤️ by{' '}
            <span className="text-red-500 font-semibold">Andres_rios</span> and{' '}
            <span className="text-red-500 font-semibold">MarcSpector</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}