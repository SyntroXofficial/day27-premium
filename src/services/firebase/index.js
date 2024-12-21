import { app, db, auth, storage, COLLECTIONS, STORAGE_PATHS } from '../../config/firebase';
import { initializeFirebase } from './initialize';

// Initialize Firebase with proper error handling
const initialize = async () => {
  try {
    await initializeFirebase();
  } catch (error) {
    console.error('Failed to initialize Firebase:', error.message);
    // You might want to show a user-friendly error message here
  }
};

// Initialize when the module is imported
initialize();

export {
  app,
  db,
  auth,
  storage,
  COLLECTIONS,
  STORAGE_PATHS
};