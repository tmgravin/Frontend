import React from "react";
import Image from "next/image";
import { useTheme, useMediaQuery } from "@mui/material";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Acheivements.css";
const AchievementItem = ({
  imgSrc,
  title,
  subtitle,
  imgWidth,
  imgHeight,
}: {
  imgSrc: string;
  title: string;
  subtitle: string;
  imgWidth?: number;
  imgHeight?: number;
}) => (
  <div className="flex flex-col items-center p-2">
    <div>
      <Image
        src={imgSrc}
        alt={title}
        width={imgWidth || 50} // Use the provided width or default to 50
        height={imgHeight || 50} // Use the provided height or default to 50
      />
    </div>
    <div className="ml-3 text-center">
      <div className="font-bold text-xl">{title}</div>
      <div>{subtitle}</div>
    </div>
  </div>
);

export default function Achievements() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="p-4">
      {isSmallScreen ? (
        <Swiper
          modules={[Pagination]} // Only include Pagination module
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="swiper-pagination-below" // Add custom class for Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <AchievementItem
              imgSrc="/pngs/rocket.svg"
              title="100+"
              subtitle="Ongoing Projects"
              imgWidth={40} // Set specific width
              imgHeight={40} // Set specific height
            />
          </SwiperSlide>
          <SwiperSlide>
            <AchievementItem
              imgSrc="/pngs/freelancers.svg"
              title="100+"
              subtitle="Live Freelancers"
              imgWidth={66}
              imgHeight={66}
            />
          </SwiperSlide>
          <SwiperSlide>
            <AchievementItem
              imgSrc="/pngs/paid.svg"
              title="$100"
              subtitle="Paid to Freelancers"
              imgWidth={50}
              imgHeight={50}
            />
          </SwiperSlide>
          <SwiperSlide>
            <AchievementItem
              imgSrc="/pngs/Loyalty_customer.svg"
              title="100%"
              subtitle="Customer Satisfaction"
              imgWidth={53}
              imgHeight={53}
            />
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AchievementItem
            imgSrc="/pngs/rocket.svg"
            title="100+"
            subtitle="Ongoing Projects"
            imgWidth={40} // Set specific width
            imgHeight={40} // Set specific height
          />
          <AchievementItem
            imgSrc="/pngs/freelancers.svg"
            title="100+"
            subtitle="Live Freelancers"
            imgWidth={66}
            imgHeight={66}
          />
          <AchievementItem
            imgSrc="/pngs/paid.svg"
            title="$100"
            subtitle="Paid to Freelancers"
            imgWidth={50}
            imgHeight={50}
          />
          <AchievementItem
            imgSrc="/pngs/Loyalty_customer.svg"
            title="100%"
            subtitle="Customer Satisfaction"
            imgWidth={53}
            imgHeight={53}
          />
        </div>
      )}
    </div>
  );
}
