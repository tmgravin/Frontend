"use client";
import React from "react";
import Footer from "../footer/Footer";
import { useRouter } from "next/navigation";
import Header from "../ebook/Header";

function AboutUs() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  return (
    <div>
      <Header />

      <div className=" mx-2 pt-4">
        {/*    <button
          onClick={handleBackClick}
          className="m-2 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
        >
          Back
        </button> */}
        {/* AboutUs */}
        <div className="flex flex-row justify-between  ">
          <div className="mr-10 w-[15vw] text-gray-700">
            <div className="font-bold text-black">
              {" "}
              We build bridges between{" "}
            </div>
            Students and Teachers
          </div>
          <div className="ml-10 w-[40vw] ">
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum.
          </div>
        </div>
        <div className="h-full w-full overflow-hidden flex items-center justify-center">
          <img
            src="/aboutus/aboutus1.png"
            alt="About Us"
            className="object-fill w-full h-full"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full  pt-5">
          {/* Text Section */}
          <div className="w-full md:w-1/2 p-4 flex flex-col">
            <div className="text-3xl font-bold underline mb-4">About Us</div>
            <p>
              Rabin Tamang Rabin Tamang Rabin Tamang Rabin Tamang
            </p>
          </div>

          {/* Image Section */}
          <div className=" w-full md:w-1/2">
            <img
              src="/aboutus/aboutus2.png"
              alt="About Us"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row justify-evenly items-center space-x-3">
          <div className="max-w-md ">
            <div className="bg-white p-4 rounded-t-3xl">
              <h2 className="text-2xl font-bold text-center underline">
                Mission
              </h2>
            </div>
            <div className="bg-orange-500 p-2 pb-6 rounded-t-3xl rounded-tr-3xl rounded-br-[2.5rem] -mt-3">
              <div className="bg-[#1a1a4b] text-white p-6 rounded-t-3xl ">
                <p className="text-center text-lg">
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-md ">
            <div className="bg-white p-4 rounded-t-3xl">
              <h2 className="text-2xl font-bold text-center underline">
                Vision
              </h2>
            </div>
            <div className="bg-orange-500 p-2 pb-6 rounded-t-3xl rounded-tr-3xl rounded-br-[2.5rem] -mt-3">
              <div className="bg-[#1a1a4b] text-white p-6 rounded-t-3xl ">
                <p className="text-center text-lg">
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-md">
            <div className="bg-white p-4 rounded-t-3xl">
              <h2 className="text-2xl font-bold text-center underline">
                Our Philosophy
              </h2>
            </div>
            <div className="bg-orange-500 p-2 pb-6 rounded-t-3xl rounded-tr-3xl rounded-br-[2.5rem] -mt-3">
              <div className="bg-[#1a1a4b] text-white p-6 rounded-t-3xl ">
                <p className="text-center text-lg">
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
