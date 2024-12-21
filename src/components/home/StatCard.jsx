import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ stat }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-effect p-8 rounded-xl text-center bg-black/40 hover:bg-black/60 transition-all duration-300"
    >
      <stat.icon className="h-8 w-8 text-red-500 mx-auto mb-4" />
      <div className="text-3xl font-bold text-red-500 mb-2">{stat.number}</div>
      <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
      <div className="text-sm text-gray-400">{stat.description}</div>
    </motion.div>
  );
}