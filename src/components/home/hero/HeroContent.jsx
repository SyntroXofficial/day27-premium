import React from 'react';
import { motion } from 'framer-motion';
import HeroTitle from './HeroTitle';
import HeroActions from './HeroActions';
import HeroFeatures from '../HeroFeatures';

export default function HeroContent() {
  return (
    <div className="relative pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <HeroTitle />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Experience gaming excellence with premium accounts, cloud gaming, and exclusive content.
            Join our community of passionate gamers today.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-gray-400"
          >
            Created with ❤️ by <span className="text-red-500">Andres_rios</span> and <span className="text-red-500">MarcSpector</span>
          </motion.p>
          <HeroActions />
          <HeroFeatures />
        </motion.div>
      </div>
    </div>
  );
}