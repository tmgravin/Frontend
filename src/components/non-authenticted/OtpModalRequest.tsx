import React, { useState, useEffect } from 'react';

interface OtpModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  handleVerifyOtp: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, toggleModal, handleVerifyOtp }) => {
  const [otp, setOtp] = useState('');

  useEffect(() => {
    console.log('OTP Modal isOpen:', isOpen); // Debugging statement
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    handleVerifyOtp(otp);
  };

  return (
    <div id="otp-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
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
            <div className="text-xl font-semibold">Enter OTP</div>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4">
              <div className="relative cb-shadow">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
                  placeholder="Enter  OTP"
                  required
                />
              </div>
              <button
                type="button"
                className="w-full text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
