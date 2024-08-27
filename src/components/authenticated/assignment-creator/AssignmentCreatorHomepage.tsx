"use client";

import React from "react";
import Header from "./Header";
import LatestProjects from "./LatestProjects";
import Applicationprocess2 from "./Applicationprocess2";
import WorkYourWay from "@/components/non-authenticted/WorkYourWay";
import Footer from "@/components/non-authenticted/footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProjectProvider } from "@/components/providers/ProjectProvider";

function Homepage() {
  const [backgroundImage, setBackgroundImage] = useState<string | null | []>();
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/creator`,
          {
            withCredentials: true,
          }
        ); // Replace with your API endpoint

        setBackgroundImage(response.data); // Assuming the API returns an object with `imageUrl` property
        console.log(response.data);
        if (response.data) {
          const image = response.data;
          const img: any = image[image.length - 1];
          console.log(img);
          setBackgroundImage(img); // Adjust based on your response structure
        }
        console.log(backgroundImage);
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBackgroundImage();
  }, [backgroundImage]);
  return (
    <ProjectProvider>
      <div className="w-full h-full">
        <Header />

        <div
          className="homepage-bg w-full pb-10 homepage-bg h-full px-2 flex flex-1 flex-col justify-center items-start lg:h-screen lg:p-2"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-3xl text-white lg:w-1/2 pt-10">
            Your Expert Partner in Academic Excellence
          </div>
          <div className="text-white py-2">
            Achieve your academic goals by delivering professionally written
            assignments across a wide range of subjects.
          </div>
          <div>
            <form className="flex items-center w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-sm   w-full md:w-[500px] px-4 pr-10 p-2.5"
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
                <span className="sr-only ">Search</span>
              </button>
            </form>
          </div>
          <div className="text-white py-2">
            Academic writing | VC/Resume Writing | Copywriting
          </div>
          <button className="primary-orangebg text-white rounded-lg w-32 p-1 pb-">
            Get Started
          </button>
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
