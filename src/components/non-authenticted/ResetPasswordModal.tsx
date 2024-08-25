// ResetPasswordModal.tsx

import React, { useState } from "react";
import axios from "axios";
import OtpModal from "./OtpModal"; // Adjust the path based on your project structure
import NewPasswordModal from "./NewPasswordModal"; // Adjust the path based on your project structure
import { toast } from "react-toastify";
import test from "node:test";

interface ResetPasswordModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  toggleModal,
}) => {
  const [email, setEmail] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/forgetPassword`,
        { email }
      );

      if (response.status === 200) {
        toast.success("OTP code is sent to your emial");
        setIsOtpModalOpen(true); // Open OTP modal
      }
    } catch (error) {
      console.error("Reset password failed", error);
      toast.error("OTP verification failed");
    }
  };

  const handleVerifyOtp = async (code: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verifyResetCode`,
        { email, code }
      );
      console.log("Response from OTP verification:", response.data);
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        //invalid code if send old code neeed latest code
        setIsOtpModalOpen(false);
        setIsNewPasswordModalOpen(true); // Open new password modal
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      toast.error("OTP verification failed");
    }
  };

  const handlePasswordReset = async (
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      console.log("Resetting password for:", email); // Debugging statement
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/resetPassword`,
        { email, password }
      );
      console.log("Response from password reset:", response.data);
      if (response.status === 200) {
        toast.success("Password reset successful");
        setIsNewPasswordModalOpen(false);
        toggleModal(); // Close reset password modal
      }
    } catch (error) {
      console.error("Password reset failed", error);
      toast.error("Password reset failed");
    }
  };

  const toggleOtpModal = () => {
    setIsOtpModalOpen(!isOtpModalOpen);
  };

  const toggleNewPasswordModal = () => {
    setIsNewPasswordModalOpen(!isNewPasswordModalOpen);
  };

  return (
    <>
      <div
        id="reset-password-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow overflow-y-auto max-h-[90vh]">
            <div className="flex justify-end px-4 md:px-5 rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
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
                  className="primary-orangebg rounded-sm px-3 py-2 text-white transition-transform duration-300 ease-in-out hover:bg-orange-700 hover:scale-105 w-full"
                  onClick={handleResetPassword}
                >
                  Request OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <OtpModal
        isOpen={isOtpModalOpen}
        toggleModal={toggleOtpModal}
        handleVerifyOtp={handleVerifyOtp}
      />
      <NewPasswordModal
        isOpen={isNewPasswordModalOpen}
        toggleModal={toggleNewPasswordModal}
        handlePasswordReset={handlePasswordReset}
      />
    </>
  );
};

export default ResetPasswordModal;
