"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal'; // Import the LoginModal component

interface SignupData {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
  remember?: boolean;
  role?: 'teacher' | 'student'; // Added role field
}

interface SignupModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  isTeacherSignup: boolean | null;
  setIsTeacherSignup: React.Dispatch<React.SetStateAction<boolean | null>>;
  teacherSignupData: SignupData;
  studentSignupData: SignupData;
  handleSignupChange: (e: ChangeEvent<HTMLInputElement>, isTeacher: boolean) => void;
  remember: boolean;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  toggleModal,
  isTeacherSignup,
  setIsTeacherSignup,
  teacherSignupData,
  studentSignupData,
  handleSignupChange,
  remember,
  setRemember
}) => {
  
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<{ email: string; password: string }>({ email: '', password: '' });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>, isTeacher: boolean) => {
    e.preventDefault();
    const signupData = isTeacher ? teacherSignupData : studentSignupData;
    const role = isTeacher ? 'teacher' : 'student'; // Determine the role

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Include the role in the signup data
    const dataToSend = { ...signupData, role };

    try {
      const response = await axios.post('/api/signup', dataToSend);
      if (response.status === 200) {
        setSuccessMessage("Signup successful!");
        setError(null);
        // Optionally, you could close the modal or redirect
        toggleModal(); // Close the modal after successful signup
      }
    } catch (error) {
      console.error('Signup failed', error);
      setError('Signup failed. Please try again.');
      setSuccessMessage(null);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div id="signup-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold">Sign up</h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleModal}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              {isTeacherSignup === null ? (
                <div>
                  <button className="w-full text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800" onClick={() => setIsTeacherSignup(true)}>
                    Sign up as Teacher
                  </button>
                  <button className="w-full mt-5 text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800" onClick={() => setIsTeacherSignup(false)}>
                    Sign up as Student
                  </button>
                  <div className='mt-5'>
                    <div className='flex flex-row'> Already have an account.<button className='secondary-blue' onClick={() => setIsLoginModalOpen(true)}>Sign in</button></div>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => handleSignupSubmit(e, isTeacherSignup)}>
                  <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => setIsTeacherSignup(null)}>
                    &larr; Back
                  </button>
                  <div className="relative cb-shadow">
                    <input type="text" name="name" id="signup-name" value={isTeacherSignup ? teacherSignupData.name : studentSignupData.name} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Full Name" required />
                  </div>
                  <div className="relative cb-shadow">
                    <input type="email" name="email" id="signup-email" value={isTeacherSignup ? teacherSignupData.email : studentSignupData.email} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Email Address" required />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fa-regular fa-envelope text-gray-400"></i>
                    </span>
                  </div>
                  <div className="relative cb-shadow">
                    <input type="text" name="address" id="signup-address" value={isTeacherSignup ? teacherSignupData.address : studentSignupData.address} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Home Address" required />
                  </div>
                  <div className="relative cb-shadow">
                    <input type="text" name="phone" id="signup-phone" value={isTeacherSignup ? teacherSignupData.phone : studentSignupData.phone} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Phone Number" required />
                  </div>
                  <div className="relative cb-shadow">
                    <input type="password" name="password" id="signup-password" value={isTeacherSignup ? teacherSignupData.password : studentSignupData.password} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Password" required />
                  </div>
                  <div className="relative cb-shadow">
                    <input type="password" name="confirmPassword" id="signup-confirm-password" value={isTeacherSignup ? teacherSignupData.confirmPassword : studentSignupData.confirmPassword} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Confirm Password" required />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex flex-row">
                    <input type="checkbox" id="example-checkbox" checked={remember} onChange={() => setRemember(!remember)} className="form-checkbox h-5 w-5 text-blue-600 border-blue-500 rounded" />
                    <label htmlFor="example-checkbox" className="ml-2 text-gray-700">I have read and accept the <div className='secondary-blue'>Terms and Privacy Policy</div></label>
                  </div>
                  <button type="submit" className="w-full text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800">
                    Sign up
                  </button>
                  <div className='flex justify-center itmes-center '>
                    <div className='flex text-center items-center justify-center'>Already have an account?<button className='secondary-blue' onClick={() => setIsLoginModalOpen(true)}> Sign in</button></div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
  isOpen={isLoginModalOpen} 
  toggleModal={() => setIsLoginModalOpen(!isLoginModalOpen)} 
  loginData={loginData} // Ensure this is the correct state for login data
  handleLoginChange={handleLoginChange} // Make sure this function is properly defined
  remember={remember}
  setRemember={setRemember}
/>
    </>
  );
};

export default SignupModal;
