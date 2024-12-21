import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SidebarNav from './sidebar/SidebarNav';

export default function MobileNav({ isOpen, onToggle }) {
  const location = useLocation();

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md z-50 px-4 flex items-center justify-between border-b border-white/10">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
          Day27
        </Link>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-16 left-0 bottom-0 w-64 bg-black/90 backdrop-blur-md z-50 border-r border-white/10"
          >
            <div className="h-full overflow-y-auto">
              <SidebarNav isCollapsed={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}