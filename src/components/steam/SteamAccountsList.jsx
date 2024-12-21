import React from 'react';
import AccountCard from '../AccountCard';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 21;

export default function SteamAccountsList({ accounts, currentPage, onPageChange }) {
  const totalPages = Math.ceil(accounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAccounts = accounts.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-nowrap gap-8 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-black/20">
        {currentAccounts.map((account, index) => (
          <div key={index} className="flex-none w-[400px]">
            <AccountCard account={account} />
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}