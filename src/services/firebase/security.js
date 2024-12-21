import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db, COLLECTIONS } from '../../config/firebase';

export const securityService = {
  async logAccessAttempt(userId, action, success, details = {}) {
    try {
      await addDoc(collection(db, COLLECTIONS.LOGS), {
        userId,
        action,
        success,
        timestamp: serverTimestamp(),
        ip: window.location.hostname,
        userAgent: navigator.userAgent,
        ...details
      });
    } catch (error) {
      console.error('Error logging access attempt:', error);
    }
  },

  async validatePin(pin, type) {
    try {
      const q = query(
        collection(db, COLLECTIONS.PINS),
        where('value', '==', pin),
        where('type', '==', type),
        where('active', '==', true)
      );

      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      console.error('Error validating PIN:', error);
      return false;
    }
  },

  async getDashboardCredentials() {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.DASHBOARD));
      if (!snapshot.empty) {
        return snapshot.docs[0].data();
      }
      return null;
    } catch (error) {
      console.error('Error getting dashboard credentials:', error);
      return null;
    }
  }
};