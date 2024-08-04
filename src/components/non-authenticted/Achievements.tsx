import React from 'react';
import Image from 'next/image';

export default function Achievements() {
  return (
    <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      <div className='flex flex-row items-center p-2'>
        <div>
          <Image
            src="/pngs/rocket.svg"
            alt="rocket indicating growing image"
            width={50}
            height={50}
          />
        </div>
        <div className='ml-3'>
          <div className='font-bold text-xl'>100+</div>
          <div>Ongoing Projects</div>
        </div>
      </div>

      <div className='flex flex-row items-center p-2'>
        <div>
          <Image
            src="/pngs/freelancers.svg"
            alt="freelancers icon"
            width={50}
            height={30}
          />
        </div>
        <div className='ml-3'>
          <div className='font-bold text-xl'>100+</div>
          <div>Live Freelancers</div>
        </div>
      </div>

      <div className='flex flex-row items-center p-2'>
        <div>
          <Image
            src="/pngs/paid.svg"
            alt="paying icon"
            width={50}
            height={30}
          />
        </div>
        <div className='ml-3'>
          <div className='font-bold text-xl'>$100</div>
          <div>Paid to Freelancers</div>
        </div>
      </div>

      <div className='flex flex-row items-center p-2'>
        <div>
          <Image
            src="/pngs/Loyalty_customer.svg"
            alt="customer icon"
            width={50}
            height={30}
          />
        </div>
        <div className='ml-3'>
          <div className='font-bold text-xl'>100%</div>
          <div>Customer Satisfaction</div>
        </div>
      </div>
    </div>
  );
}
