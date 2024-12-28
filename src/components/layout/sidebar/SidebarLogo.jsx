import React from 'react';
import { motion } from 'framer-motion';

export default function SidebarLogo({ isCollapsed }) {
  return (
    !isCollapsed && (
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark"
      >
        ASHARI
      </motion.h1>
    )
  );
}
