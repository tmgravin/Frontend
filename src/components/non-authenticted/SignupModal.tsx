import React, { useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';

interface SignupModalProps {
  isOpen: boolean;
  toggleModal: () => void; // Ensure this is used correctly
  toggleLoginModal?: () => void; // Optional function with default value
  isTeacherSignup: boolean | null;
  setIsTeacherSignup: (isTeacher: boolean | null) => void;
  teacherSignupData: SignupData;
  studentSignupData: SignupData;
  handleSignupChange: (e: ChangeEvent<HTMLInputElement>, isTeacher: boolean) => void;
  remember: boolean;
  setRemember: (remember: boolean) => void;
}

interface SignupData {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  toggleModal,
  toggleLoginModal = () => {}, // Default function
  isTeacherSignup,
  setIsTeacherSignup,
  teacherSignupData,
  studentSignupData,
  handleSignupChange,
  remember,
  setRemember
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  const clearForm = () => {
    // Clear the form data
    setIsTeacherSignup(null);
    handleSignupChange({ target: { name: 'name', value: '' } } as ChangeEvent<HTMLInputElement>, true);
    handleSignupChange({ target: { name: 'email', value: '' } } as ChangeEvent<HTMLInputElement>, true);
    handleSignupChange({ target: { name: 'address', value: '' } } as ChangeEvent<HTMLInputElement>, true);
    handleSignupChange({ target: { name: 'phone', value: '' } } as ChangeEvent<HTMLInputElement>, true);
    handleSignupChange({ target: { name: 'password', value: '' } } as ChangeEvent<HTMLInputElement>, true);
    handleSignupChange({ target: { name: 'confirmPassword', value: '' } } as ChangeEvent<HTMLInputElement>, true);
    setRemember(false);
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>, isTeacher: boolean) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    const signupData = isTeacher ? teacherSignupData : studentSignupData;
    const userType = isTeacher ? 'ASSIGNMENT_DOER' : 'ASSIGNMENT_CREATOR'; // Determine the role

    if (signupData.password !== signupData.confirmPassword) {
      setIsLoading(false); // Set loading to false
      toast.error('Passwords do not match.');
      return;
    }

    // Include the role in the signup data
    const dataToSend = { ...signupData, userType };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`, dataToSend);
      if (response.status === 200) {
        toast.success("Signup successful! Please verify your email and log in");
        // Clear the form and close the modal after displaying the success message
        clearForm();
        setTimeout(() => {
          toggleModal();
        }, 1000);
      }
    } catch (error) {
      console.error('Signup failed', error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Trigger form submission
      const form = e.currentTarget;
      if (form.checkValidity()) {
        const submitEvent = new Event('submit', { bubbles: true });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div>
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
                  <button className="w-full text-white primary-orangebg hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800" onClick={() => setIsTeacherSignup(true)}>
                    Sign up as Doer
                  </button>
                  <button className="w-full mt-5 text-white primary-orangebg hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800" onClick={() => setIsTeacherSignup(false)}>
                    Sign up as Creator
                  </button>
                  <div className='mt-5'>
                    <div className='flex flex-row'> Already have an account?<button className='primary-orange' onClick={() => {
                      toggleModal(); 
                      toggleLoginModal(); 
                    }}>Sign in</button></div>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => handleSignupSubmit(e, isTeacherSignup)} onKeyDown={handleKeyDown}>
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
                    <input type="text" name="address" id="signup-address" value={isTeacherSignup ? teacherSignupData.address : studentSignupData.address} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Address" required />
                  </div>
                  <div className="relative cb-shadow">
                    <input type="tel" name="phone" id="signup-phone" value={isTeacherSignup ? teacherSignupData.phone : studentSignupData.phone} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Phone Number" required />
                  </div>
                  <div className="relative cb-shadow">
                    <input type="password" name="password" id="signup-password" value={isTeacherSignup ? teacherSignupData.password : studentSignupData.password} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Password" required />
                  </div>
                  <div className="relative cb-shadow">
                    <input type="password" name="confirmPassword" id="signup-confirmPassword" value={isTeacherSignup ? teacherSignupData.confirmPassword : studentSignupData.confirmPassword} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" placeholder="Confirm Password" required />
                  </div>
                  <div className="relative flex items-center mb-4">
                    <input type="checkbox" id="signup-remember" checked={remember} onChange={() => setRemember(!remember)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="signup-remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                  <button type="submit" className="w-full text-white primary-orangebg hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800">
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupModal;
