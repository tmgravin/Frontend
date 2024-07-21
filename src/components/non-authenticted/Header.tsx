// Header.tsx
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Projects from '../authenticated/student/ProjectDropdown'
import PostAssignmentModal from '../authenticated/student/PostAssignmentModal';
import CreditCardVerificationModal from '../authenticated/teacher/CreditCardVerificationModal';

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
  const projects = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
  ];

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
        <div className='text-2xl potta-one-regular primary-navy-blue'>MSP ASSIGNMENT</div>
      </div>
      <div className='flex flex-row justify-end items-center'>
      <div
        onClick={toggleModal}
        className=" text-sm px-5 py-2.5 text-center cursor-pointer"
      >
        Post Assignment
      </div>
      <div className='px-5'>
      {isModalOpen && <PostAssignmentModal onClose={toggleModal} />}
      <Projects />
      <div>
      <button onClick={handlecOpenModal} className="bg-blue-600 text-white rounded-lg px-4 py-2">
        Verify Credit Card
      </button>
      {isModalOpen && (
        <CreditCardVerificationModal onClose={handlecCloseModal} onSubmit={handleCardSubmit} />
      )}
    </div>
        </div>
        <div className='px-5'>
          FQA
        </div>
        <div className='primary-blue px-5 cursor-pointer' onClick={toggleSignupModal}>
          Sign up <i className="fa-solid fa-pen-to-square"></i>
        </div>
        <div className='primary-blue px-5 cursor-pointer' onClick={toggleLoginModal}>
          Login <i className="fa-solid fa-right-to-bracket"></i>
        </div>
      </div>
      </div>

      {/* Backdrop Overlay with Blur */}
      {(isSignupModalOpen || isLoginModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        toggleModal={toggleLoginModal}
        loginData={loginData}
        handleLoginChange={handleLoginChange}
        handleLoginSubmit={handleLoginSubmit}
        remember={remember}
        setRemember={setRemember}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        toggleModal={toggleSignupModal}
        isTeacherSignup={isTeacherSignup}
        setIsTeacherSignup={setIsTeacherSignup}
        teacherSignupData={teacherSignupData}
        studentSignupData={studentSignupData}
        handleSignupChange={handleSignupChange}
        handleSignupSubmit={handleSignupSubmit}
        remember={remember}
        setRemember={setRemember}
      />
    </header>
  );
};

export default Header;
