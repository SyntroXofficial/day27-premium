import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function VerifyAuth() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already verified
    const verificationStatus = localStorage.getItem('restoreVerification');
    if (verificationStatus === 'verified') {
      setIsVerified(true);
      navigate('/');
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    // Listen for verification completion
    const handleVerification = (event) => {
      if (event.origin === 'https://restorecord.com' && event.data === 'verified') {
        localStorage.setItem('restoreVerification', 'verified');
        setIsVerified(true);
        navigate('/');
      }
    };

    window.addEventListener('message', handleVerification);
    return () => window.removeEventListener('message', handleVerification);
  }, [navigate]);

  const handleVerifyClick = () => {
    window.location.href = 'https://restorecord.com/verify/Day27';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="glass-effect p-8 rounded-xl text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-6">Verification Required</h1>
          <p className="text-gray-300 mb-8">
            Please verify your account through RestoreCord to access the website.
          </p>
          <button
            onClick={handleVerifyClick}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
          >
            Verify with RestoreCord
          </button>
        </div>
      </motion.div>
    </div>
  );
}