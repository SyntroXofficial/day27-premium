import React from 'react';
import { motion } from 'framer-motion';
import { 
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const helpSections = [
  {
    icon: BookOpenIcon,
    title: 'Getting Started',
    description: 'Learn how to use our services and get started with your gaming journey.',
    items: [
      'Account activation process',
      'Accessing your games',
      'Using cloud gaming features',
      'Understanding account rarities'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Security Guidelines',
    description: 'Important security measures to protect your gaming experience.',
    items: [
      'Safe account usage',
      'VPN recommendations',
      'Password protection',
      'Account sharing rules'
    ]
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Support',
    description: 'Get help when you need it from our dedicated support team.',
    items: [
      'Discord community',
      'Ticket system',
      'Common issues',
      'Contact methods'
    ]
  },
  {
    icon: ClockIcon,
    title: 'Service Hours',
    description: 'When and how to reach us for the best support experience.',
    items: [
      '24/7 Discord support',
      'Ticket response times',
      'Peak hours',
      'Emergency contact'
    ]
  }
];

export default function Help() {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <QuestionMarkCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-red-500 mb-4">Help Center</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of our services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {helpSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-6 rounded-xl border border-red-500/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <section.icon className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-400 mb-6">{section.description}</p>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}