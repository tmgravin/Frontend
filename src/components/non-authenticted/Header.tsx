import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import { Menu, MenuItem, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon, Login as LoginIcon, Edit as EditIcon } from '@mui/icons-material';

interface SignupData {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
  remember?: boolean;
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
  const [remember, setRemember] = useState(false);
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
      const response = await axios.post('/api/signup', signupData);
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
      <ToastContainer />
      <div className="flex flex-row sm:flex-row justify-between items-center px-2 py-1">
        <div className="flex items-center">
          <Image
            src="/notextlogo.png"
            height={50}
            width={50}
            alt="msp logo"
          />
          <h1 className="text-xl sm:text-2xl font-bold potta-font primary-navy-blue"> MSP ACADEMY</h1>
        </div>

        
        {/* Dropdown menu for small screens */}
        <div className="block sm:hidden">
          <IconButton onClick={handleMenuOpen} color="primary">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isDropdownOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                width: 200,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                toggleSignupModal();
              }}
            >
              Sign up <EditIcon style={{ marginLeft: 8 }} />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                toggleLoginModal();
              }}
            >
              Login <LoginIcon style={{ marginLeft: 8 }} />
            </MenuItem>
          </Menu>
        </div>
        {/* Desktop menu items */}
        <div className="hidden sm:flex flex-row sm:flex-row space-x-4">
          <Button
            variant="contained"
          className="primary-orangebg"
            onClick={toggleSignupModal}
          >
            Sign up <EditIcon style={{ marginLeft: 8 }} />
          </Button>
          <Button
            variant="contained"
           className="primary-orangebg"
            onClick={toggleLoginModal}
          >
            Login <LoginIcon style={{ marginLeft: 8 }} />
          </Button>
        </div>
      </div>

      {(isSignupModalOpen || isLoginModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
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
        remember={remember}
        setRemember={setRemember}
      />

      <LoginModal
        toggleSignupModal={toggleSignupModal}
        isOpen={isLoginModalOpen}
        toggleModal={toggleLoginModal}
        loginData={loginData}
        handleLoginChange={handleLoginChange}
        remember={remember}
        setRemember={setRemember}
      />
    </header>
  );
};

export default Header;
