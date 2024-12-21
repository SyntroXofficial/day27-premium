import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarLogo from './sidebar/SidebarLogo';
import SidebarToggle from './sidebar/SidebarToggle';
import SidebarNav from './sidebar/SidebarNav';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  return (
    <motion.div 
      initial={{ width: 256 }}
      animate={{ 
        width: isCollapsed ? 80 : 256,
        transition: { duration: 0.3 }
      }}
      className="fixed left-0 top-0 h-screen bg-black/80 backdrop-blur-md border-r border-white/10 z-50 hidden md:block"
    >
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <AnimatePresence>
          <SidebarLogo isCollapsed={isCollapsed} />
        </AnimatePresence>
        <SidebarToggle 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
      </div>
      
      <SidebarNav isCollapsed={isCollapsed} />
    </motion.div>
  );
}