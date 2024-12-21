import { useState, useEffect } from 'react';
import { socketService } from '../services/socketService';

export function useServerMetrics() {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 65,
    disk: 30,
    network: {
      in: 1024 * 1024 * 50, // 50MB
      out: 1024 * 1024 * 30  // 30MB
    },
    responseTime: 150
  });

  useEffect(() => {
    // Subscribe to real-time metrics updates
    const unsubscribe = socketService.subscribe('serverMetrics', (data) => {
      setMetrics(data);
    });

    // Simulate metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 20) + 35,
        memory: Math.floor(Math.random() * 15) + 55,
        responseTime: Math.floor(Math.random() * 100) + 100,
        network: {
          in: prev.network.in + Math.floor(Math.random() * 1024 * 1024),
          out: prev.network.out + Math.floor(Math.random() * 1024 * 1024)
        }
      }));
    }, 5000);

    return () => {
      clearInterval(interval);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return metrics;
}