import React from 'react';
import { motion } from 'framer-motion';
import MethodsList from './methods/MethodsList';
import MethodsHeader from './methods/MethodsHeader';

export default function Methods() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <MethodsHeader />
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <MethodsList />
      </div>
    </motion.div>
  );
}