import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import Link from "next/link";
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

interface SignupData {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree?: boolean;
}

const Header: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [teacherSignupData, setTeacherSignupData] = useState<SignupData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [studentSignupData, setStudentSignupData] = useState<SignupData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setDropdownOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setDropdownOpen(false);
  };

  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
    if (isSignupModalOpen) {
      setSignupModalOpen(false);
    }
  };

  const toggleSignupModal = () => {
    setSignupModalOpen(!isSignupModalOpen);
    if (isLoginModalOpen) {
      setLoginModalOpen(false);
    }
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleSignupSubmit = async (
    e: FormEvent<HTMLFormElement>,
    isTeacher: boolean
  ) => {
    e.preventDefault();
    const signupData = isTeacher ? teacherSignupData : studentSignupData;
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("/api/signup", signupData);
      if (response.status === 200) {
        alert("Signup successful!");
        toggleSignupModal();
        toggleLoginModal(); // Open login modal after successful signup
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <header>
      <div className="flex flex-row sm:flex-row justify-between items-center px-2 py-1 bg-transparent">
        <div className="flex justify-evenly flex-row">
          <div className="flex items-center mr-10">
            <Image
              src="/notextlogo.png"
              height={50}
              width={50}
              alt="msp logo"
            />
            <div className="mt-4 px-3">
              <h1 className="text-xs font-bold sm:text-2xl text-orange-600">
                MSP ACADEMY
              </h1>
            </div>
          </div>
          <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/ebooks`}>
            <div className="flex items-center text-white justify-center pt-4 hover:underline ">
              <i className="fas fa-book mr-2"></i>{" "}
              {/* Example icon, ensure you have Font Awesome or another icon library */}
              <span className="text-lg font-semibold">E-Books</span>
            </div>
          </Link>
        </div>

        {/* Dropdown menu for small screens */}
        <div className="block sm:hidden">
          <IconButton onClick={handleMenuOpen} className="primary-orange">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isDropdownOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                width: 140,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                toggleSignupModal();
              }}
            >
              <div className="primary-orangebg text-white rounded-sm p-2 ">
                Sign up <EditIcon style={{ marginLeft: 8 }} />
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                toggleLoginModal();
              }}
            >
              <div className="primary-orangebg text-white rounded-sm py-2 px-4 ">
                {" "}
                Login <LoginIcon style={{ marginLeft: 8 }} />
              </div>
            </MenuItem>
          </Menu>
        </div>
        {/* Desktop menu items */}
        <div className="hidden sm:flex flex-row sm:flex-row space-x-4">
          <button
            className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
            onClick={toggleSignupModal}
          >
            Signup
          </button>
          <button
            className="bg-orange-500 rounded-sm px-5 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
            onClick={toggleLoginModal}
          >
            Login
          </button>{" "}
        </div>
      </div>

      {(isSignupModalOpen || isLoginModalOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          aria-hidden="true"
        ></div>
      )}

      <SignupModal
        isOpen={isSignupModalOpen}
        toggleModal={toggleSignupModal}
        toggleLoginModal={toggleLoginModal}
        isTeacherSignup={isTeacherSignup}
        setIsTeacherSignup={setIsTeacherSignup}
        teacherSignupData={teacherSignupData}
        studentSignupData={studentSignupData}
        handleSignupChange={handleSignupChange}
        agree={agree}
        setAgree={setAgree}
      />

      <LoginModal
        toggleSignupModal={toggleSignupModal}
        isOpen={isLoginModalOpen}
        toggleModal={toggleLoginModal}
        loginData={loginData}
        handleLoginChange={handleLoginChange}
      />
    </header>
  );
};

export default Header;
