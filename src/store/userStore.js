import { create } from 'zustand';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, COLLECTIONS } from '../services/firebase';

const useUserStore = create((set, get) => ({
  users: [],
  onlineUsers: new Set(),
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const q = query(
        collection(db, COLLECTIONS.USERS),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ users, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addUser: async (userData) => {
    try {
      const userRef = doc(collection(db, COLLECTIONS.USERS));
      const user = {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(userRef, user);
      const newUser = { id: userRef.id, ...user };

      set(state => ({
        users: [...state.users, newUser]
      }));

      return newUser;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  updateUserProfile: async (userId, updates) => {
    try {
      if (updates.profilePic instanceof File) {
        const fileExt = updates.profilePic.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const fileRef = ref(storage, `profiles/${fileName}`);
        
        await uploadBytes(fileRef, updates.profilePic);
        const photoURL = await getDownloadURL(fileRef);
        updates.profilePic = photoURL;
      }

      const userRef = doc(db, COLLECTIONS.USERS, userId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(userRef, updateData);

      set(state => ({
        users: state.users.map(user =>
          user.id === userId ? { ...user, ...updates } : user
        )
      }));

      return { id: userId, ...updates };
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  setOnlineStatus: (userId, isOnline) => set(state => {
    const newOnlineUsers = new Set(state.onlineUsers);
    if (isOnline) {
      newOnlineUsers.add(userId);
    } else {
      newOnlineUsers.delete(userId);
    }
    return { onlineUsers: newOnlineUsers };
  }),
  
  getUser: (userId) => {
    const state = get();
    return state.users.find(user => user.id === userId);
  },
  
  isUserOnline: (userId) => {
    const state = get();
    return state.onlineUsers.has(userId);
  }
}));

export default useUserStore;