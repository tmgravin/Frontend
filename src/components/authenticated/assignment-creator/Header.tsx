"use client"
import React, { useState } from 'react';
import PostAssignmentModal from './PostAssignmentModal';
import UserModal from '../usermodal/UserModal';
import CustomTabModal from './YourAssignments';
import Image from 'next/image'

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
    <header className="p-1">
      <div className='flex flex-row justify-between'>
      <div className='flex flex-col lg:flex-row justify-start items-center'>
      <div className="flex items-center">
     
       </div>
        <div className='flex flex-col lg:flex-row items-center'>
        <Image
      src="/msp-logo.png" // Path relative to the public directory
      alt="logo"
      width={50} // Provide appropriate width
      height={50} // Provide appropriate height
    />
       
          <div className='text-2xl font-potta primary-navy-blue mb-4 lg:mb-0'>
            MSP ASSIGNMENT
          </div>
          <div
            onClick={togglePostAssignmentModal}
            className="text-sm px-5 flex flex-row py-2.5 text-center cursor-pointer mb-2 lg:mb-0 lg:ml-4"
          >
          <div className='p-1'> Post Assignment</div> 
            <Image
      src="/pngs/arrowdown.svg" // Path relative to the public directory
      alt="Laptop Image"
      width={20} // Provide appropriate width
      height={20} // Provide appropriate height
    />
          </div>
          
       
          <div
            onClick={toggleCustomTabModal}
            className="text-sm px-5 flex flex-row py-2.5 text-center cursor-pointer lg:ml-4"
          >
         <div className='p-1'>  Your Assignments </div> 
            <Image
      src="/pngs/arrowdown.svg" // Path relative to the public directory
      alt="Laptop Image"
      width={20} // Provide appropriate width
      height={20} // Provide appropriate height
    />
          </div>

        </div>

        <div className='flex justify-end items-center mt-4 lg:mt-0'>
          {isPostAssignmentModalOpen && <PostAssignmentModal onClose={togglePostAssignmentModal} />}
          {isCustomTabModalOpen && <CustomTabModal onClose={toggleCustomTabModal} />}
        </div>

      
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
