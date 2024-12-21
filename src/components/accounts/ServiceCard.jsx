import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';
import PinModal from '../PinModal';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export default function ServiceCard({ service }) {
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState('');

  const rarityConfig = RARITY_CONFIGS[service.rarity];
  const glowStyle = RARITY_GLOW[service.rarity];

  const handlePinSubmit = (pin) => {
    if (pin === service.pin) {
      window.open(service.link, '_blank');
      setShowPinModal(false);
      setError('');
    } else {
      setError('Incorrect PIN');
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-effect rounded-xl overflow-hidden h-full"
        style={{
          boxShadow: glowStyle.boxShadow,
          animation: `${glowStyle.animation} 3s ease-in-out infinite`
        }}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{service.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
              {rarityConfig.label}
            </span>
          </div>

          <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>

          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${
              service.status === 'inStock'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {service.status === 'inStock' ? 'In Stock' : 'Out of Stock'}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPinModal(true)}
              disabled={service.status !== 'inStock'}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                service.status === 'inStock'
                  ? `${rarityConfig.bgColor} ${rarityConfig.textColor} hover:brightness-110`
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <LockClosedIcon className="h-5 w-5" />
              <span>Access</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <PinModal
        isOpen={showPinModal}
        onClose={() => {
          setShowPinModal(false);
          setError('');
        }}
        onSubmit={handlePinSubmit}
        rarity={service.rarity}
        error={error}
      />
    </>
  );
}