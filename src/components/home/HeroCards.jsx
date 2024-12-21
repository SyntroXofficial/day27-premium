import React from 'react';
import { motion } from 'framer-motion';
import { 
  CloudArrowUpIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const cards = [
  {
    icon: CloudArrowUpIcon,
    title: 'Cloud Gaming',
    value: '60+ FPS',
    description: 'Smooth performance'
  },
  {
    icon: UserGroupIcon,
    title: 'Active Users',
    value: '10,000+',
    description: 'Growing community'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Best Value',
    value: '24/7',
    description: 'Support included'
  }
];

export default function HeroCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ scale: 1.05 }}
          className="glass-effect cyber-border p-6 rounded-xl relative group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <div className="relative z-10">
            <card.icon className="h-8 w-8 text-violet-400 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
            <motion.div 
              className="text-2xl font-bold text-violet-400 mb-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {card.value}
            </motion.div>
            <div className="text-lg font-semibold text-gray-300 mb-1">{card.title}</div>
            <div className="text-sm text-gray-400">{card.description}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}