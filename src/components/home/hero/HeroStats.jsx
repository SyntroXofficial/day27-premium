import React from 'react';
import { motion } from 'framer-motion';
import { GlobeAltIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    icon: ShieldCheckIcon,
    value: '100%',
    label: 'Secure'
  },
  {
    icon: GlobeAltIcon,
    value: '24/7',
    label: 'Support'
  },
  {
    icon: ClockIcon,
    value: '99.9%',
    label: 'Uptime'
  }
];

export default function HeroStats() {
  return (
    <div className="bg-black/40 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <stat.icon className="h-8 w-8 text-red-500 mb-4" />
              <motion.div
                className="text-4xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}