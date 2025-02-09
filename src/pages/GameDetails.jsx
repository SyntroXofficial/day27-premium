import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, FaKey, FaClock, FaGlobe, FaInfoCircle, FaCopy, 
  FaDownload, FaSteam, FaWindows, FaApple, FaLinux,
  FaGamepad, FaMemory, FaMicrochip, FaHdd, FaDesktop,
  FaCalendarAlt, FaStar, FaTrophy, FaUsers, FaCrown,
  FaCode, FaServer, FaShieldAlt, FaExclamationTriangle,
  FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaFlag
} from 'react-icons/fa';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ReportDetailsModal from '../components/ReportDetailsModal';

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) {
        setError('Invalid game ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const gameRef = doc(db, 'games', id);
        const gameDoc = await getDoc(gameRef);
        
        if (gameDoc.exists()) {
          setGame({ id: gameDoc.id, ...gameDoc.data() });
          setError(null);
        } else {
          setError('Game not found');
          setTimeout(() => navigate('/games'), 3000);
        }
      } catch (error) {
        console.error('Error fetching game:', error);
        setError('Error loading game');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id, navigate]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white text-lg">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold text-white mb-2">{error}</h2>
            <p className="text-gray-400">Redirecting to games page...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!game) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[100vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <img
            src={game.imageUrl}
            alt={game.game}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Game Info */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-start"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="ml-16 space-y-8 max-w-lg">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-white tracking-tight">{game.game}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-500 w-4 h-4" />
                  <span className="text-white">{game.features.find(f => f.label === 'Rating')?.value}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-400 w-4 h-4" />
                  <span className="text-white">{game.features.find(f => f.label === 'Release')?.value}</span>
                </div>
              </div>
            </div>

            {/* Game Access */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm">Username</label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-black/30 text-white px-3 py-1.5 rounded font-mono text-sm">
                      {game.username}
                    </code>
                    <button
                      onClick={() => copyToClipboard(game.username)}
                      className="p-1.5 bg-white/10 rounded hover:bg-white/20 transition-colors"
                    >
                      <FaCopy className="w-4 h-4 text-white/70" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-sm">Password</label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-black/30 text-white px-3 py-1.5 rounded font-mono text-sm">
                      {game.password}
                    </code>
                    <button
                      onClick={() => copyToClipboard(game.password)}
                      className="p-1.5 bg-white/10 rounded hover:bg-white/20 transition-colors"
                    >
                      <FaCopy className="w-4 h-4 text-white/70" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-yellow-500 text-sm">
                    <FaExclamationTriangle className="w-3 h-3" />
                    <span>Having issues?</span>
                  </div>
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
                  >
                    <FaFlag className="w-3 h-3" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Copy Notification */}
      <div
        className={`fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg transform transition-all duration-300 ${
          copied ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        Copied to clipboard!
      </div>

      {/* Report Modal */}
      <ReportDetailsModal
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        itemName={game?.game}
        itemId={id}
        type="game"
      />
    </div>
  );
}

export default GameDetails;
