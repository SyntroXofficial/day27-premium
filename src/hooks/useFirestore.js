import { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebaseService';

export function useFirestore(collectionName, options = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseService.subscribe(
      collectionName,
      (items) => {
        setData(items);
        setIsLoading(false);
      },
      options
    );

    return () => unsubscribe();
  }, [collectionName]);

  const update = async (docId, data) => {
    try {
      await firebaseService.updateDocument(collectionName, docId, data);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const create = async (docId, data) => {
    try {
      await firebaseService.createDocument(collectionName, docId, data);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    data,
    isLoading,
    error,
    update,
    create
  };
}