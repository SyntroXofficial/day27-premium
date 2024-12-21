import React from 'react';
import { ExclamationTriangleIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function MethodContent({ method }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {method.steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-white">
              {index + 1}
            </div>
            <span className="text-gray-300">{step}</span>
          </div>
        ))}
      </div>

      {method.status === 'working' && (
        <div className="flex items-center gap-2 text-green-500">
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="text-sm font-semibold">Currently Working</span>
        </div>
      )}

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
          <p className="text-yellow-200 text-sm">{method.warning}</p>
        </div>
      </div>
    </div>
  );
}