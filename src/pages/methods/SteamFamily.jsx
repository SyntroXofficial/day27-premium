import React from 'react';
import { motion } from 'framer-motion';
import { methods } from '../../data/methods';
import { RARITY_CONFIGS } from '../../utils/rarityConfig';
import { RARITY_GLOW } from '../../utils/glowStyles';
import PinModal from '../../components/PinModal';

export default function SteamFamily() {
  const [showPinModal, setShowPinModal] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isUnlocked, setIsUnlocked] = React.useState(false);

  const method = methods.find(m => m.id === 'steam-family');
  const rarityConfig = RARITY_CONFIGS[method.rarity];
  const glowStyle = RARITY_GLOW[method.rarity];

  const handlePinSubmit = (pin) => {
    if (pin === method.pin) {
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
          <div className="relative h-[400px]">
            <img
              src="https://i0.wp.com/www.consolecreatures.com/wp-content/uploads/2024/09/Steam-Families.webp"
              alt={method.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-5xl font-bold text-white">{method.title}</h1>
                <span className={`px-4 py-2 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
                  {rarityConfig.label}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {isUnlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {method.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className={`h-6 w-6 rounded-full ${rarityConfig.bgColor} flex items-center justify-center flex-shrink-0 mt-1`}>
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">{method.warning}</p>
                </div>

                {method.status === 'working' && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-400">✓ This method is currently working</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                className={`w-full px-6 py-4 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} transition-all duration-300 hover:scale-105`}
                style={{
                  boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
                }}
              >
                Unlock Method
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
        rarity={method.rarity}
        error={error}
      />
    </div>
  );
}