import React from 'react';
import { motion } from 'framer-motion';
import FAQItem from './FAQItem';

export default function FAQCategory({ category, index, openItems, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-effect rounded-xl overflow-hidden"
    >
      <h2 className="text-xl font-bold text-white p-6 border-b border-white/10">
        {category.category}
      </h2>
      <div className="p-6">
        {category.questions.map((faq, questionIndex) => (
          <FAQItem
            key={questionIndex}
            question={faq.question}
            answer={faq.answer}
            isOpen={openItems[`${index}-${questionIndex}`]}
            onClick={() => onToggle(index, questionIndex)}
          />
        ))}
      </div>
    </motion.div>
  );
}