import React from 'react';
import { motion } from 'framer-motion';

export default function FAQHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-bold text-red-500 mb-4">Frequently Asked Questions</h1>
      <p className="text-gray-400">Find answers to common questions about our services</p>
    </motion.div>
  );
}