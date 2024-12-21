import { collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { COLLECTIONS } from '../../config/firebase/config';

const validateFirebaseConfig = () => {
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missingVars = requiredEnvVars.filter(
    varName => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

export const initializeFirebase = async () => {
  try {
    // Validate environment variables
    validateFirebaseConfig();

    // Test database connection
    const testQuery = await getDocs(collection(db, COLLECTIONS.SYSTEM));
    if (!testQuery) {
      throw new Error('Failed to query Firestore');
    }

    // Initialize system collection
    const systemDoc = doc(db, COLLECTIONS.SYSTEM, 'config');
    await setDoc(systemDoc, {
      initialized: true,
      lastCheck: serverTimestamp(),
      version: '1.0.0'
    }, { merge: true });

    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
    throw error;
  }
};