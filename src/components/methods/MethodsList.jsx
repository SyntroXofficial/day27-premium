import React from 'react';
import { motion } from 'framer-motion';
import MethodCard from './MethodCard';
import { methods } from '../../data/methods';

export default function MethodsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {methods.map((method, index) => (
        <motion.div
          key={method.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MethodCard method={method} />
        </motion.div>
      ))}
    </div>
  );
}