import React from 'react';
import Image from 'next/image';
import { useTheme, useMediaQuery } from '@mui/material';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const AchievementItem = ({ imgSrc, title, subtitle, isFirst }: { imgSrc: string, title: string, subtitle: string, isFirst?: boolean }) => (
  <div className='flex flex-col items-center p-2'>
    <div>
      <Image
        src={imgSrc}
        alt={title}
        width={isFirst ? 30 : 50} // Make the first image smaller
        height={isFirst ? 30 : 50} // Make the first image smaller
      />
    </div>
    <div className='ml-3 text-center'>
      <div className='font-bold text-xl'>{title}</div>
      <div>{subtitle}</div>
    </div>
  </div>
);

export default function Achievements() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className='p-4'>
      {isSmallScreen ? (
        <Swiper
          modules={[Pagination]} // Only include Pagination module
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
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
              isFirst={true} // Set to true for the first image
            />
          </SwiperSlide>
          <SwiperSlide>
            <AchievementItem
              imgSrc="/pngs/freelancers.svg"
              title="100+"
              subtitle="Live Freelancers"
            />
          </SwiperSlide>
          <SwiperSlide>
            <AchievementItem
              imgSrc="/pngs/paid.svg"
              title="$100"
              subtitle="Paid to Freelancers"
            />
          </SwiperSlide>
          <SwiperSlide>
            <AchievementItem
              imgSrc="/pngs/Loyalty_customer.svg"
              title="100%"
              subtitle="Customer Satisfaction"
            />
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <AchievementItem
            imgSrc="/pngs/rocket.svg"
            title="100+"
            subtitle="Ongoing Projects"
            isFirst={true} // Set to true for the first image
          />
          <AchievementItem
            imgSrc="/pngs/freelancers.svg"
            title="100+"
            subtitle="Live Freelancers"
          />
          <AchievementItem
            imgSrc="/pngs/paid.svg"
            title="$100"
            subtitle="Paid to Freelancers"
          />
          <AchievementItem
            imgSrc="/pngs/Loyalty_customer.svg"
            title="100%"
            subtitle="Customer Satisfaction"
          />
        </div>
      )}
    </div>
  );
}
