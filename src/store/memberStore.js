import { create } from 'zustand';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  where,
  getDocs,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../services/firebase';

const useMemberStore = create((set, get) => ({
  members: [],
  onlineUsers: new Set(),
  isLoading: true,
  error: null,

  fetchMembers: async () => {
    try {
      const q = query(
        collection(db, 'members'),
        orderBy('joinDate', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const members = [];
        snapshot.forEach((doc) => {
          members.push({ id: doc.id, ...doc.data() });
        });
        set({ members, isLoading: false });
      }, (error) => {
        console.error('Error fetching members:', error);
        set({ error: error.message, isLoading: false });
      });

      return unsubscribe;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error setting up members listener:', error);
    }
  },

  updateMemberStatus: async (memberId, isOnline) => {
    if (!memberId) return;

    try {
      const statusRef = doc(db, 'memberStatus', memberId);
      await setDoc(statusRef, {
        isOnline,
        lastUpdated: serverTimestamp(),
        lastActive: isOnline ? 'Now' : new Date().toISOString()
      }, { merge: true });

      set(state => {
        const newOnlineUsers = new Set(state.onlineUsers);
        if (isOnline) {
          newOnlineUsers.add(memberId);
        } else {
          newOnlineUsers.delete(memberId);
        }
        return { onlineUsers: newOnlineUsers };
      });
    } catch (error) {
      console.error('Error updating member status:', error.message);
      // Don't throw the error to prevent UI disruption
    }
  },

  banMember: async (memberId, reason) => {
    if (!memberId) return;

    try {
      const memberRef = doc(db, 'members', memberId);
      await updateDoc(memberRef, {
        banned: true,
        banReason: reason,
        banDate: serverTimestamp()
      });

      // Update local state
      set(state => ({
        members: state.members.map(member =>
          member.id === memberId
            ? { ...member, banned: true, banReason: reason, banDate: new Date().toISOString() }
            : member
        )
      }));
    } catch (error) {
      console.error('Error banning member:', error.message);
      throw error;
    }
  },

  unbanMember: async (memberId) => {
    if (!memberId) return;

    try {
      const memberRef = doc(db, 'members', memberId);
      await updateDoc(memberRef, {
        banned: false,
        banReason: null,
        banDate: null
      });

      // Update local state
      set(state => ({
        members: state.members.map(member =>
          member.id === memberId
            ? { ...member, banned: false, banReason: null, banDate: null }
            : member
        )
      }));
    } catch (error) {
      console.error('Error unbanning member:', error.message);
      throw error;
    }
  },

  initializeRealtime: () => {
    // Listen for online status changes
    const statusQuery = query(
      collection(db, 'memberStatus'),
      where('isOnline', '==', true)
    );

    const unsubscribe = onSnapshot(statusQuery, (snapshot) => {
      const onlineUsers = new Set();
      snapshot.forEach((doc) => {
        onlineUsers.add(doc.id);
      });
      set({ onlineUsers });
    }, (error) => {
      console.error('Error in status listener:', error);
    });

    return unsubscribe;
  }
}));

export default useMemberStore;