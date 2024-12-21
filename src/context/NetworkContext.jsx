import React, { createContext, useContext, useState, useEffect } from 'react';
import { networkManager } from '../services/firebase/networkManager';
import { toast } from 'react-hot-toast';

const NetworkContext = createContext(null);

export const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(networkManager.getConnectionStatus().isOnline);

  useEffect(() => {
    const unsubscribe = networkManager.addListener((status) => {
      setIsOnline(status);
      if (status) {
        toast.success('Connection restored');
      } else {
        toast.error('Connection lost - operating offline');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};