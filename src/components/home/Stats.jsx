import React from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  ClockIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import StatCard from './StatCard';

const stats = [
  { 
    icon: GlobeAltIcon,
    number: '50+', 
    label: 'Premium Games',
    description: 'Extensive game library'
  },
  { 
    icon: ClockIcon,
    number: '24/7', 
    label: 'Support',
    description: 'Always here to help'
  },
  { 
    icon: ShieldCheckIcon,
    number: '99.9%', 
    label: 'Success Rate',
    description: 'Reliable service'
  }
];

export default function Stats() {
  return (
    <div className="py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}