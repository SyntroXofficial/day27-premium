import { initializeApp } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

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

let app;
let db;
let auth;
let storage;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Initialize Auth
  auth = getAuth(app);
  
  // Initialize Storage
  storage = getStorage(app);

  // Enable Auth persistence
  auth.setPersistence('local');

  // Enable Firestore offline persistence
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });

  // Use Auth emulator in development
  if (import.meta.env.DEV) {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  }
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
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
  SETTINGS: 'settings',
  PINS: 'pins',
  DASHBOARD: 'dashboard',
  LOGS: 'logs'
};

// Storage paths
export const STORAGE_PATHS = {
  PROFILES: 'profiles',
  MEDIA: 'media',
  ATTACHMENTS: 'attachments'
};

export { app, db, auth, storage };