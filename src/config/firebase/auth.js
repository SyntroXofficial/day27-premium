import { getAuth } from 'firebase/auth';
import app from './app';

let auth;

try {
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase Auth initialization error:', error);
  throw new Error('Failed to initialize Firebase Auth.');
}

export default auth;