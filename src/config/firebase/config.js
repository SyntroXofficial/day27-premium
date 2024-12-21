// Firebase configuration constants
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

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