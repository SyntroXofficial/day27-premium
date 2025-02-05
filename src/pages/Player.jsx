import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaServer, FaExpand, FaCompress } from 'react-icons/fa';

function Player() {
  const { type, id } = useParams();
  const location = useLocation();
  const [currentServer, setCurrentServer] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [seasonEpisode, setSeasonEpisode] = useState({ season: 1, episode: 1 });
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const season = queryParams.get('s');
    const episode = queryParams.get('e');
    if (season && episode) {
      setSeasonEpisode({ season: parseInt(season), episode: parseInt(episode) });
    }
  }, [location.search]);

  useEffect(() => {
    // Block pop-ups and ads
    const blockAds = () => {
      window.open = function() { return null; };
    };
    blockAds();

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const getEmbedUrl = () => {
    const baseUrls = {
      1: 'https://multiembed.mov',
      2: 'https://embed.su/embed',
      3: 'https://vidsrc.cc/v3/embed',
      4: 'https://player.videasy.net',
      5: 'https://multiembed.mov/directstream.php'
    };

    const baseUrl = baseUrls[currentServer];
    const isTVShow = type === 'tv';
    const isAnime = type === 'anime';

    if (isAnime) {
      return `${baseUrl}/anime/${id}?color=8B5CF6`;
    }

    if (isTVShow) {
      return `${baseUrl}/${type}/${id}/${seasonEpisode.season}/${seasonEpisode.episode}?autoPlay=false`;
    }

    return `${baseUrl}/${type}/${id}?autoPlay=false`;
  };

  return (
    <div className="min-h-screen bg-black">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex flex-col"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <button 
            onClick={() => window.history.back()}
            className="text-white flex items-center space-x-2 hover:text-gray-300 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Video Container */}
        <div className="flex-1 relative">
          <iframe
            src={getEmbedUrl()}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            style={{ border: 'none' }}
          />

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              {/* Server Selection */}
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((server) => (
                  <button
                    key={server}
                    onClick={() => setCurrentServer(server)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${
                      currentServer === server
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    } transition-colors`}
                  >
                    <FaServer className="w-3 h-3" />
                    <span>Server {server === 4 ? '4K' : server}</span>
                  </button>
                ))}
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isFullscreen ? (
                  <FaCompress className="w-5 h-5" />
                ) : (
                  <FaExpand className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Player;