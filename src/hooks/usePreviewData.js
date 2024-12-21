import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '../services/firebase/config';

export function usePreviewData(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError(new Error('No preview ID provided'));
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, COLLECTIONS.SERVICES, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setError(new Error('Preview not found'));
        }
      } catch (err) {
        console.error('Error fetching preview:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, isLoading, error };
}