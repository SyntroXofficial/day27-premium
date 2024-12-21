import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
    >
      <Link
        to="/accounts"
        className="group relative overflow-hidden px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 flex items-center gap-2"
      >
        <span className="relative z-10 font-semibold">Browse Accounts</span>
        <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600"
          initial={false}
          whileHover={{ scale: 1.5, opacity: 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </Link>
    </motion.div>
  );
}