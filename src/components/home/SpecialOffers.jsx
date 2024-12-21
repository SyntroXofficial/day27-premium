import React from 'react';
import { motion } from 'framer-motion';

const offers = [
  {
    id: 1,
    title: "Hogwarts Legacy",
    image: "/hogwarts-legacy.jpg",
    price: "$59.99",
    discount: "20%"
  },
  {
    id: 2,
    title: "Call of Duty",
    image: "/cod-mw2.jpg",
    price: "$69.99",
    discount: "15%"
  },
  {
    id: 3,
    title: "FIFA 23",
    image: "/fifa23.jpg",
    price: "$59.99",
    discount: "25%"
  },
  {
    id: 4,
    title: "Mass Effect",
    image: "/mass-effect.jpg",
    price: "$49.99",
    discount: "30%"
  }
];

export default function SpecialOffers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {offers.map((offer, index) => (
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative rounded-xl overflow-hidden"
        >
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white mb-1">{offer.title}</h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-red-600 text-white text-sm font-bold rounded">
                -{offer.discount}
              </span>
              <span className="text-white font-bold">{offer.price}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}