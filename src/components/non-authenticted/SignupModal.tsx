import React, { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface SignupModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  toggleLoginModal?: () => void;
  isTeacherSignup: boolean | null;
  setIsTeacherSignup: (isTeacher: boolean | null) => void;
  teacherSignupData: SignupData;
  studentSignupData: SignupData;
  handleSignupChange: (
    e: ChangeEvent<HTMLInputElement>,
    isTeacher: boolean
  ) => void;
  agree: boolean;
  setAgree: (agree: boolean) => void;
}

interface SignupData {
  name: string;
  email: string;
  address?: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  toggleModal,
  toggleLoginModal = () => {},
  isTeacherSignup,
  setIsTeacherSignup,
  teacherSignupData,
  studentSignupData,
  handleSignupChange,
  agree,
  setAgree,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [defaultPicture, setDefaultPicture] = useState<string | null>(null);
  const defaultPictures = [
    "/profilepic/1.jpg",
    "/profilepic/2.jpg",
    "/profilepic/3.jpg",
    "/profilepic/4.jpg",
    "/profilepic/5.jpg",
    "/profilepic/6.jpg",
  ];

  const handlePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setDefaultPicture(null);
    }
  };

  const handleDefaultPictureSelect = async (picturePath: string) => {
    try {
      const response = await fetch(picturePath);
      const blob = await response.blob();
      const file = new File([blob], `default_${picturePath.split("/").pop()}`, {
        type: blob.type,
      });
      setProfilePicture(file);
    } catch (error) {
      console.error("Error fetching default picture:", error);
      toast.error("Failed to select default picture. Please try again.");
    }
  };

  const clearForm = () => {
    setIsTeacherSignup(null);
    [
      "name",
      "email",
      "address",
      "phone",
      "password",
      "confirmPassword",
    ].forEach((field) => {
      handleSignupChange(
        { target: { name: field, value: "" } } as ChangeEvent<HTMLInputElement>,
        true
      );
    });
    setAgree(false);
    setProfilePicture(null);
    setDefaultPicture(null);
  };

  const handleSignupSubmit = async (
    e: FormEvent<HTMLFormElement>,
    isTeacher: boolean
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const signupData = isTeacher ? teacherSignupData : studentSignupData;
    const userType = isTeacher ? "ASSIGNMENT_DOER" : "ASSIGNMENT_CREATOR";

    if (signupData.password !== signupData.confirmPassword) {
      setIsLoading(false);
      toast.error("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    Object.entries(signupData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    formData.append("userType", userType);

    if (profilePicture) {
      formData.append("profileImage", profilePicture);
    } else if (defaultPicture) {
      formData.append("profileImage", defaultPicture);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Signup successful! Please verify your email and log in");
        clearForm();
        setTimeout(() => {
          toggleModal();
        }, 400);
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity()) {
        const submitEvent = new Event("submit", { bubbles: true });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div
        id="signup-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold">Sign up</h3>
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
            <div className="p-4 md:p-5">
              {isTeacherSignup === null ? (
                <div>
                  <button
                    className="w-full bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
                    onClick={() => setIsTeacherSignup(true)}
                  >
                    Sign up as Doer
                  </button>
                  <button
                    className="w-full mt-2 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
                    onClick={() => setIsTeacherSignup(false)}
                  >
                    Sign up as Creator
                  </button>
                  <div className="mt-5">
                    <div className="flex flex-row">
                      Already have an account?
                      <button
                        className="primary-orange"
                        onClick={() => {
                          toggleModal();
                          toggleLoginModal();
                        }}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => handleSignupSubmit(e, isTeacherSignup)}
                  onKeyDown={handleKeyDown}
                >
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => {
                      setIsTeacherSignup(null);
                      clearForm();
                    }}
                  >
                    &larr; Back
                  </button>

                  <div className="mb-4">
                    {(profilePicture || defaultPicture) && (
                      <div className="mt-2 flex justify-center items-center ">
                        <img
                          src={
                            profilePicture
                              ? URL.createObjectURL(profilePicture)
                              : defaultPicture!
                          }
                          alt="Selected profile"
                          className="w-24 h-24 object-cover rounded-full"
                        />
                      </div>
                    )}
                    <label className="mt-1 flex justify-center items-center text-sm font-medium text-gray-700">
                      Choose Profile Picture
                    </label>
                    <div className="mt-1 flex items-center space-x-4 overflow-x-auto">
                      {defaultPictures.map((pic, index) => (
                        <img
                          key={index}
                          src={pic}
                          alt={`Default ${index + 1}`}
                          className={`w-12 h-12 rounded-full cursor-pointer ${
                            defaultPicture === pic
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => handleDefaultPictureSelect(pic)}
                        />
                      ))}
                    </div>
                    <div className="flex justify-center items-center mt-1">
                      or
                    </div>
                    <label className="flex w-full justify-center items-center bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 mt-1">
                      Upload
                      <input
                        type="file"
                        className="hidden "
                        accept="image/*"
                        onChange={handlePictureUpload}
                      />
                    </label>
                  </div>
                  {[
                    {
                      name: "name",
                      type: "text",
                      placeholder: "Full Name",
                      required: true,
                    },
                    {
                      name: "email",
                      type: "email",
                      placeholder: "Email Address",
                      required: true,
                    },
                    {
                      name: "address",
                      type: "text",
                      placeholder: "Address",
                      required: false,
                    }, // Address is optional
                    {
                      name: "phone",
                      type: "tel",
                      placeholder: "Phone Number",
                      required: true,
                    },
                    {
                      name: "password",
                      type: "password",
                      placeholder: "Password",
                      required: true,
                    },
                    {
                      name: "confirmPassword",
                      type: "password",
                      placeholder: "Confirm Password",
                      required: true,
                    },
                  ].map((field) => (
                    <div key={field.name} className="relative cb-shadow">
                      <input
                        type={field.type}
                        name={field.name}
                        id={`signup-${field.name}`}
                        value={
                          isTeacherSignup
                            ? teacherSignupData[field.name as keyof SignupData]
                            : studentSignupData[field.name as keyof SignupData]
                        }
                        onChange={(e) => handleSignupChange(e, isTeacherSignup)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
                        placeholder={field.placeholder}
                        required={field.required} // Dynamically set required attribute
                      />
                      {field.name === "email" && (
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <i className="fa-regular fa-envelope text-gray-400"></i>
                        </span>
                      )}
                    </div>
                  ))}

                  <div className="relative flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="signup-agree"
                      required
                      checked={agree}
                      onChange={() => setAgree(!agree)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="signup-agree"
                      className="ml-2 text-sm flex flex-row font-medium text-gray-900 dark:text-gray-300"
                    >
                      I agree to{" "}
                      <Link
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/homepage/termsandconditions`}
                      >
                        <div className="text-blue-500">
                          Terms and Conditions
                        </div>
                      </Link>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
                  >
                    {isLoading
                      ? "Signing Up..."
                      : `Sign Up as ${isTeacherSignup ? "DOER" : "CREATOR"}`}
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
