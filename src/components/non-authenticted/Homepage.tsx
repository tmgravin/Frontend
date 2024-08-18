// Homepage.tsx

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Achievements from './Achievements';
import LatestProjects from './LatestProjects';
import Applicationprocess from './Applicationprocess';
import Applicationprocess2 from './Applicationprocess2';
import Whyus from './Whyus'; // Import Whyus
import WorkYourWay from './WorkYourWay';
import Footer from './Footer';
import SignupModal from './SignupModal'; // Import SignupModal
import { ToastContainer } from 'react-toastify';

const Homepage: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null | []>(null);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null);
  const [teacherSignupData, setTeacherSignupData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [studentSignupData, setStudentSignupData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/general`, {
          withCredentials: true
        });

        if (response.data) {
          const image = response.data;
          const img: any = image[image.length - 1];
          setBackgroundImage(img); // Adjust based on your response structure
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  // Function to toggle the SignupModal
  const toggleSignupModal = () => {
    setSignupModalOpen(!isSignupModalOpen);
  };

  // Function to handle changes in the input fields
  const handleSignupChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isTeacher: boolean
  ) => {
    const { name, value } = e.target;
    if (isTeacher) {
      setTeacherSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setStudentSignupData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="relative">
      <ToastContainer />
      <Header />
      <div
        className="homepage-bg w-full pb-10 homepage-bg h-full px-2 flex flex-1 flex-col justify-center items-start lg:h-screen lg:p-2"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="text-3xl text-white lg:w-1/2 pt-10">
          Get Freelancing Jobs Instantly Start Working for Yourself!
        </div>
        <div className="text-white py-2">
          Work with the best freelance talent from around the world on our secure, flexible, and cost-effective platform
        </div>
        <div>
          <form className="flex items-center max-w-sm mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-sm focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
                placeholder="What skills are you searching for?"
                required
              />
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
              </div>
            </div>
            <button type="submit" className="p-2.5 text-sm font-medium text-white primary-orangebg focus:ring-4 rounded-r-sm focus:outline-none focus:ring-blue-300">
              Search
              <span className="sr-only ">Search</span>
            </button>
          </form>
        </div>
        <div className="text-white py-2">Academic writing | VC/Resume Writing | Copywriting</div>
        <button onClick={toggleSignupModal} className="primary-orangebg text-white rounded-lg w-32 p-1 pb-">
          Get Started
        </button>
      </div>
      <Achievements />
      <LatestProjects />
      <Whyus onGetStartedClick={toggleSignupModal} /> {/* Pass the handler to Whyus */}
      <Applicationprocess />
      <Applicationprocess2 />
      <div className="flex justify-center items-center pt-10">
        <button onClick={toggleSignupModal} className="primary-btn-blue hover:primary-btn-blue text-white font-bold py-2 px-4 rounded">
          START REGISTRATION
        </button>
      </div>
      <WorkYourWay />
      <Footer />

      {/* Backdrop filter */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}

      {/* Include SignupModal here */}
      <SignupModal
        isOpen={isSignupModalOpen}
        toggleModal={toggleSignupModal} // Change prop name to match SignupModal's expected prop
        isTeacherSignup={isTeacherSignup}
        setIsTeacherSignup={setIsTeacherSignup}
        teacherSignupData={teacherSignupData}
        studentSignupData={studentSignupData}
        handleSignupChange={handleSignupChange}
        remember={remember}
        setRemember={setRemember}
      />
    </div>
  );
};

export default Homepage;
