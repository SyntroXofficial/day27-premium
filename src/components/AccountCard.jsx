import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import { RARITY_GLOW } from '../utils/glowStyles';
import PinModal from './PinModal';
import AccountCredentials from './accounts/AccountCredentials';
import AccountHeader from './accounts/AccountHeader';
import AccountDetails from './steam/AccountDetails';

export default function AccountCard({ account }) {
  const [copied, setCopied] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState('');

  const rarityConfig = RARITY_CONFIGS[account.rarity];
  const glowStyle = RARITY_GLOW[account.rarity];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePinSubmit = (pin) => {
    if (pin === rarityConfig.pin) {
      setShowCredentials(true);
      setShowPinModal(false);
      setError('');
    } else {
      setError('Incorrect PIN');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="glass-effect rounded-xl overflow-hidden"
        style={{
          boxShadow: glowStyle.boxShadow,
          animation: `${glowStyle.animation} 3s ease-in-out infinite`
        }}
      >
        <div className="relative">
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={account.imageUrl} 
              alt={account.game} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <AccountHeader game={account.game} rarityConfig={rarityConfig} />
        </div>
        <div className="p-6">
          {!showCredentials ? (
            <>
              <AccountDetails account={account} />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPinModal(true)}
                className={`w-full px-4 py-3 rounded-lg text-white transition-all duration-300 flex items-center justify-center gap-2 ${rarityConfig.bgColor} hover:brightness-110`}
                style={{
                  boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
                }}
              >
                <LockClosedIcon className="h-5 w-5" />
                <span>View Account Details</span>
              </motion.button>
            </>
          ) : (
            <AccountCredentials
              username={account.username}
              password={account.password}
              copied={copied}
              onCopy={copyToClipboard}
              rarityConfig={rarityConfig}
              account={account}
            />
          )}
        </div>
      </motion.div>

      <PinModal
        isOpen={showPinModal}
        onClose={() => {
          setShowPinModal(false);
          setError('');
        }}
        onSubmit={handlePinSubmit}
        rarity={account.rarity}
        error={error}
      />
    </>
  );
}