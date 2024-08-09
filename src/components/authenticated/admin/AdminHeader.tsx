import React from 'react';
import UserModal from '../usermodal/UserModal';

function AdminHeader() {
  return (
    <div className='flex w-screen justify-between items-center bg-blue-700 h-10 px-4'>
      {/* Left end component */}
      <div className='text-white'>
        MSP Academy
      </div>

      {/* Right end component */}
      <div className='text-white'>
        <UserModal />
      </div>
    </div>
  );
}

export default AdminHeader;
