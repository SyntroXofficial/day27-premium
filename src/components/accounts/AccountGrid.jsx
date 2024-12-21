import React from 'react';
import AccountCard from './AccountCard';

export default function AccountGrid({ accounts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {accounts.map((account, index) => (
        <AccountCard key={account.id} account={account} index={index} />
      ))}
    </div>
  );
}