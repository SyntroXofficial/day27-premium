import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, COLLECTIONS, STORAGE } from './config';

export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);

    // Handle profile picture upload
    if (updates.profilePic instanceof File) {
      const fileRef = ref(storage, `${STORAGE.PROFILES}/${userId}`);
      await uploadBytes(fileRef, updates.profilePic);
      updates.profilePic = await getDownloadURL(fileRef);
    }

    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserByDiscordId = async (discordId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      where('discordId', '==', discordId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user by Discord ID:', error);
    throw error;
  }
};

export const updateOnlineStatus = async (userId, isOnline) => {
  try {
    const statusRef = doc(db, COLLECTIONS.ONLINE_STATUS, userId);
    await setDoc(statusRef, {
      isOnline,
      lastSeen: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating online status:', error);
    throw error;
  }
};