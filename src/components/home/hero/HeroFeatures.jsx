import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, CloudArrowUpIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Secure Access',
    description: 'Protected gaming accounts'
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Cloud Gaming',
    description: 'Play anywhere, anytime'
  },
  {
    icon: SparklesIcon,
    title: 'Premium Content',
    description: 'Exclusive game features'
  }
];

export default function HeroFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="glass-effect p-6 rounded-xl hover:bg-white/5 transition-colors duration-300"
        >
          <feature.icon className="h-8 w-8 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}