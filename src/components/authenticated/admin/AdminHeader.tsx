import React from 'react';
import UserModal from '../usermodal/UserModal';

function AdminHeader() {
  return (
    <div className='flex w-screen justify-between items-center bg-blue-700  px-4'>
     
      <div className='text-white'>
        MSP Academy
      </div>

     
      <div className='text-white p-1'>
      <UserModal />
      </div>
    </div>
  );
}

export default AdminHeader;
