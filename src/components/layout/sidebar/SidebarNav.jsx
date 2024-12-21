import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { 
  HomeIcon,
  ListBulletIcon,
  ShoppingCartIcon,
  UserIcon,
  WrenchIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: ListBulletIcon, label: 'Library', path: '/library' },
  { icon: PlayIcon, label: 'Streaming', path: '/streaming' },
  { icon: ShoppingCartIcon, label: 'Methods', path: '/methods' },
  { icon: UserIcon, label: 'Accounts', path: '/accounts' },
  { icon: ExclamationTriangleIcon, label: 'Warning', path: '/warning' },
  { icon: QuestionMarkCircleIcon, label: 'FAQ', path: '/faq' }
];

export default function SidebarNav({ isCollapsed }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-[calc(100vh-88px)]">
      <nav className="p-4 flex-grow overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            path={item.path}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.path)}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </div>
  );
}
