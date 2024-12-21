import { initializeApp } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error('Failed to initialize Firebase. Check your configuration.');
}

// Initialize services with error handling
let db, auth, storage;
try {
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);

  // Enable offline persistence with proper error handling
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });
} catch (error) {
  console.error('Error initializing Firebase services:', error);
  throw new Error('Failed to initialize Firebase services.');
}

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  ACCOUNTS: 'accounts',
  FEEDBACKS: 'feedbacks',
  ACTIVITIES: 'activities',
  SERVICES: 'services',
  MEMBERS: 'members',
  SYSTEM: 'system',
  ONLINE_STATUS: 'onlineStatus',
  NOTIFICATIONS: 'notifications',
  SETTINGS: 'settings'
};

// Storage paths
export const STORAGE_PATHS = {
  PROFILES: 'profiles',
  MEDIA: 'media',
  ATTACHMENTS: 'attachments'
};

export { db, auth, storage };
export default app;
