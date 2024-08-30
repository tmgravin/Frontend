"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Achievements from "./Achievements";
import LatestProjects from "./LatestProjects";
import Applicationprocess from "./Applicationprocess";
import Applicationprocess2 from "./Applicationprocess2";
import Whyus from "./Whyus";
import WorkYourWay from "./WorkYourWay";
import Footer from "./footer/Footer";
import SignupModal from "./SignupModal";
import { ToastContainer } from "react-toastify";
import FQA from "./footer/FQA";
import Tesstimonials from "./Tesstimonials";

const Homepage: React.FC = () => {
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isTeacherSignup, setIsTeacherSignup] = useState<boolean | null>(null);
  const [teacherSignupData, setTeacherSignupData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [studentSignupData, setStudentSignupData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/general`,
          {
            withCredentials: true,
          }
        );

        if (response.data) {
          setBackgroundImages(response.data);
        }
      } catch (error) {
        console.error("Error fetching background images:", error);
      }
    };

    fetchBackgroundImages();
  }, []);

  // Effect to update current image index at intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Adjust the interval time to control the speed of the sliding effect

    return () => clearInterval(intervalId);
  }, [backgroundImages.length]);

  const toggleSignupModal = () => {
    setSignupModalOpen(!isSignupModalOpen);
  };

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

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative w-full  sm:h-screen">
      <ToastContainer />
      <Header />
      <div className="relative overflow-hidden h-full">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * 100}vw)`, // Move by 100vw to slide one image at a time
          }}
        >
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="w-screen h-screen flex-shrink-0" // Ensures each image takes the full width of the screen
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? "primary-orangebg" : "bg-gray-400"
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="absolute inset-0 px-2 flex flex-col justify-center items-start lg:p-2">
          <div className="text-3xl text-white lg:w-1/2 pt-10">
            Get Freelancing Jobs Instantly Start Working for Yourself!
          </div>
          <div className="text-white py-2">
            Work with the best freelance talent from around the world on our
            secure, flexible, and cost-effective platform
          </div>
          <div>
            <form className="flex items-center w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-sm w-full md:w-[500px] px-4 pr-10 p-2.5"
                  placeholder="What skills are you searching for?"
                  required
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                </div>
              </div>

              <button
                type="submit"
                className="p-2.5 text-sm font-medium text-white primary-orangebg focus:ring-4 rounded-r-sm focus:outline-none focus:ring-blue-300"
              >
                Search
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
          <div className="text-white py-2">
            Academic writing | CV/Resume Writing | Copywriting
          </div>
          <button
            onClick={toggleSignupModal}
            className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
      <Achievements />
      <LatestProjects />
      <Whyus onGetStartedClick={toggleSignupModal} />
      <Applicationprocess />
      {/* <Tesstimonials /> */}
      <Applicationprocess2 startRegistration={toggleSignupModal} />
      <WorkYourWay />
      <FQA />
      <Footer />
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}
      <SignupModal
        isOpen={isSignupModalOpen}
        toggleModal={toggleSignupModal}
        isTeacherSignup={isTeacherSignup}
        setIsTeacherSignup={setIsTeacherSignup}
        teacherSignupData={teacherSignupData}
        studentSignupData={studentSignupData}
        handleSignupChange={handleSignupChange}
        agree={agree}
        setAgree={setAgree}
      />
    </div>
  );
};

export default Homepage;
