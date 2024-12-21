import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CloudArrowUpIcon, 
  FilmIcon, 
  UserGroupIcon, 
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline';

const services = [
  {
    name: 'GeForce NOW',
    description: 'Cloud Gaming Service',
    icon: CloudArrowUpIcon,
    path: '/geforce-now'
  },
  {
    name: 'Stremio',
    description: 'Streaming Platform',
    icon: FilmIcon,
    path: '/stremio'
  },
  {
    name: 'Members',
    description: 'Community Members',
    icon: UserGroupIcon,
    path: '/members'
  },
  {
    name: 'Feedback',
    description: 'Support & Suggestions',
    icon: ChatBubbleBottomCenterTextIcon,
    path: '/feedback'
  }
];

export default function OtherServices() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-4">Other Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our additional services and community features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect rounded-xl p-8 h-full border border-white/10 hover:bg-white/5 transition-all duration-300"
                >
                  <service.icon className="h-12 w-12 text-red-500 mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">{service.name}</h2>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}