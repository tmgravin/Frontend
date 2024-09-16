"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import UserModal from "../usermodal/UserModal";
import CustomTabModal from "./YourAssignments"; // Adjust the import path if needed
import Image from "next/image";
const Header: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isCustomTabModalOpen, setCustomTabModalOpen] = useState(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [teacherSignupData, setTeacherSignupData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [studentSignupData, setStudentSignupData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [remember, setRemember] = useState(false);

  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
  const toggleSignupModal = () => setSignupModalOpen(!isSignupModalOpen);
  const toggleCustomTabModal = () =>
    setCustomTabModalOpen(!isCustomTabModalOpen);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleSignupChange = (
    e: ChangeEvent<HTMLInputElement>,
    isTeacher: boolean
  ) => {
    const { name, value } = e.target;
    if (isTeacher) {
      setTeacherSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setStudentSignupData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignupSubmit = (
    e: FormEvent<HTMLFormElement>,
    isTeacher: boolean
  ) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <header className="p-1">
      <div className=" sm:flex sm:flex-row sm:justify-between">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <Image
                src="/notextlogo.png" // Path relative to the public directory
                alt="logo"
                width={50} // Provide appropriate width
                height={50} // Provide appropriate height
              />
              <div className="mt-4 px-3">
                <h1 className="text-xs font-bold sm:text-2xl text-orange-600">
                  MSP ACADEMY
                </h1>
              </div>
            </div>
            <div className="sm:hidden">
              <UserModal />
            </div>
          </div>
          <div
            className="px-3 py-2 flex flex-row text-center cursor-pointer sm:ml-4 justify-center items-center"
            onClick={toggleCustomTabModal}
          >
            <div className="p-1"> Your Projects</div>
            <Image
              src="/pngs/arrowdown.svg" // Path relative to the public directory
              alt="arrowdown"
              width={20} // Provide appropriate width
              height={20} // Provide appropriate height
            />
          </div>
        </div>

        <div className="hidden sm:block">
          <UserModal />
        </div>
      </div>

      {/* Backdrop Overlay with Blur */}
      {(isSignupModalOpen || isLoginModalOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          aria-hidden="true"
        ></div>
      )}

      {/* Render CustomTabModal */}
      {isCustomTabModalOpen && (
        <CustomTabModal onClose={toggleCustomTabModal} />
      )}
    </header>
  );
};

export default Header;
