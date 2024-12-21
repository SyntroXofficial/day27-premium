import React from 'react';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, WifiIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: CloudArrowUpIcon,
    title: 'Instant Play',
    description: 'No downloads required. Start playing your favorite games instantly on GeForce NOW.'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Play Anywhere',
    description: 'Access your games on any device - mobile, tablet, or computer.'
  },
  {
    icon: ComputerDesktopIcon,
    title: 'RTX Graphics',
    description: 'Experience ray tracing and DLSS with NVIDIA\'s powerful cloud infrastructure.'
  },
  {
    icon: WifiIcon,
    title: 'Low Latency',
    description: 'Enjoy responsive gameplay with minimal input lag across supported regions.'
  }
];

export default function CloudGaming() {
  return (
    <div className="py-24 bg-gradient-to-b from-black/60 to-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-violet-400 mb-4">Cloud Gaming Ready</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take your gaming to the cloud with GeForce NOW compatibility. Play your favorite games anywhere, anytime, on any device.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect cyber-border p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-violet-400 mb-4">Why Cloud Gaming?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">No expensive gaming PC required</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">Play on mobile, tablet, or any computer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">Access to high-end NVIDIA GPUs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">Regular updates and new features</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect cyber-border p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-violet-400 mb-4">Our Cloud Gaming Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">All accounts are GeForce NOW compatible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">Instant account activation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">24/7 cloud gaming support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                <span className="text-gray-300">Optimized for cloud performance</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="feature-card text-center"
            >
              <feature.icon className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-violet-300 mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}