import React from 'react';
import { steamAccounts } from '../../data/steamAccounts';
import PageHeader from '../layout/PageHeader';

export default function SteamHeader() {
  return (
    <PageHeader
      title="Steam Accounts"
      subtitle="Unlock Premium Gaming Experiences with Our Curated Collection"
      count={steamAccounts.length}
      countLabel="Premium Accounts"
    />
  );
}