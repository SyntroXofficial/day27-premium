import { db, auth, storage, analytics, COLLECTIONS } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const initializeFirebase = async () => {
  try {
    // Initialize collections with default data if needed
    const dashboardRef = collection(db, COLLECTIONS.DASHBOARD);
    await addDoc(dashboardRef, {
      pin: '673492815047236',
      password: '8@Tz!3YwL#q2RpN',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Log initialization
    await addDoc(collection(db, COLLECTIONS.LOGS), {
      type: 'system',
      message: 'Firebase services initialized',
      timestamp: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return false;
  }
};