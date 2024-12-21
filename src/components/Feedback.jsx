import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FeedbackForm from './feedback/FeedbackForm';
import FeedbackHeader from './feedback/FeedbackHeader';
import FeedbackWarning from './feedback/FeedbackWarning';
import FeedbackList from './feedback/FeedbackList';
import useFeedbackStore from '../store/feedbackStore';

export default function Feedback() {
  const { initialize, feedbacks, isLoading, error } = useFeedbackStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-red-500">Error loading feedbacks: {error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <FeedbackHeader />
        <FeedbackWarning />
        <FeedbackForm />
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </motion.div>
  );
}