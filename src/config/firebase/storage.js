import { getStorage } from 'firebase/storage';
import app from './app';

let storage;

try {
  storage = getStorage(app);
} catch (error) {
  console.error('Firebase Storage initialization error:', error);
  throw new Error('Failed to initialize Firebase Storage.');
}

export default storage;