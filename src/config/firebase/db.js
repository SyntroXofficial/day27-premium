import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import app from './app';

let db;

try {
  db = getFirestore(app);
  
  // Enable offline persistence
  enableMultiTabIndexedDbPersistence(db).catch((error) => {
    if (error.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (error.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });
} catch (error) {
  console.error('Firestore initialization error:', error);
  throw new Error('Failed to initialize Firestore.');
}

export default db;