import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  CubeIcon, 
  SparklesIcon, 
  UserGroupIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Secure Access',
    description: 'Advanced security measures to protect your gaming accounts'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Support',
    description: 'Access to games from different regions and platforms'
  },
  {
    icon: CubeIcon,
    title: 'Premium Content',
    description: 'Exclusive access to rare items and premium features'
  },
  {
    icon: SparklesIcon,
    title: 'Instant Access',
    description: 'Quick and easy access to your favorite games'
  },
  {
    icon: UserGroupIcon,
    title: 'Community',
    description: 'Join a thriving community of gamers'
  },
  {
    icon: ClockIcon,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your gaming needs'
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-gradient-to-b from-black/60 to-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-red-500 mb-4">Why Choose Prime Nexo?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience gaming like never before with our premium features and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-8 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              <feature.icon className="h-8 w-8 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}