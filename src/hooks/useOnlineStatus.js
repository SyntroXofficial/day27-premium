import { useEffect } from 'react';
import { firebaseService } from '../services/firebaseService';
import { COLLECTIONS } from '../services/firebase';

export function useOnlineStatus(userId) {
  useEffect(() => {
    if (!userId) return;

    const updateStatus = async (isOnline) => {
      try {
        await firebaseService.updateDocument(COLLECTIONS.ONLINE_STATUS, userId, {
          isOnline,
          lastSeen: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error updating online status:', error);
      }
    };

    // Set online status when component mounts
    updateStatus(true);

    // Handle visibility change
    const handleVisibilityChange = () => {
      updateStatus(!document.hidden);
    };

    // Handle before unload
    const handleBeforeUnload = () => {
      updateStatus(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      updateStatus(false);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId]);
}