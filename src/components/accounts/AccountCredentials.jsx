import React from 'react';
import { ClipboardDocumentIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function AccountCredentials({ username, password, copied, onCopy, rarityConfig, account }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {account.description.split('\n').map((line, index) => (
          <p key={index} className="text-gray-300 flex items-center gap-2">
            {line}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Region:</span>
          <span className="text-white">{account.features.find(f => f.label === 'Region')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Platform:</span>
          <span className="text-white">{account.features.find(f => f.label === 'Platform')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Rating:</span>
          <span className="text-white">{account.features.find(f => f.label === 'Rating')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Genre:</span>
          <span className="text-white">{account.features.find(f => f.label === 'Genre')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Release:</span>
          <span className="text-white">{account.features.find(f => f.label === 'Release')?.value}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Playtime:</span>
          <span className="text-white">{account.features.find(f => f.label === 'Playtime')?.value}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-400">
          <ComputerDesktopIcon className="h-5 w-5" />
          <span className="font-semibold">Recommended Specs (1080p High/Ultra):</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">CPU:</span>
            <p className="text-white">{account.requirements.cpu}</p>
          </div>
          <div>
            <span className="text-gray-400">GPU:</span>
            <p className="text-white">{account.requirements.gpu}</p>
          </div>
          <div>
            <span className="text-gray-400">RAM:</span>
            <p className="text-white">{account.requirements.ram}</p>
          </div>
          <div>
            <span className="text-gray-400">Storage:</span>
            <p className="text-white">{account.requirements.storage}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-800 space-y-4">
        <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
          <span className="text-gray-300">Username:</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-100">{username}</span>
            <button 
              onClick={() => onCopy(username, 'username')}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
            >
              <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
            </button>
            {copied === 'username' && (
              <span className={`text-xs ${rarityConfig.textAccent}`}>Copied!</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
          <span className="text-gray-300">Password:</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-100">{password}</span>
            <button 
              onClick={() => onCopy(password, 'password')}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
            >
              <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
            </button>
            {copied === 'password' && (
              <span className={`text-xs ${rarityConfig.textAccent}`}>Copied!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}