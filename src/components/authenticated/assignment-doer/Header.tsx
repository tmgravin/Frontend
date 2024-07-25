"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import UserModal from '../usermodal/UserModal';
import CustomTabModal from './YourAssignments'; // Adjust the import path if needed
import Link from 'next/link';

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
    <header>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex felx-row'>
          <div className='text-2xl potta-one-regular primary-navy-blue text-center'>MSP ASSIGNMENT</div>
          <div
            className='px-3 text-center cursor-pointer'
            onClick={toggleCustomTabModal}
          >
            Your Assignments
          </div>
        </div>
        <div className='flex flex-row justify-end items-center'>
          {/* Other header elements */}
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
