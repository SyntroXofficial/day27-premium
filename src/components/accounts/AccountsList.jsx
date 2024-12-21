import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

export default function AccountsList() {
  return (
    <div className="flex flex-nowrap gap-8 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-black/20">
      {accounts.map((account, index) => (
        <motion.div
          key={account.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex-none w-[400px]"
        >
          <ServiceCard service={account} />
        </motion.div>
      ))}
    </div>
  );
}