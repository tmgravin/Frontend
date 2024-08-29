"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Projects from "./Projects";
import Applicationprocess from "../../non-authenticted/Applicationprocess";
import Applicationprocess2 from "./Applicationprocess2";
import WorkYourWay from "@/components/non-authenticted/WorkYourWay";
import Footer from "@/components/non-authenticted/footer/Footer";
import axios from "axios";

function Homepage() {
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/doer`,
          {
            withCredentials: true,
          }
        );
        // Assuming the response data is an array of image URLs
        setBackgroundImages(response.data);
      } catch (error) {
        console.error("Error fetching background images:", error);
      }
    };

    fetchBackgroundImages();
  }, []);

  useEffect(() => {
    if (backgroundImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change the image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [backgroundImages]);

  const currentBackgroundImage =
    backgroundImages.length > 0
      ? backgroundImages[currentImageIndex]
      : "default_image_url"; // Replace with a default image URL if needed

  return (
    <div className="w-full h-full">
      <Header />

      <div
        className="relative w-full h-screen flex flex-col justify-center items-start lg:h-screen lg:p-2 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentBackgroundImage})`,
        }}
      >
        <div className="text-3xl text-white lg:w-1/2 pt-10">
          Academic Success, One Assignment at a Time
        </div>
        <div className="text-white py-2">
          Achieve academic excellence with our dedicated assignment services.
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
          Academic writing | VC/Resume Writing | Copywriting
        </div>
        <button className="primary-orangebg text-white rounded-lg w-32 p-1">
          Get Started
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
      </div>

      <div>
        <Projects />
      </div>

      <div>
        <Applicationprocess />
        <Applicationprocess2 />
      </div>

      <div>
        <WorkYourWay />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
