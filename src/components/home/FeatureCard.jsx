import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ feature }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-effect p-8 rounded-xl bg-black/40 hover:bg-black/60 transition-all duration-300"
    >
      <feature.icon className="h-8 w-8 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  );
}