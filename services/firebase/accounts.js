import { 
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export const accountsService = {
  async getAccounts() {
    try {
      const q = query(
        collection(db, 'accounts'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  },

  async addAccount(accountData) {
    try {
      const docRef = await addDoc(collection(db, 'accounts'), {
        ...accountData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...accountData };
    } catch (error) {
      console.error('Error adding account:', error);
      throw error;
    }
  },

  async updateAccount(accountId, updates) {
    try {
      const accountRef = doc(db, 'accounts', accountId);
      await updateDoc(accountRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { id: accountId, ...updates };
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  },

  async deleteAccount(accountId) {
    try {
      await deleteDoc(doc(db, 'accounts', accountId));
      return accountId;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },

  async getAccountsByRarity(rarity) {
    try {
      const q = query(
        collection(db, 'accounts'),
        where('rarity', '==', rarity),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching accounts by rarity:', error);
      throw error;
    }
  }
};