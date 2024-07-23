"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import SignupModal from './SignupModal'; // Adjust the import path as needed
import LoginModal from './LoginModal'; // Import the LoginModal

interface SignupData {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
  remember?: boolean;
}

const Header: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [teacherSignupData, setTeacherSignupData] = useState<SignupData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [studentSignupData, setStudentSignupData] = useState<SignupData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
    if (isSignupModalOpen) {
      setSignupModalOpen(false);
    }
  };

  const toggleSignupModal = () => {
    setSignupModalOpen(!isSignupModalOpen);
    if (isLoginModalOpen) {
      setLoginModalOpen(false);
    }
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleSignupChange = (
    e: ChangeEvent<HTMLInputElement>,
    isTeacher: boolean
  ) => {
    const { name, value } = e.target;
    if (isTeacher) {
      setTeacherSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setStudentSignupData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignupSubmit = async (
    e: FormEvent<HTMLFormElement>,
    isTeacher: boolean
  ) => {
    e.preventDefault();
    const signupData = isTeacher ? teacherSignupData : studentSignupData;
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post('/api/signup', signupData);
      if (response.status === 200) {
        alert("Signup successful!");
        toggleSignupModal();
        toggleLoginModal(); // Open login modal after successful signup
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <header>
      <div className="flex flex-row justify-between">
        <div>
          <div className="text-2xl potta-font primary-navy-blue">MSP ASSIGNMENT</div>
        </div>
        <div className="flex flex-row justify-end items-center">
          <div className="primary-blue px-5 cursor-pointer" onClick={toggleSignupModal}>
            Sign up <i className="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="primary-blue px-5 cursor-pointer" onClick={toggleLoginModal}>
            Login <i className="fa-solid fa-right-to-bracket"></i>
          </div>
        </div>
      </div>

      {(isSignupModalOpen || isLoginModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
      )}

      <SignupModal
        isOpen={isSignupModalOpen}
        toggleModal={toggleSignupModal}
        isTeacherSignup={isTeacherSignup}
        setIsTeacherSignup={setIsTeacherSignup}
        teacherSignupData={teacherSignupData}
        studentSignupData={studentSignupData}
        handleSignupChange={handleSignupChange}
        remember={remember}
        setRemember={setRemember}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        toggleModal={toggleLoginModal}
        loginData={loginData}
        handleLoginChange={handleLoginChange}
        handleLoginSubmit={handleLoginSubmit}
        remember={remember}
        setRemember={setRemember}
      />
    </header>
  );
};

export default Header;
