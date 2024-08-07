import React from 'react'
import Image from 'next/image'


function WorkYourWay() {
  return ( 
    <div className='pt-6'>


<div className='flex items-center justify-center primary-green font-bold '>
    Work Your Way
</div>
<div className='flex flex-row justify-evenly'>
    

<div className='workyourway-bg w-1/2'>
</div>

<div className='flex flex-col items-start justify-center'>
    <div className='font-medium'>Choose from four Payment terms and create Agreements</div>


    <div className='flex flex-row py-4'>
    <div className='px-2'><Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} /> </div>icon and Fixed Price
    </div>
    <div className='flex flex-row py-4'>
    <div className='px-2'><Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} />  </div>Hourly
    </div>
    <div className='flex flex-row py-4'>
    <div className='px-2'><Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} />  </div> Task-Based
    </div>
    <div className='flex flex-row py-4'>
    <div className='px-2'><Image src="/pngs/arrowdown.svg" alt="Icon" width={24} height={24} /> </div> Recurring Payment
    </div>

</div>



</div>




    </div>
  )
}

export default WorkYourWay;