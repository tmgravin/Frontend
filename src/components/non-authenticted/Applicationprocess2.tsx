import React from "react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  startRegistration: () => void;
}

function ApplicationProcess2({ startRegistration }: any) {
  return (
    <div className="cb-shadow applicationprocess2-bgcolor pb-10">
      <div className=" py-10 relative">
        <div className="primary-orange flex justify-center items-center font-bold pt-6">
          Jump Start Your Freelance Jobs
        </div>

        {/* Swiper Container */}
        <div className="pt-6 relative">
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination", // Target custom pagination
            }}
            breakpoints={{
              768: {
                slidesPerView: 3, // Show 3 slides at once on larger screens
                spaceBetween: 30,
              },
            }}
          >
            {/* First Slide */}
            <SwiperSlide>
              <div className="flex flex-col items-center">
                <Image
                  src="/pngs/profile.svg"
                  alt="Profile Icon"
                  width={50}
                  height={30}
                />
                <div className="font-bold p-3 text-center">
                  1. Register yourself
                </div>
                <div className="text-center">
                  Fill in your details and qualifications, and share the skills
                  in which you are proficient.
                </div>
              </div>
            </SwiperSlide>

            {/* Second Slide */}
            <SwiperSlide>
              <div className="flex flex-col items-center">
                <Image
                  src="/pngs/cv.svg"
                  alt="CV Icon"
                  width={50}
                  height={30}
                />
                <div className="font-bold p-3 text-center">2. Get hired</div>
                <div className="text-center">
                  Get the most suited job for your skills.
                </div>
              </div>
            </SwiperSlide>

            {/* Third Slide */}
            <SwiperSlide>
              <div className="flex flex-col items-center">
                <Image
                  src="/pngs/payment.svg"
                  alt="Payment Icon"
                  width={50}
                  height={30}
                />
                <div className="font-bold p-3 text-center">
                  3. Earn money with secure payment
                </div>
                <div className="text-center">
                  Choose from several freelance job methods with Safepay payment
                  protection.
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Custom Swiper Pagination - Outside the Box */}
        <div className="custom-swiper-pagination absolute bottom-[-30px] left-0 right-0 flex justify-center"></div>
      </div>

      <div className="flex justify-center items-center pt-10">
        <button
          onClick={startRegistration}
          className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
        >
          START REGISTRATION
        </button>
      </div>
    </div>
  );
}

export default ApplicationProcess2;
