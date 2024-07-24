// Header.tsx
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import PostAssignmentModal from './PostAssignmentModal';
import CreditCardVerificationModal from '../assignment-doer/CreditCardVerificationModal';
import UserModal from '../usermodal/UserModal';

const Header: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [teacherSignupData, setTeacherSignupData] = useState({ email: '', password: '', remember: false });
  const [studentSignupData, setStudentSignupData] = useState({ email: '', password: '', remember: false });
  const [remember, setRemember] = useState(false);

  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
  const toggleSignupModal = () => setSignupModalOpen(!isSignupModalOpen);

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


 const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const [iscModalOpen, setIcsModalOpen] = useState(false);

  const handlecOpenModal = () => {
    setIsModalOpen(true);
  };

  const handlecCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCardSubmit = (cardData: any) => {
    console.log('Card Data:', cardData);
    // Perform verification logic here
  };

  return (
    <header>
       <div className='flex flex-row justify-between'>
      <div>
        <div className='flex flex-row'>

        
        <div className='text-2xl font-potta primary-navy-blue'>MSP ASSIGNMENT</div>
       
        <div
        onClick={toggleModal}
        className=" text-sm px-5 py-2.5 text-center cursor-pointer"
      >
        Post Assignment
      </div>
      <div>Your Assignments</div>
      </div>
      </div>
      <div className='flex flex-row justify-end items-center'>
     
      <div className='px-5'>
      {isModalOpen && <PostAssignmentModal onClose={toggleModal} />}
    
    
        </div>
   
       
      </div>
      <UserModal/>
      </div>
     

      {/* Backdrop Overlay with Blur */}
      {(isSignupModalOpen || isLoginModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
      )}


     
    </header>
  );
};

export default Header;
