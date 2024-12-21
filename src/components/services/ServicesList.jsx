import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import useServicesStore from '../../store/servicesStore';

export default function ServicesList() {
  const { services, isLoading } = useServicesStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {services.map((category, index) => (
        <div key={category.id} className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-2xl font-bold text-red-500"
          >
            {category.name}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.items.map((service, serviceIndex) => (
              <ServiceCard
                key={service.id}
                service={service}
                delay={index * 0.1 + serviceIndex * 0.1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}