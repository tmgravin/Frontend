"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import UserModal from '../usermodal/UserModal';
import CustomTabModal from './YourAssignments'; // Adjust the import path if needed
import Image from 'next/image';
const Header: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isCustomTabModalOpen, setCustomTabModalOpen] = useState(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [teacherSignupData, setTeacherSignupData] = useState({ email: '', password: '', remember: false });
  const [studentSignupData, setStudentSignupData] = useState({ email: '', password: '', remember: false });
  const [remember, setRemember] = useState(false);

  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
  const toggleSignupModal = () => setSignupModalOpen(!isSignupModalOpen);
  const toggleCustomTabModal = () => setCustomTabModalOpen(!isCustomTabModalOpen);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleSignupChange = (e: ChangeEvent<HTMLInputElement>, isTeacher: boolean) => {
    const { name, value } = e.target;
    if (isTeacher) {
      setTeacherSignupData(prev => ({ ...prev, [name]: value }));
    } else {
      setStudentSignupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>, isTeacher: boolean) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <header className="p-1">
      <div className='flex flex-col sm:flex-row justify-between items-center'>
        <div className='flex flex-col sm:flex-row items-center'>
          <div className='text-xl sm:text-2xl potta-one-regular primary-navy-blue mb-4 sm:mb-0 text-center'>MSP ASSIGNMENT</div>
          <div
            className='px-3 py-2 flex flex-row text-center cursor-pointer sm:ml-4'
            onClick={toggleCustomTabModal}
          >
          <div className='p-1'> Your Assignments</div> 
            <Image
      src="/pngs/arrowdown.svg" // Path relative to the public directory
      alt="Laptop Image"
      width={20} // Provide appropriate width
      height={20} // Provide appropriate height
    />
          </div>
        </div>
        <div className='flex flex-row justify-end items-center mt-4 sm:mt-0'>
          {/* Additional header elements */}
        </div>
        <UserModal/>
      </div>

      {/* Backdrop Overlay with Blur */}
      {(isSignupModalOpen || isLoginModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
      )}

      {/* Render CustomTabModal */}
      {isCustomTabModalOpen && (
        <CustomTabModal onClose={toggleCustomTabModal} />
      )}
    </header>
  );
};

export default Header;
