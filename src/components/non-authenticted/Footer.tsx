import React from 'react'
import Image from 'next/image'


function Footer() {
  return (
    <div>

<div className='flex items-center justify-center cbg-color'>
<button className='btn-blue rounded-md p-2 m-2 text-white'>START REGISTRATION</button>
</div>

<div className='flex items-center justify-center primary-green font-bold'>
    Work Your Way
</div>
<div className='flex flex-row justify-evenly'>
    

<div className='footer-bg w-1/2'>
</div>

<div className='flex flex-col items-start justify-center'>
    <div className='font-medium'>Choose from four Payment terms and create Agreements</div>


    <div className='flex flex-row py-4'>
    <div className='text-teal-600 '><i className="fa-solid fa-circle-arrow-down"></i>  </div>icon and Fixed Price
    </div>
    <div className='flex flex-row py-4'>
    <div className='text-teal-600 '><i className="fa-solid fa-circle-arrow-down"></i>  </div>Hourly
    </div>
    <div className='flex flex-row py-4'>
    <div className='text-teal-600 '><i className="fa-solid fa-circle-arrow-down"></i>  </div> Task-Based
    </div>
    <div className='flex flex-row py-4'>
    <div className='text-teal-600'><i className="fa-solid fa-circle-arrow-down"></i>  </div> Recurring Payment
    </div>

</div>



</div>




    </div>
  )
}

export default Footer