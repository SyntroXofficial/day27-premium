import React from 'react';
import { motion } from 'framer-motion';

export default function GradientOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/40" />
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
          backgroundSize: '100% 100%',
        }}
      />
    </>
  );
}