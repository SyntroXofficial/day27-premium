import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { accounts } from '../data/accounts';
import { RARITY_CONFIGS } from '../utils/rarityConfig';
import { RARITY_GLOW } from '../utils/glowStyles';
import PinModal from '../components/PinModal';

// Import the same images mapping used in accounts
const SERVICE_IMAGES = {
  'epic-games': 'https://wallpaper.forfun.com/fetch/aa/aa86d9a7875e7be5ff07dc6866b430ef.jpeg',
  'ubisoft': 'https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/8609775/ubisoft_new_2017_logo_2400.jpg?quality=90&strip=all&crop=0,12.977474878674,100,74.045050242652',
  'ea': 'https://answers.ea.com/t5/image/serverpage/image-id/25952iE419E510A7582A2D?v=v2',
  'battlenet': 'https://static.invenglobal.com/upload/image/2018/11/02/i1541183391530612.jpeg',
  'geforce-now': 'https://www.pcworld.com/wp-content/uploads/2023/10/geforce-now-header-image.jpg?quality=50&strip=all',
  'playstation-plus': 'https://images2.alphacoders.com/123/1231003.jpg',
  'netflix': 'https://images7.alphacoders.com/115/1152297.jpg',
  'roblox': 'https://images5.alphacoders.com/121/1217521.jpg',
  'chatgpt': 'https://pixelz.cc/wp-content/uploads/2023/12/open-ai-chat-gpt-logo-uhd-4k-wallpaper.jpg',
  'rockstar': 'https://www.gtavice.net/content/images/rockstar-games-logo.png',
  'valorant': 'https://wallpaper.forfun.com/fetch/34/34fcf4edbca5e75d4d31967a6b49373e.jpeg',
  'amazon-prime': 'https://wallpapercave.com/wp/wp8338679.jpg',
  'duolingo': 'https://octalysisgroup.com/wp-content/uploads/2020/01/duolingo-header.webp',
  'spotify': 'https://storage.googleapis.com/pr-newsroom-wp/1/2024/03/Generic-FTR-headers_V9-1.png',
  'xbox-gamepass': 'https://dijitaliyidir.com/wp-content/uploads/2024/07/xbox-gamepass-kapak.webp',
  'hbo-max': 'https://cdn.sanity.io/images/1pn9obcz/production/6c440f28ca5d1a16e74289dd57cc0ae1167eb446-1920x1080.jpg',
  'vpn': 'https://wallpapers.com/images/hd/vpn-02ryz2bximhboodd.jpg',
  'iptv': 'https://mspoweruser.com/wp-content/uploads/2024/05/Best-IPTV-players.jpg',
  'disney-plus': 'https://zonait.ro/wp-content/uploads/2020/11/Disney-Plus.jpg',
  'crunchyroll': 'https://www.androidauthority.com/wp-content/uploads/2022/03/crunchyroll-funimation.jpg',
  'proxy': 'https://datascientest.com/en/files/2024/05/proxy-server-datascientest.jpg',
  'league-of-legends': 'https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg',
  'hotmail': 'https://www.bleepstatic.com/content/hl-images/2022/10/07/Outlook_headpic.jpeg'
};

export default function AccountDetails() {
  const { accountId } = useParams();
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const account = accounts.find(acc => acc.id === accountId);

  if (!account) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-black">
        <div className="text-red-500">Account not found</div>
      </div>
    );
  }

  const rarityConfig = RARITY_CONFIGS[account.rarity];
  const glowStyle = RARITY_GLOW[account.rarity];

  const handlePinSubmit = (pin) => {
    if (pin === account.pin) {
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
          <div className="relative h-[500px]">
            <img
              src={SERVICE_IMAGES[account.id]}
              alt={account.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-5xl font-bold text-white">{account.name}</h1>
                <span className={`px-4 py-2 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.textColor} border ${rarityConfig.borderColor}`}>
                  {rarityConfig.label}
                </span>
              </div>
              <p className="text-xl text-gray-300">{account.description}</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {isUnlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg bg-gradient-to-r from-black/90 to-green-500/10 border border-green-500/30"
              >
                <h3 className="text-xl font-bold text-green-400 mb-4">Account Link</h3>
                <a 
                  href={account.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-mono text-lg hover:text-green-400 transition-colors"
                >
                  {account.link}
                </a>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                disabled={account.status === 'outOfStock'}
                className={`w-full px-6 py-4 rounded-lg transition-all duration-300 ${
                  account.status === 'outOfStock'
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : `${rarityConfig.bgColor} ${rarityConfig.textColor} hover:scale-105`
                }`}
                style={account.status !== 'outOfStock' ? {
                  boxShadow: `0 0 20px ${rarityConfig.glowColor}40`
                } : {}}
              >
                {account.status === 'outOfStock' ? 'Out of Stock' : 'Unlock Account'}
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