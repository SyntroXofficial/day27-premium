import React from 'react';

export default function AccountFeatures({ features }) {
  return (
    <div className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="flex justify-between items-center text-sm"
        >
          <span className="text-gray-400">{feature.label}:</span>
          <span className="text-white">{feature.value}</span>
        </div>
      ))}
    </div>
  );
}