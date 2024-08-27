import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import ResetPasswordModal from "./ResetPasswordModal";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupData {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginModalProps {
  toggleSignupModal: () => void;
  isOpen: boolean;
  toggleModal: () => void;
  loginData: SignupData;
  handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  toggleSignupModal,
  isOpen,
  toggleModal,
  loginData,
  handleLoginChange,
}) => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [remember, setRemember] = useState(false);

  if (!isOpen) return null;

  // Function to set user data in a cookie
  function setUserCookie(data: any) {
    const userValue = encodeURIComponent(JSON.stringify(data));
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Cookie expires in 7 days

    document.cookie = `user=${userValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  }

  const handleLogin = async (userRole: string) => {
    console.log(loginData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,
        {
          ...loginData,
          userType: userRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true, // If you are using cookies for authentication
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        // Storing user data in localStorage
        // localStorage.setItem('user', JSON.stringify(response.data));
        setUserCookie(response.data); // Set user data in cookie
        toast.success("Login successful!");
        if (response.data.userType === "ASSIGNMENT_CREATOR") {
          router.push(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/assignment-creator`
          );
        } else if (response.data.userType === "ASSIGNMENT_DOER") {
          router.push(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/assignment-doer`
          );
        }
      }
    } catch (error: any) {
      console.error(
        "Login failed, Please check your email and password. Also, check if email is verified.",
        error
      );
      const errorMessage =
        error.response?.data ||
        "Login failed. Please verify email and check your credentials.";
      toast.error(errorMessage);
    }
  };

  const toggleResetModal = () => setIsResetModalOpen(!isResetModalOpen);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    // handleLogin(userRole || ''); // Call handleLogin with the userRole
  };

  return (
    <div
      id="login-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
    >
      <ToastContainer />
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
            <Image src="/notextlogo.png" alt="logo" width={50} height={50} />
            <div className="text-xl font-semibold primary-navy-blue">
              Welcome to
            </div>
            <div className="text-xl font-semibold primary-navy-blue">
              MSP Academy
            </div>
            <div className="underline">Login to continue</div>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
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

              <div className="cb-shadow">
                <input
                  type="password"
                  name="password"
                  id="login-password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex flex-row justify-end">
                <div>Forget Password?</div>
                <div
                  className="primary-orange cursor-pointer"
                  onClick={toggleResetModal}
                >
                  Reset it
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="form-checkbox h-5 w-5 text-blue-600 border-blue-500 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
                onClick={() => handleLogin("ASSIGNMENT_CREATOR")}
              >
                Login {/* as Assignment Creator */}
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-black"></div>
                <span className="mx-4">or</span>
                <div className="flex-grow border-t border-black"></div>
              </div>

              {/* <div className="flex flex-row justify-center items-center">
                <button
                  type="button"
                  className="w-full border border-black font-medium rounded-lg text-sm flex items-center justify-center space-x-2 px-4 py-1"
                >
                  <Image
                    src="/pngs/googleicon.svg"
                    alt="google icon"
                    width={15}
                    height={15}
                  />
                  <span className="primary-text-gray">Login with Google</span>
                </button>
              </div> */}

              {/* <div className="flex flex-row justify-start items-start">
                <button
                  type="button"
                  className="w-full border border-black font-medium rounded-lg text-sm flex items-center justify-center space-x-2 px-4 py-1"
                >
                  <Image
                    src="/pngs/facebookicon.svg"
                    alt="facebook icon"
                    width={15}
                    height={15}
                  />
                  <span className="primary-text-gray">Login with Facebook</span>
                </button>
              </div> */}

              <div className="flex justify-center items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="primary-orange hover:underline"
                    onClick={() => {
                      toggleModal();
                      toggleSignupModal();
                    }}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Include ResetPasswordModal component here */}
      {isResetModalOpen && (
        <ResetPasswordModal
          isOpen={isResetModalOpen}
          toggleModal={toggleResetModal}
        />
      )}
    </div>
  );
};

export default LoginModal;
