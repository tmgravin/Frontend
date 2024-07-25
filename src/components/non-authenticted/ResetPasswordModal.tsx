import React, { useState } from 'react';
import axios from 'axios';
import OtpModal from './OtpModalRequest'; // Import the OTP modal
import NewPasswordModal from './NewPasswordModal'; // Import the new password modal

interface ResetPasswordModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, toggleModal }) => {
  const [email, setEmail] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // State for OTP modal
  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState(false); // State for new password modal

  if (!isOpen) return null;

  const handleResetPassword = async () => {
    try {
    //   console.log('Requesting OTP for:', email); // Debugging statement
    //   const response = await axios.post('/api/reset-password', { email });
    //   console.log('Response from reset password:', response.data);
      setIsOtpModalOpen(true); // Open OTP modal
    } catch (error) {
      console.error('Reset password failed', error);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
    //   console.log('Verifying OTP:', otp); // Debugging statement
    //   const response = await axios.post('/api/verify-otp', { email, otp });
    //   console.log('Response from OTP verification:', response.data);
      setIsOtpModalOpen(false);
      setIsNewPasswordModalOpen(true); // Open new password modal
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  };

  const handlePasswordReset = async (newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
    //   console.log('Resetting password for:', email); // Debugging statement
    //   const response = await axios.post('/api/reset-password-confirm', { email, newPassword });
    //   console.log('Response from password reset:', response.data);
      setIsNewPasswordModalOpen(false);
      toggleModal(); // Close reset p //   console.log('Resetting password for:', email); // Debugging statement
      //   const response = await axios.post('/api/reset-password-confirm', { email, newPassword });
      //   console.log('Response from password reset:', response.data);assword modal
    } catch (error) {
      console.error('Password reset failed', error);
    }
  };

  const toggleOtpModal = () => {
    console.log('Toggling OTP modal'); // Debugging statement
    setIsOtpModalOpen(!isOtpModalOpen);
  };

  const toggleNewPasswordModal = () => {
    console.log('Toggling new password modal'); // Debugging statement
    setIsNewPasswordModalOpen(!isNewPasswordModalOpen);
  };

  return (
    <>
      <div id="reset-password-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
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
              <div className="text-xl font-semibold">Reset Password</div>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4">
                <div className="relative cb-shadow">
                  <input
                    type="email"
                    name="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
                    placeholder="Email address"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className="fa-regular fa-envelope text-gray-400"></i>
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full text-white primary-btn-blue hover:secondary-btn-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:primary-btn-blue dark:focus:ring-blue-800"
                  onClick={handleResetPassword}
                >
                 Request OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <OtpModal isOpen={isOtpModalOpen} toggleModal={toggleOtpModal} handleVerifyOtp={handleVerifyOtp} />
      <NewPasswordModal isOpen={isNewPasswordModalOpen} toggleModal={toggleNewPasswordModal} handlePasswordReset={handlePasswordReset} />
    </>
  );
};

export default ResetPasswordModal;
