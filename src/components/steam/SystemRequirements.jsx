import React from 'react';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function SystemRequirements({ requirements }) {
  const renderRequirement = (label, value) => (
    <div>
      <span className="text-gray-400">{label}:</span>
      <p className="text-white">{value}</p>
    </div>
  );

  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        <ComputerDesktopIcon className="h-5 w-5" />
        <span className="font-semibold">Recommended Specs (1080p High/Ultra):</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        {renderRequirement('CPU', requirements.cpu)}
        {renderRequirement('GPU', requirements.gpu)}
        {renderRequirement('RAM', requirements.ram)}
        {renderRequirement('Storage', requirements.storage)}
      </div>
    </div>
  );
}