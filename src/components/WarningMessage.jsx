import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function WarningMessage() {
  return (
    <div className="bg-black/90 border border-yellow-500/30 rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex items-start gap-4">
        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-500">Warning</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Disable cloud save and remote play in the steam settings</li>
            <li>• If the game closes or you get disconnected, enter offline mode on Steam or use Big Picture mode</li>
            <li>• For guarded accounts, wait until they become unguarded or use a new account</li>
            <li>• All posts will be updated with new accounts for the same game!</li>
            <li>• Ubisoft, Rockstar, and EA games may not work due to their protections, and some games have Denuvo that may stop you from playing, so try again later or use a new account</li>
            <li className="text-yellow-400">• I'm not responsible for anything if you didn't follow my instructions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}