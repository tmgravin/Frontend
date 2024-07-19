"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';

interface SignupData {
  email: string;
  password: string;
}

const Header: React.FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null); // null means no specific signup type selected

  const [teacherSignupData, setTeacherSignupData] = useState<SignupData>({ email: '', password: '' });
  const [studentSignupData, setStudentSignupData] = useState<SignupData>({ email: '', password: '' });

  const [loginData, setLoginData] = useState<SignupData>({ email: '', password: '' });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
    setIsTeacherSignup(null); // Reset to show the type selection when the modal is opened
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleSignupChange = (e: ChangeEvent<HTMLInputElement>, isTeacher: boolean) => {
    const { name, value } = e.target;
    if (isTeacher) {
      setTeacherSignupData(prev => ({ ...prev, [name]: value }));
    } else {
      setStudentSignupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>, isTeacher: boolean) => {
    e.preventDefault();
    const signupData = isTeacher ? teacherSignupData : studentSignupData;
    try {
      const response = await fetch(`/api/${isTeacher ? 'teacher-signup' : 'student-signup'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      const result = await response.json();
      console.log(`${isTeacher ? 'Teacher' : 'Student'} Signup response:`, result);
      toggleSignupModal(); // Close modal on success
    } catch (error) {
      console.error(`${isTeacher ? 'Teacher' : 'Student'} Signup error:`, error);
    }
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      console.log('Login response:', result);
      toggleLoginModal(); // Close modal on success
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='flex flex-row justify-between'>
      <div>
        <div className='text-2xl potta-one-regular'>MSP ASSIGNMENT</div>
      </div>
      <div className='flex flex-row justify-end items-center'>
        <div className='px-5'>
          FQA
        </div>
        <div className='primary-blue px-5' onClick={toggleSignupModal}>
          Sign up <i className="fa-solid fa-pen-to-square"></i>
        </div>
        <div className='primary-blue px-5' onClick={toggleLoginModal}>
          Login <i className="fa-solid fa-right-to-bracket"></i>
        </div>
      </div>

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div id="signup-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign up to our platform
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleSignupModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                {isTeacherSignup === null ? (
                  <div>
                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setIsTeacherSignup(true)}>
                      Sign up as Teacher
                    </button>
                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2" onClick={() => setIsTeacherSignup(false)}>
                      Sign up as Student
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => handleSignupSubmit(e, isTeacherSignup)}>
                    <div>
                      <label htmlFor="signup-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="signup-email" value={isTeacherSignup ? teacherSignupData.email : studentSignupData.email} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                      <label htmlFor="signup-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                      <input type="password" name="password" id="signup-password" value={isTeacherSignup ? teacherSignupData.password : studentSignupData.password} onChange={(e) => handleSignupChange(e, isTeacherSignup)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Sign up as {isTeacherSignup ? 'Teacher' : 'Student'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div id="login-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleLoginModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  <div>
                    <label htmlFor="login-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="login-email" value={loginData.email} onChange={handleLoginChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="login-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" id="login-password" value={loginData.password} onChange={handleLoginChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Login to your account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
