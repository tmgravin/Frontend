// LoginModal.tsx
"use client";
import React, { ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

interface SignupData {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  loginData: SignupData;
  handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLoginSubmit: (e: FormEvent<HTMLFormElement>) => void;
  remember: boolean;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  toggleModal,
  loginData,
  handleLoginChange,
  handleLoginSubmit,
  remember,
  setRemember
}) => {
  if (!isOpen) return null;

  return (
    <div id="login-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow overflow-y-auto max-h-[90vh]">
          <div className="flex justify-end px-4 md:px-5 rounded-t dark:border-gray-600">
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleModal}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className="text-xl font-semibold">Welcome to</div>
            <div className="text-xl font-semibold primary-navy-blue">MSP Assignment</div>
            <div>Login to continue</div>
          </div>
          <div className="p-4 md:p-5">
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  <div className="relative cb-shadow">
                    <input
                      type="email"
                      name="email"
                      id="login-email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
                      placeholder="Email address"
                      required
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fa-regular fa-envelope text-gray-400"></i>
                    </span>
                  </div>

                  <div className='cb-shadow'>
                    <input type="password" name="password" id="login-password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                  </div>
                  <div className='flex flex-row justify-end'><div>Forget Password?</div><div className='secondary-blue'>Reset it</div></div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="example-checkbox"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="form-checkbox h-5 w-5 text-blue-600 border-blue-500 rounded"
                    />
                    <label htmlFor="example-checkbox" className="ml-2 text-gray-700">Remember me</label>
                  </div>
                  <button type="submit" className="w-full text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800">
                    Login as Student
                  </button>
                  <button type="submit" className="w-full text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800">
                    Login as Teacher
                  </button>

                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="mx-4 ">or</span>
                    <div className="flex-grow border-t border-black"></div>
                  </div>

                  <div className='flex flex-row justify-start items-start'>
  <button type="submit" className="w-full border border-black font-medium rounded-lg text-sm flex items-center space-x-2 px-4 py-1">
    <Image
      src="/pngs/googleicon.svg" // Path to your image in the public directory
      alt="facebook icon"
      width={15} // Specify the width of the image
     height={15} // Specify the height of the image
    />
    <span className='primary-text-gray'>Login with Google</span>
  </button>
</div>

                  <div className='flex flex-row justify-start items-start'>
  <button type="submit" className="w-full border border-black font-medium rounded-lg text-sm flex items-center space-x-2 px-4 py-1">
    <Image
      src="/pngs/facebookicon.svg" // Path to your image in the public directory
      alt="facebook icon"
      width={10} // Specify the width of the image
     height={10} // Specify the height of the image
    />
    <span className='primary-text-gray'>Login with Facebook</span>
  </button>
</div>

                  <div className='flex flex-row justify-center'><div>Don&apos;t have an account?</div><div className='secondary-blue'>Sign up</div></div>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
