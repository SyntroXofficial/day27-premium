import { getDatabase, goOnline, goOffline } from 'firebase/database';
import { db } from '../firebase';

class NetworkManager {
  constructor() {
    this.listeners = new Set();
    this.isOnline = navigator.onLine;
    this.rtdb = getDatabase();
    this.initializeListeners();
  }

  initializeListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
    }
  }

  handleOnline() {
    this.isOnline = true;
    goOnline(this.rtdb);
    this.notifyListeners();
  }

  handleOffline() {
    this.isOnline = false;
    goOffline(this.rtdb);
    this.notifyListeners();
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.isOnline));
  }

  getConnectionStatus() {
    return {
      isOnline: this.isOnline,
      timestamp: new Date().toISOString()
    };
  }
}

export const networkManager = new NetworkManager();