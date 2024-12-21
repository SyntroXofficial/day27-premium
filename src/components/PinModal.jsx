import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../utils/rarityConfig';

export default function PinModal({ isOpen, onClose, onSubmit, rarity, error: externalError }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const rarityConfig = RARITY_CONFIGS[rarity];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pin);
    
    if (externalError) {
      setError(externalError);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: isShaking ? [-10, 10, -10, 10, 0] : 0
          }}
          transition={{ 
            duration: isShaking ? 0.4 : 0.2,
            type: isShaking ? "spring" : "tween"
          }}
          className="relative w-full max-w-sm rounded-lg overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.95)',
            boxShadow: `0 0 30px ${rarityConfig.glowColor}40`
          }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${rarityConfig.textColor}`}>Enter PIN</h3>
              <button 
                onClick={() => {
                  onClose();
                  setPin('');
                  setError('');
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-white/70 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                maxLength="4"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                  setError('');
                }}
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-center text-2xl tracking-[1em] text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                placeholder="****"
                autoFocus
              />

              {(error || externalError) && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error || externalError}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={pin.length !== 4}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                  rarityConfig.bgColor
                } hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{
                  boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
                }}
              >
                Unlock
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}