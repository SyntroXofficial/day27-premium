import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './layout/SearchBar';
import WarningMessage from './WarningMessage';
import SteamHeader from './steam/SteamHeader';
import SteamAccountsList from './steam/SteamAccountsList';
import SteamCategories from './steam/SteamCategories';
import { steamAccounts } from '../data/steamAccounts';
import { sortByRarity } from '../utils/sortByRarity';

export default function Steam() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAccounts = useMemo(() => {
    let filtered = steamAccounts;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(account => account.rarity === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(account => 
        account.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.features.some(feature => 
          feature.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return sortByRarity(filtered);
  }, [searchTerm, selectedCategory]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      all: steamAccounts.length,
      mythic: 0,
      legendary: 0,
      epic: 0,
      rare: 0,
      uncommon: 0
    };

    steamAccounts.forEach(account => {
      counts[account.rarity]++;
    });

    return counts;
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <SteamHeader />
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <SearchBar onSearch={handleSearch} placeholder="Search games..." />
        <WarningMessage />
        <SteamCategories
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          counts={categoryCounts}
        />
        <SteamAccountsList
          accounts={filteredAccounts}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </motion.div>
  );
}