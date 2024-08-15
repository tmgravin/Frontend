"use client";
import React, { useState } from 'react';
import PostAssignmentModal from './PostAssignmentModal';
import UserModal from '../usermodal/UserModal';
import CustomTabModal from './YourAssignments';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isPostAssignmentModalOpen, setPostAssignmentModalOpen] = useState(false);
  const [isCustomTabModalOpen, setCustomTabModalOpen] = useState(false);

  const togglePostAssignmentModal = () => {
    setPostAssignmentModalOpen(!isPostAssignmentModalOpen);
  };

  const toggleCustomTabModal = () => {
    setCustomTabModalOpen(!isCustomTabModalOpen);
  };

  return (
    <header className="p-1">
      {/* Show header only on medium and larger screens */}
      <div className="hidden md:flex md:flex-row md:justify-between md:items-center">
        <div className="flex flex-row justify-start items-center">
          <div className="flex items-center">
            <Image
              src="/msp-logo.png"
              alt="logo"
              width={50}
              height={50}
            />
            <div className='text-2xl font-potta primary-navy-blue ml-2'>
              MSP ASSIGNMENT
            </div>
          </div>

          <div className='flex flex-row items-center ml-4'>
            <div
              onClick={togglePostAssignmentModal}
              className="text-sm px-5 flex flex-row py-2.5 text-center cursor-pointer"
            >
              <div className='p-1'>Post Assignment</div>
              <Image
                src="/pngs/arrowdown.svg"
                alt="Dropdown Arrow"
                width={20}
                height={20}
              />
            </div>

            <div
              onClick={toggleCustomTabModal}
              className="text-sm px-5 flex flex-row py-2.5 text-center cursor-pointer ml-4"
            >
              <div className='p-1'>Your Assignments</div>
              <Image
                src="/pngs/arrowdown.svg"
                alt="Dropdown Arrow"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        {/* UserModal positioned on the right */}
        <div className='flex items-center ml-auto'>
          <UserModal />
        </div>

        <div className='flex justify-end items-center mt-4 lg:mt-0'>
          {isPostAssignmentModalOpen && <PostAssignmentModal onClose={togglePostAssignmentModal} />}
          {isCustomTabModalOpen && <CustomTabModal onClose={toggleCustomTabModal} />}
        </div>
      </div>

      {/* For small screens */}
      <div className="flex flex-col md:hidden">
        <div className="flex flex-row justify-between items-center p-2">
          <div className='flex items-center'>
            <Image
              src="/notextlogo.png"
              alt="logo"
              width={50}
              height={50}
            />
            <div className='text-2xl font-potta primary-navy-blue ml-2'>
              MSP ACADEMY
            </div>
          </div>

          {/* UserModal positioned on the same row as MSP Academy */}
          <div className="ml-auto">
            <UserModal />
          </div>
        </div>

        {/* Second row for Post Assignment and Your Assignments */}
        <div className="flex flex-row justify-around mt-2">
          <div
            onClick={togglePostAssignmentModal}
            className="text-sm px-5 flex flex-row py-2.5 text-center cursor-pointer"
          >
            <div className='p-1'>Post Assignment</div>
            <Image
              src="/pngs/arrowdown.svg"
              alt="Dropdown Arrow"
              width={20}
              height={20}
            />
          </div>

          <div
            onClick={toggleCustomTabModal}
            className="text-sm px-5 flex flex-row py-2.5 text-center cursor-pointer"
          >
            <div className='p-1'>Your Assignments</div>
            <Image
              src="/pngs/arrowdown.svg"
              alt="Dropdown Arrow"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      {/* Backdrop Overlay with Blur */}
      {(isPostAssignmentModalOpen || isCustomTabModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center" aria-hidden="true">
          {isPostAssignmentModalOpen && <PostAssignmentModal onClose={togglePostAssignmentModal} />}
          {isCustomTabModalOpen && <CustomTabModal onClose={toggleCustomTabModal} />}
        </div>
      )}
    </header>
  );
};

export default Header;
