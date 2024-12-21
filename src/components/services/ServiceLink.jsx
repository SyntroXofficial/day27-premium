import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkIcon } from '@heroicons/react/24/outline';
import PinModal from '../PinModal';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { validatePin } from '../../utils/pinValidation';

export default function ServiceLink({ service }) {
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState('');

  const handleLinkClick = () => {
    if (service.status === 'outOfStock') {
      return;
    }
    setShowPinModal(true);
    setError('');
  };

  const handlePinSubmit = (pin) => {
    if (validatePin(pin, service, RARITY_CONFIGS)) {
      window.open(service.link, '_blank');
      setShowPinModal(false);
      setError('');
    } else {
      setError('Incorrect PIN');
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLinkClick}
        disabled={service.status === 'outOfStock'}
        className={`
          flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg
          ${service.status === 'outOfStock' 
            ? 'bg-gray-800 cursor-not-allowed text-gray-500'
            : 'bg-red-600 hover:bg-red-700 text-white'}
          transition-all duration-300
        `}
      >
        <LinkIcon className="h-5 w-5" />
        <span>{service.status === 'outOfStock' ? 'Unavailable' : 'Get Access'}</span>
      </motion.button>

      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSubmit={handlePinSubmit}
        rarity={service.rarity}
        error={error}
      />
    </>
  );
}