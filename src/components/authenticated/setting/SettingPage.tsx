"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import BankDetails from './BankDetails';
import UserDetails from './UserDetails';

function SettingPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className=" mx-auto p-4 relative top-0">
      <button
        onClick={handleBackClick}
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded"
      >
        Back
      </button>
      <div><UserDetails /></div>
      <div><BankDetails /></div>
    </div>
  );
}

export default SettingPage;
