import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function SidebarToggle({ isCollapsed, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
    >
      {isCollapsed ? (
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      ) : (
        <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
      )}
    </button>
  );
}