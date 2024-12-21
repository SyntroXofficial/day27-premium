import React from 'react';
import { motion } from 'framer-motion';

export default function HeroTitle() {
  return (
    <div className="relative inline-block">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-500 animate-gradient"
      >
        Prime Nexo
      </motion.h1>
      <motion.div
        className="absolute -inset-x-20 -inset-y-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}