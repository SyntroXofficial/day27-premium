import { initializeApp } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeCollections } from './firebase/initializeCollections';

const firebaseConfig = {
  apiKey: "AIzaSyBqX8OtLXB6QNTl9h5nxVBHjnIwqh_YFWQ",
  authDomain: "prime-nexo.firebaseapp.com",
  projectId: "prime-nexo",
  storageBucket: "prime-nexo.appspot.com",
  messagingSenderId: "458796412365",
  appId: "1:458796412365:web:3f8d9b2e8f9b4f5a6c7d8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enable offline persistence with multi-tab support
try {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });
} catch (error) {
  console.warn('Offline persistence not available:', error);
}

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  FEEDBACKS: 'feedbacks',
  ONLINE_STATUS: 'onlineStatus',
  ACTIVITIES: 'activities',
  SERVICES: 'services',
  MEMBERS: 'members',
  SYSTEM: 'system'
};

// Initialize collections with default data
initializeCollections().catch(error => {
  console.warn('Error during collections initialization:', error);
});

export default app;