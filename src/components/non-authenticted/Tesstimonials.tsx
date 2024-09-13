"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  message: string;
  imageUrl: string;
}

const TestimonialShowcase: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get<Testimonial[]>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonial/`
        );
        setTestimonials(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-10">
        No testimonials available at the moment.
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bold text-2xl text-gray-900 text-center mb-8">
          What Our Clients Say
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true, el: ".custom-pagination" }} // Use custom pagination element
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="primary-orangebg  text-white rounded-lg shadow-lg p-6 h-64 flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold ">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm ">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className=" flex-grow">{testimonial.message}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-4 flex justify-center"></div>{" "}
        {/* Custom pagination container */}
      </div>
    </section>
  );
};

export default TestimonialShowcase;
