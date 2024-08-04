"use client"

import React, { useState } from 'react';
import Header from './Header';
import Achievements from './Achievements';
import LatestProjects from './LatestProjects';
import Applicationprocess from './Applicationprocess';
import Applicationprocess2 from './Applicationprocess2';
import Whyus from './Whyus'; // Import Whyus
import WorkYourWay from './WorkYourWay';
import Footer from './Footer';
import SignupModal from './SignupModal'; // Import SignupModal

const Homepage: React.FC = () => {
  // State to manage the visibility of the SignupModal
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
    <div className=''>
      <Header />
      <div className='homepage-bg w-full h-screen px-2 flex flex-1 flex-col justify-center items-start'>
        <div className='w-1/2 text-3xl text-white'>
          Get Freelancing Jobs Instantly Start Working for Yourself!
        </div>
        <div className='text-white'>
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
            <button type="submit" className="p-2.5 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 rounded-r-sm focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className='text-white'>Academic writing | VC/Resume Writing | Copywriting</div>
        <button onClick={toggleSignupModal} className='bg-white text-black rounded-lg w-32 p-1'>
          Get Started
        </button>
      </div>
      <Achievements />
      <LatestProjects />
      <Whyus onGetStartedClick={toggleSignupModal} /> {/* Pass the handler to Whyus */}
      <Applicationprocess />
      <Applicationprocess2 />
      <div className='flex justify-center items-center pt-10'>
        <button onClick={toggleSignupModal} className="primary-btn-blue hover:primary-btn-blue text-white font-bold py-2 px-4 rounded">
          START REGISTRATION
        </button>
      </div>
      <WorkYourWay />
      <Footer />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        toggleModal={toggleSignupModal}
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
