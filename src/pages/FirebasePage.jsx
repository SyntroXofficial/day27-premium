import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, COLLECTIONS } from '../config/firebase';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function FirebasePage() {
  const [pins, setPins] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to pins collection
    const pinsQuery = query(
      collection(db, COLLECTIONS.PINS),
      orderBy('createdAt', 'desc')
    );

    const unsubscribePins = onSnapshot(pinsQuery, 
      (snapshot) => {
        const pinsData = [];
        snapshot.forEach((doc) => {
          pinsData.push({ id: doc.id, ...doc.data() });
        });
        setPins(pinsData);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching pins:', error);
        setError(error.message);
        setIsLoading(false);
      }
    );

    // Subscribe to dashboard data
    const dashboardQuery = query(collection(db, COLLECTIONS.DASHBOARD));
    const unsubscribeDashboard = onSnapshot(dashboardQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          setDashboardData(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      }
    );

    return () => {
      unsubscribePins();
      unsubscribeDashboard();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-4">Firebase Configuration</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time database configuration and security settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dashboard Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Access</h2>
            {dashboardData && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">PIN:</span>
                  <span className="text-white font-mono">{dashboardData.pin}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Password:</span>
                  <span className="text-white font-mono">{dashboardData.password}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Security Warning */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Security Notice</h3>
                <p className="text-gray-300">
                  All access attempts are logged and monitored. Unauthorized access will result in immediate IP ban.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PIN List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-effect p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Active PINs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pins.map((pin) => (
              <div
                key={pin.id}
                className="bg-black/30 p-4 rounded-lg border border-white/10"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    pin.type === 'admin' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {pin.type}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(pin.createdAt?.toDate()).toLocaleDateString()}
                  </span>
                </div>
                <div className="font-mono text-lg text-white">{pin.value}</div>
                <p className="text-sm text-gray-400 mt-2">{pin.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}