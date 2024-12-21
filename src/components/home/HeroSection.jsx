import React from 'react';
import { motion } from 'framer-motion';
import HeroTitle from './HeroTitle';
import HeroBackground from './HeroBackground';
import LatestReleases from './LatestReleases';
import Features from './Features';
import WarningMessage from './WarningMessage';

export default function HeroSection() {
  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
        <HeroBackground />
        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="text-center">
            <HeroTitle />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Your ultimate destination for premium gaming experiences. Access exclusive 
              accounts, cloud gaming, and streaming services in one secure platform.
            </motion.p>
          </div>
        </div>
      </div>
      <WarningMessage />
      <LatestReleases />
      <Features />
    </>
  );
}