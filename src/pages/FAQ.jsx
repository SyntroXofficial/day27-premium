import React, { useState } from 'react';
import FAQHeader from '../components/faq/FAQHeader';
import FAQCategory from '../components/faq/FAQCategory';
import { faqs } from '../data/faqData';

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <FAQHeader />
        <div className="space-y-8">
          {faqs.map((category, index) => (
            <FAQCategory
              key={category.category}
              category={category}
              index={index}
              openItems={openItems}
              onToggle={toggleItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}