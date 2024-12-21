import { useState, useEffect } from 'react';

export function useServerStatus() {
  const [status, setStatus] = useState({
    health: 'Healthy',
    cpu: 0,
    memory: 0,
    uptime: '0d 0h 0m',
    traffic: '0B/month',
    lastIncident: null
  });

  useEffect(() => {
    // Simulated server status updates
    const updateStatus = () => {
      setStatus(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 20) + 35,
        memory: Math.floor(Math.random() * 15) + 55
      }));
    };

    const interval = setInterval(updateStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return { status };
}