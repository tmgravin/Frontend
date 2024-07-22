import React from 'react';
import Image from 'next/image';


function ApplicationProcess2() {
  return (
    <div className='cb-shadow applicationprocess2-bgcolor'>
      <div className='primary-orange flex justify-center items-center font-bold p-10'>
       Get Your Assignments Done
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
            <div className='font-bold p-3'>1.Upload Assignment</div>
            <div className='text-center'>Fill in your details and qualification, and sahre the skills in which you are proficient</div>
          </div>

          <div className='flex items-center justify-center'>
          
          
          <Image
          src="/pngs/arrowleft.svg"
          alt="Example SVG Image"
          width={139}
          height={30}
        />


          </div>

          <div className='flex flex-col items-center'>
            <div className='text-3xl'><Image
          src="/pngs/cv.svg"
          alt="Example SVG Image"
          width={50}
          height={30}
        /></div>
            <div className='font-bold p-3' >2.Hire Assignment Doer</div>
            <div className='text-center'> Get the most suited job for your skills</div>
          </div>

          <div className='flex items-center justify-center'>
           
          <Image
          src="/pngs/arrowleft.svg"
          alt="Example SVG Image"
          width={139}
          height={30}
        />
          </div>

          <div className='flex flex-col items-center'>
            <div className='text-3xl'><div>   <Image
          src="/pngs/payment.svg"
          alt="Example SVG Image"
          width={50}
          height={30}
        /></div></div>
            <div className='font-bold p-3'>3.Get assignment done with secure payment</div>
            <div className='text-center'>Choose from several freelance jobs methods with Safepay payment protection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationProcess2;
