import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

// Initialize Firebase app
let app;

try {
  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase API key is missing. Check your environment variables.');
  }
  
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase app initialization error:', error);
  throw new Error('Failed to initialize Firebase app. Check your configuration.');
}

export default app;