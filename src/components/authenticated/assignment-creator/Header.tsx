// Header.tsx
"use client"
import React, { useState } from 'react';
import PostAssignmentModal from './PostAssignmentModal';
import UserModal from '../usermodal/UserModal';
import CustomTabModal from './YourAssignments';

const Header: React.FC = () => {
  const [isPostAssignmentModalOpen, setPostAssignmentModalOpen] = useState(false);
  const [isCustomTabModalOpen, setCustomTabModalOpen] = useState(false);

  const togglePostAssignmentModal = () => {
    console.log('PostAssignmentModal toggled'); // Debugging
    setPostAssignmentModalOpen(!isPostAssignmentModalOpen);
  };

  const toggleCustomTabModal = () => {
    console.log('CustomTabModal toggled'); // Debugging
    setCustomTabModalOpen(!isCustomTabModalOpen);
  };

  return (
    <header>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center'>
          <div className='text-2xl font-potta primary-navy-blue'>MSP ASSIGNMENT</div>
          <div
            onClick={togglePostAssignmentModal}
            className="text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            Post Assignment
          </div>
          <div
            onClick={toggleCustomTabModal}
            className="text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            Your Assignments
          </div>
        </div>

        <div className='flex flex-row justify-end items-center'>
          {isPostAssignmentModalOpen && <PostAssignmentModal onClose={togglePostAssignmentModal} />}
          {isCustomTabModalOpen && <CustomTabModal onClose={toggleCustomTabModal} />}
        </div>

        <UserModal />
      </div>

      {/* Backdrop Overlay with Blur */}
      {(isPostAssignmentModalOpen || isCustomTabModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
      )}
    </header>
  );
};

export default Header;
