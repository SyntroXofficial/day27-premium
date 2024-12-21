import React from 'react';

export default function AccountHeader({ game, rarityConfig }) {
  return (
    <div className="absolute bottom-4 left-4 space-y-2">
      <h3 className="text-2xl font-bold text-white">{game}</h3>
      <span className={`inline-block px-4 py-1.5 rounded-full ${rarityConfig.bgColor} ${rarityConfig.textColor} text-sm font-bold tracking-wider shadow-lg border ${rarityConfig.borderColor}`}>
        {rarityConfig.label}
      </span>
    </div>
  );
}