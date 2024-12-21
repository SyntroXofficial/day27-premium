import { create } from 'zustand';
import { 
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  writeBatch,
  getDocs
} from 'firebase/firestore';
import { db, COLLECTIONS } from '../services/firebase';
import { 
  CloudArrowUpIcon,
  FilmIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

const useServicesStore = create((set, get) => ({
  services: [],
  isLoading: true,
  error: null,
  totalServices: 0,

  initialize: () => {
    // First, ensure the services collection exists with initial data
    ensureServicesCollection();

    const servicesRef = collection(db, COLLECTIONS.SERVICES);
    const q = query(servicesRef, orderBy('order'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const categories = [];
        let total = 0;

        snapshot.forEach((doc) => {
          const category = {
            id: doc.id,
            ...doc.data(),
            items: doc.data().items.map(item => ({
              ...item,
              icon: getServiceIcon(item.type)
            }))
          };
          categories.push(category);
          total += category.items.length;
        });

        set({ 
          services: categories,
          totalServices: total,
          isLoading: false 
        });
      },
      (error) => {
        console.error('Error fetching services:', error);
        set({ error: error.message, isLoading: false });
      }
    );

    return unsubscribe;
  },

  updateServiceStatus: async (categoryId, serviceId, status) => {
    try {
      const serviceRef = doc(db, COLLECTIONS.SERVICES, categoryId);
      await updateDoc(serviceRef, {
        [`items.${serviceId}.status`]: status,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating service status:', error);
      throw error;
    }
  },

  batchUpdateServices: async (updates) => {
    const batch = writeBatch(db);
    
    try {
      updates.forEach(({ categoryId, serviceId, data }) => {
        const serviceRef = doc(db, COLLECTIONS.SERVICES, categoryId);
        batch.update(serviceRef, {
          [`items.${serviceId}`]: { ...data, lastUpdated: serverTimestamp() }
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error batch updating services:', error);
      throw error;
    }
  }
}));

// Helper function to ensure services collection exists with initial data
async function ensureServicesCollection() {
  try {
    const servicesRef = collection(db, COLLECTIONS.SERVICES);
    const snapshot = await getDocs(servicesRef);

    if (snapshot.empty) {
      const batch = writeBatch(db);
      
      // Add initial categories
      const categories = [
        {
          name: 'Gaming',
          order: 1,
          items: [
            { id: 'xbox-gamepass', name: 'Xbox Game Pass', type: 'cloud', status: 'active', rarity: 'legendary' },
            { id: 'playstation-plus', name: 'PlayStation Plus', type: 'cloud', status: 'active', rarity: 'legendary' },
            { id: 'ea-play', name: 'EA Play', type: 'cloud', status: 'active', rarity: 'legendary' },
            { id: 'steam', name: 'Steam', type: 'gaming', status: 'active', rarity: 'mythic' }
          ]
        },
        {
          name: 'Streaming',
          order: 2,
          items: []
        }
      ];

      categories.forEach((category, index) => {
        const docRef = doc(servicesRef);
        batch.set(docRef, {
          ...category,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });

      await batch.commit();
    }
  } catch (error) {
    console.error('Error ensuring services collection:', error);
  }
}

function getServiceIcon(type) {
  switch (type) {
    case 'cloud':
      return CloudArrowUpIcon;
    case 'streaming':
      return FilmIcon;
    case 'community':
      return UserGroupIcon;
    case 'feedback':
      return ChatBubbleBottomCenterTextIcon;
    default:
      return CloudArrowUpIcon;
  }
}

export default useServicesStore;
