"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import LatestProjects from "./LatestProjects";
import Applicationprocess2 from "./Applicationprocess2";
import WorkYourWay from "@/components/non-authenticted/WorkYourWay";
import Footer from "@/components/non-authenticted/footer/Footer";
import axios from "axios";
import { ProjectProvider } from "@/components/providers/ProjectProvider";
import { Search } from "lucide-react";
import Searchbar from "./search/Searchbar";
import { getUserFromCookies } from "@/components/auth/oldtoken";
const cookieuser = getUserFromCookies();

function Homepage() {
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/creator`,
          {
            headers: {
              Authorization: `Bearer ${cookieuser?.token}`,
            },
            withCredentials: true,
          }
        );

        setBackgroundImages(response.data); // Assuming response.data is an array of image URLs
        if (response.data.length > 0) {
          setCurrentImageIndex(0); // Set initial index
        }
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
      }, 3000); // Change the image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [backgroundImages]);

  const currentBackgroundImage =
    backgroundImages.length > 0
      ? backgroundImages[currentImageIndex]
      : "default_image_url"; // Replace with a default image URL if needed

  return (
    <ProjectProvider>
      <div className="w-full h-full">
        <Header />

        <div className="relative overflow-hidden h-full ">
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
                  index === currentImageIndex
                    ? "primary-orangebg"
                    : "bg-gray-400"
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 px-2 flex flex-col justify-center items-start lg:p-2  lg:pl-4">
            <div className="text-3xl text-white lg:w-1/2 pt-10">
              Get Freelancing Jobs Instantly Start Working for Yourself!
            </div>
            <div className="text-white py-2">
              Work with the best freelance talent from around the world on our
              secure, flexible, and cost-effective platform
            </div>
            <div>
              {/*   <form className="flex items-center w-full">
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
              </form> */}
              <Searchbar />
            </div>
            <div className="text-white py-2">
              Academic writing | CV/Resume Writing | Copywriting
            </div>
            <button className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>

        <div>
          <LatestProjects />
        </div>
        <div></div>

        <div>
          <Applicationprocess2 />
        </div>

        <div>
          <WorkYourWay />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </ProjectProvider>
  );
}

export default Homepage;
