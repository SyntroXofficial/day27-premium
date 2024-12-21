import { useState, useEffect } from 'react';
import { statsService } from '../services/statsService';

export function useStats() {
  const [stats, setStats] = useState({
    totalUsers: 2,
    activeUsers: 2,
    activeAccounts: 0,
    serverStatus: 'Online',
    uptime: '100%',
    responseTime: 0,
    bannedUsers: 0,
    newUsers: 0,
    lastUpdate: null
  });

  useEffect(() => {
    const unsubscribe = statsService.subscribe(newStats => {
      setStats(newStats);
    });

    return () => unsubscribe();
  }, []);

  return { stats };
}