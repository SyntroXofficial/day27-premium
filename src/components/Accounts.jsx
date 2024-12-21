import React from 'react';
import { motion } from 'framer-motion';
import AccountsList from './accounts/AccountsList';
import AccountsHeader from './accounts/AccountsHeader';

export default function Accounts() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <AccountsHeader />
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <AccountsList />
      </div>
    </motion.div>
  );
}