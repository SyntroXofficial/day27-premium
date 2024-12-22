import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    title: "Premium Accounts",
    description: "Access exclusive premium accounts with unique features and benefits.",
    path: "/accounts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: "Game Library",
    description: "Explore our vast collection of premium games across all platforms.",
    path: "/library",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    )
  },
  {
    title: "Streaming Services",
    description: "Get access to premium streaming platforms and exclusive content.",
    path: "/streaming",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  }
];

const stats = [
  { value: "500K+", label: "Premium Accounts" },
  { value: "50+", label: "Games Available" },
  { value: "24/7", label: "Support" },
  { value: "97%", label: "Satisfaction Rate" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-black pointer-events-none" />
        <motion.div 
          className="container mx-auto px-4 text-center relative z-10"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={fadeIn}
          >
            Premium Digital Services
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            variants={fadeIn}
          >
            Access exclusive premium accounts, games, and streaming services all in one place.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            variants={staggerContainer}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={feature.path}
                  className="bg-black border border-red-600 hover:bg-red-600/10 px-8 py-4 rounded-lg transition-colors duration-300 flex items-center gap-3"
                >
                  {feature.icon}
                  <span className="font-semibold">{feature.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="py-24 bg-black"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4"
          variants={staggerContainer}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                className="bg-black border border-gray-800 rounded-lg p-6 hover:border-red-600 transition-colors duration-300"
              >
                <div className="text-red-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <Link
                  to={feature.path}
                  className="text-red-600 hover:text-red-500 font-medium inline-flex items-center gap-2"
                >
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="py-24 bg-black border-t border-gray-800"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4"
          variants={staggerContainer}
        >
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
