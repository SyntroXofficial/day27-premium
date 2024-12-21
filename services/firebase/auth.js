import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, COLLECTIONS } from '../firebase';
import { getDiscordUserData } from '../discord/discordAuth';

export const signInWithDiscord = async (code) => {
  try {
    const discordData = await getDiscordUserData(code);
    
    // Create or update user document
    const userRef = doc(db, COLLECTIONS.USERS, discordData.id);
    const userSnap = await getDoc(userRef);

    const userData = {
      username: discordData.username,
      email: discordData.email,
      discordId: discordData.id,
      avatar: discordData.avatar,
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (!userSnap.exists()) {
      userData.createdAt = serverTimestamp();
      userData.role = 'Member';
    }

    await setDoc(userRef, userData, { merge: true });

    // Update online status
    await setDoc(doc(db, COLLECTIONS.ONLINE_STATUS, discordData.id), {
      isOnline: true,
      lastSeen: serverTimestamp()
    });

    return { user: { id: discordData.id, ...userData } };
  } catch (error) {
    console.error('Error signing in with Discord:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (userId) {
      await setDoc(doc(db, COLLECTIONS.ONLINE_STATUS, userId), {
        isOnline: false,
        lastSeen: serverTimestamp()
      });
    }
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};