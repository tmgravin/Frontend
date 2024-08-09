import React from 'react'
import Image from 'next/image'

function WorkYourWay() {
  return (
    <div className='pt-6'>

      <div className='flex items-center justify-center primary-green font-bold text-2xl'>
        Work Your Way
      </div>

      <div className='flex flex-col lg:flex-row justify-evenly items-center mt-6'>

        <div className='workyourway-bg w-full lg:w-1/2 h-64 lg:h-auto mb-6 lg:mb-0'>
          {/* Background image or any content */}
        </div>

        <div className='flex flex-col items-start justify-center lg:w-1/2 px-4 lg:px-8'>
          <div className='font-medium text-lg mb-4 text-center lg:text-left'>
            Choose from four Payment terms and create Agreements
          </div>

          <div className='flex flex-col space-y-4'>
            <div className='flex items-center'>
              <Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} className='mr-2' />
              <span>Fixed Price</span>
            </div>

            <div className='flex items-center'>
              <Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} className='mr-2' />
              <span>Hourly</span>
            </div>

            <div className='flex items-center'>
              <Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} className='mr-2' />
              <span>Task-Based</span>
            </div>

            <div className='flex items-center'>
              <Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} className='mr-2' />
              <span>Recurring Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkYourWay;
