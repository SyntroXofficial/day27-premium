import React from 'react';
import { motion } from 'framer-motion';
import useServicesStore from '../../store/servicesStore';

export default function ServicesHeader() {
  const { totalServices } = useServicesStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl font-bold text-red-500 mb-6">Other Services</h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Explore our additional gaming and entertainment services
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-6 py-2 bg-red-500/20 border border-red-500/30 rounded-lg mt-4"
      >
        <span className="text-white font-bold">
          {totalServices} Services Available
        </span>
      </motion.div>
    </motion.div>
  );
}