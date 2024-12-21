import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const INITIAL_DATA = {
  users: [],
  feedbacks: [],
  onlineStatus: [],
  activities: [],
  services: [
    {
      name: 'Gaming',
      order: 1,
      items: [
        { id: 'geforce-now', name: 'GeForce NOW', type: 'cloud', status: 'active', rarity: 'legendary' },
        { id: 'steam', name: 'Steam', type: 'gaming', status: 'active', rarity: 'mythic' }
      ]
    }
  ],
  members: [],
  system: {
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      lastUpdate: new Date().toISOString()
    }
  }
};

export const initializeCollections = async () => {
  for (const [collectionName, initialData] of Object.entries(INITIAL_DATA)) {
    try {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      
      if (snapshot.empty) {
        console.log(`Initializing ${collectionName} collection...`);
        // In a real app, you would add the initial data here
        // For development, we'll just log the initialization
      }
    } catch (error) {
      console.error(`Error initializing ${collectionName}:`, error);
      // Continue with other collections even if one fails
    }
  }
};