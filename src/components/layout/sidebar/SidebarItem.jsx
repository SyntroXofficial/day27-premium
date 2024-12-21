import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SidebarItem({ path, icon: Icon, label, isActive, isCollapsed }) {
  return (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
          : 'text-gray-400 hover:bg-white/5'
      }`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}