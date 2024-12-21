import React from 'react';
import { 
  GlobeAltIcon, 
  ComputerDesktopIcon, 
  StarIcon, 
  FilmIcon, 
  CalendarIcon, 
  ClockIcon,
  CpuChipIcon,
  WindowIcon,
  ServerIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

export default function AccountDetails({ account }) {
  return (
    <div className="space-y-6 mb-6">
      <div className="space-y-4">
        {account.description.split('\n').map((line, index) => (
          <p key={index} className="text-gray-300 flex items-center gap-2">
            {line}
          </p>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Region:</span>
          </div>
          <span className="text-white">{account.features.find(f => f.label === 'Region')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ComputerDesktopIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Platform:</span>
          </div>
          <span className="text-white">{account.features.find(f => f.label === 'Platform')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Rating:</span>
          </div>
          <span className="text-white">{account.features.find(f => f.label === 'Rating')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FilmIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Genre:</span>
          </div>
          <span className="text-white">{account.features.find(f => f.label === 'Genre')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Release:</span>
          </div>
          <span className="text-white">{account.features.find(f => f.label === 'Release')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Playtime:</span>
          </div>
          <span className="text-white">{account.features.find(f => f.label === 'Playtime')?.value}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-400">
          <ComputerDesktopIcon className="h-5 w-5" />
          <span className="font-semibold">Recommended Specs (1080p High/Ultra):</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CpuChipIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-gray-400 text-sm">CPU:</span>
                <p className="text-white text-sm">{account.requirements.cpu}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <WindowIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-gray-400 text-sm">GPU:</span>
                <p className="text-white text-sm">{account.requirements.gpu}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ServerIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-gray-400 text-sm">RAM:</span>
                <p className="text-white text-sm">{account.requirements.ram}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CircleStackIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-gray-400 text-sm">Storage:</span>
                <p className="text-white text-sm">{account.requirements.storage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}