import React from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import PinModal from '../PinModal';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';

export default function MethodPin({ method, onUnlock }) {
  const [showPinModal, setShowPinModal] = React.useState(false);
  const [error, setError] = React.useState('');

  const handlePinSubmit = (pin) => {
    if (pin === method.pin) {
      setShowPinModal(false);
      setError('');
      onUnlock();
    } else {
      setError('Incorrect PIN');
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPinModal(true)}
        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all duration-300 flex items-center justify-center gap-2"
      >
        <LockClosedIcon className="h-5 w-5" />
        <span>View Method</span>
      </motion.button>

      <PinModal
        isOpen={showPinModal}
        onClose={() => {
          setShowPinModal(false);
          setError('');
        }}
        onSubmit={handlePinSubmit}
        rarity={method.rarity}
        error={error}
      />
    </>
  );
}