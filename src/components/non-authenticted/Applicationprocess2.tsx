import React from 'react';
import Image from 'next/image';


function ApplicationProcess2() {
  return (
    <div className='cb-shadow applicationprocess2-bgcolor'>
      <div className='primary-orange flex justify-center items-center font-bold'>
        Jump Start Your Freelance Jobs
      </div>
      <div className=''>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col items-center'>
            <div className='text-3xl'><Image
          src="/pngs/profile.svg"
          alt="Example SVG Image"
          width={50}
          height={30}
        /></div>
            <div>1. Register yourself</div>
            <div>Fill in your details and qualification, and sahre the skills in which you are proficient</div>
          </div>

          <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 24" strokeWidth={2} stroke="currentColor" className="w-24 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M26 5l15 7-15 7M41 12H3" />
            </svg>
          </div>

          <div className='flex flex-col items-center'>
            <div className='text-3xl'><Image
          src="/pngs/cv.svg"
          alt="Example SVG Image"
          width={50}
          height={30}
        /></div>
            <div>2. Get hired</div>
            <div> Get the most suited job for your skills</div>
          </div>

          <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 24" strokeWidth={2} stroke="currentColor" className="w-24 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M26 5l15 7-15 7M41 12H3" />
            </svg>
          </div>

          <div className='flex flex-col items-center'>
            <div className='text-3xl'><div>   <Image
          src="/pngs/payment.svg"
          alt="Example SVG Image"
          width={50}
          height={30}
        /></div></div>
            <div>3.Earn oney with secure payment</div>
            <div className='text-center'>Choose from several freelance jobs methods with Safepay payment protection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationProcess2;
