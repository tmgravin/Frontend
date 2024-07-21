import React from 'react';

function Whyus() {
  return (
    <div className='whyus-bg w-full h-screen text-white flex flex-col items-center'>
      <div className='text-white text-4xl mb-8'>
        Why us?
      </div>

      <div className='flex w-full'>
        {/* Left Column */}
        <div className='w-1/2 flex flex-col items-end pr-24'> {/* Increased padding-right */}
          <div className='m-2 text-right'>
            <div className='text-2xl'>
              Support <i className="fa-solid fa-headset"></i>
            </div>
            <div className='pr-8'>Our dedicated support team works 24/7 to resolve all of your queries over the phone or email, no matter where you are located.</div>
          </div>
          <div className='m-2 text-right'>
            <div className='text-2xl'>
              Credibility <i className="fa-solid fa-handshake text-white"></i>
            </div>
            <div className='pr-8'>We verify freelancers, publish their feedback, scores, and All-Time Transactions Data to help you identify time-tested professionals across the globe.</div>
          </div>
          <div className='m-2 text-right'>
            <div className='text-2xl'>
              Security <i className="fa-solid fa-user-shield text-white"></i>
            </div>
            <div className='pr-8'>We offer safe payment protection and your choice of preferred payment method for financial peace of mind.</div>
          </div>
        </div>

        {/* Right Column */}
        <div className='w-1/2 flex flex-col items-start pl-24'> {/* Increased padding-left */}
          <div className='m-2 text-left'>
            <div className='text-2xl'>
              <i className="fa-solid fa-stopwatch text-white"></i> Flexibility
            </div>
            <div className='pl-8'>Our platform adapts to your needs, providing the flexibility to work according to your schedule and preferences.</div>
          </div>
          <div className='m-2 text-left'>
            <div className='text-2xl'>
              <i className="fa-solid fa-hand-holding-dollar text-white"></i> Value
            </div>
            <div className='pl-8'>We offer competitive pricing and exceptional value for your investment, ensuring high-quality services at affordable rates.</div>
          </div>

          <div className='pl-8'> 
          <div className='m-2 text-left '>
            <button type="button" className="text-black bg-white hover:bg-gray-200 focus:outline-none rounded-md text-sm px-5 py-2.5 text-center ">
             Get started
            </button>
          </div>      
   </div>
        </div>
      </div>
    </div>
  );
}

export default Whyus;
