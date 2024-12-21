import { db, COLLECTIONS } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

class FirebaseService {
  constructor() {
    this.listeners = new Map();
  }

  // Generic subscription handler
  subscribe(collectionName, callback, queryOptions = {}) {
    const baseQuery = collection(db, collectionName);
    const queryRef = queryOptions.orderBy 
      ? query(baseQuery, orderBy(queryOptions.orderBy))
      : baseQuery;

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      callback(items);
    }, (error) => {
      console.error(`Error in ${collectionName} listener:`, error);
    });

    this.listeners.set(collectionName, unsubscribe);
    return unsubscribe;
  }

  // Update document with timestamp
  async updateDocument(collectionName, docId, data) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Create document with timestamp
  async createDocument(collectionName, docId, data) {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Cleanup all listeners
  cleanup() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners.clear();
  }
}

export const firebaseService = new FirebaseService();