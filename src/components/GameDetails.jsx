import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { steamAccounts } from '../data/steamAccounts';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import { RARITY_GLOW } from '../utils/glowStyles';
import PinModal from '../components/PinModal';

export default function GameDetails() {
  const { gameId } = useParams();
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const account = steamAccounts.find(
    acc => acc.game.toLowerCase().replace(/\s+/g, '-') === gameId
  );

  if (!account) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-black">
        <div className="text-red-500">Game not found</div>
      </div>
    );
  }

  const rarityConfig = RARITY_CONFIGS[account.rarity];
  const glowStyle = RARITY_GLOW[account.rarity];

  const handlePinSubmit = (pin) => {
    if (pin === rarityConfig.pin) {
      setIsUnlocked(true);
      setShowPinModal(false);
      setError('');
    } else {
      setError('Incorrect PIN');
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl overflow-hidden"
          style={{
            boxShadow: glowStyle.boxShadow,
            animation: `${glowStyle.animation} 3s ease-in-out infinite`
          }}
        >
          <div className="relative h-[600px]">
            <img
              src={account.imageUrl}
              alt={account.game}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-5xl font-bold text-white">{account.game}</h1>
                <span className={`px-4 py-2 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
                  {rarityConfig.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {account.features.map((feature, index) => (
                  <span key={index} className="px-4 py-2 bg-black/50 rounded-lg text-gray-300 border border-white/10">
                    {feature.value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">About the Game</h2>
                <div className="space-y-4 text-gray-300">
                  {account.description.split('\n').map((line, index) => (
                    <p key={index} className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${rarityConfig.bgColor}`}></span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Game Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {account.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${rarityConfig.bgColor}`}></span>
                      <span className="text-gray-300">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">System Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Recommended</h3>
                  <div className="space-y-2">
                    <p className="text-gray-400">CPU: {account.requirements.cpu}</p>
                    <p className="text-gray-400">GPU: {account.requirements.gpu}</p>
                    <p className="text-gray-400">RAM: {account.requirements.ram}</p>
                    <p className="text-gray-400">Storage: {account.requirements.storage}</p>
                  </div>
                </div>
              </div>
            </div>

            {isUnlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg bg-gradient-to-r from-black/90 to-green-500/10 border border-green-500/30"
              >
                <h3 className="text-xl font-bold text-green-400 mb-4">Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400">Username:</span>
                    <p className="text-white font-mono text-lg">{account.username}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Password:</span>
                    <p className="text-white font-mono text-lg">{account.password}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                className={`w-full px-6 py-4 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} transition-all duration-300 hover:scale-105`}
                style={{
                  boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
                }}
              >
                Unlock Account Details
              </button>
            )}
          </div>
        </motion.div>
      </div>

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
    </div>
  );
}