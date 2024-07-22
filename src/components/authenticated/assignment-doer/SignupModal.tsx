// SignupModal.tsx
"use client";
import React, { ChangeEvent, FormEvent } from 'react';

interface SignupData {
  email: string;
  password: string;
  remember?: boolean;
}

interface SignupModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  isTeacherSignup: boolean | null;
  setIsTeacherSignup: React.Dispatch<React.SetStateAction<boolean | null>>;
  teacherSignupData: SignupData;
  studentSignupData: SignupData;
  handleSignupChange: (e: ChangeEvent<HTMLInputElement>, isTeacher: boolean) => void;
  handleSignupSubmit: (e: FormEvent<HTMLFormElement>, isTeacher: boolean) => void;
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
  handleSignupSubmit,
  remember,
  setRemember
}) => {
  if (!isOpen) return null;

  return (
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
                  Sign up as Student
                </button>
                <button className="w-full mt-5 text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800 " onClick={() => setIsTeacherSignup(false)}>
                  Sign up as Teacher
                </button>
                <div className='mt-5'>
                  <div className='flex flex-row'> Already have an account.<div className='secondary-blue'>Sign in</div></div>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(e) => handleSignupSubmit(e, isTeacherSignup)}>
              <div className="relative cb-shadow">
              
                <input type="email" name="email" id="signup-email" value={isTeacherSignup ? teacherSignupData.email : studentSignupData.email} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"placeholder="Full Name" required />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i className="fa-regular fa-envelope text-gray-400"></i>
              </span>
              </div>
              <div className="relative cb-shadow">
              
              <input type="email" name="email" id="signup-email" value={isTeacherSignup ? teacherSignupData.email : studentSignupData.email} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"placeholder="Address" required />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i className="fa-regular fa-envelope text-gray-400"></i>
            </span>
            </div>
            <div className="relative cb-shadow">
              
              <input type="email" name="email" id="signup-email" value={isTeacherSignup ? teacherSignupData.email : studentSignupData.email} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"placeholder="Phone Number" required />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i className="fa-regular fa-envelope text-gray-400"></i>
            </span>
            </div>
            <div className="relative cb-shadow">
              
              <input type="email" name="email" id="signup-email" value={isTeacherSignup ? teacherSignupData.email : studentSignupData.email} onChange={(e) => handleSignupChange(e, isTeacherSignup)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"placeholder="Email address" required />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i className="fa-regular fa-envelope text-gray-400"></i>
            </span>
            </div>
            
              <div className="relative cb-shadow">
            
                <input type="password" name="password" id="signup-password" value={isTeacherSignup ? teacherSignupData.password : studentSignupData.password} onChange={(e) => handleSignupChange(e, isTeacherSignup)} placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5" required />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i className="fa-regular fa-envelope text-gray-400"></i>
            </span>
              </div>

              <div className="flex  flex-row">
              <input
                type="checkbox"
                id="example-checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="form-checkbox h-5 w-5 text-blue-600 border-blue-500 rounded"
              />
              <label htmlFor="checkbox" className="ml-2 text-gray-700">I have read and accept the <div className='secondary-blue'>Terms and Privacy Policy</div></label>
            </div>
              <button type="submit" className="w-full text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800">
                Sign up
              </button>
              <div className='flex flex-row justify-center'>
                <div>Already have an account.</div><div className='secondary-blue'>Sign in</div>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
