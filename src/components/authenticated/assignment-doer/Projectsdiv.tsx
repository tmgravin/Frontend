import React from 'react'
import Image from 'next/image'

export default function Projectsdiv() {
  return (
    <div className='flex flex-row justify-evenly'>

    <div className='flex flex-row'>
        <div>
        <Image
          src="/pngs/rocket.svg" // Path to your image in the public directory
          alt="rocket indicating growing image"
          width={50} // Specify the width of the image
          height={50} // Specify the height of the image
        />
        </div>
    <div className='flex flex-col'>
        <div className='font-bold'>
            100+
        </div>
        <div>  Ongoing Projects</div>
        </div>
    </div>



    <div className='flex flex-row'>
        <div>
        <Image
          src="/pngs/freelancers.svg" // Path to your image in the public directory
          alt="freenalcers icon"
          width={50} // Specify the width of the image
          height={50} // Specify the height of the image
        />
        </div>
    <div className='flex flex-col'>
        <div className='font-bold'>
            100+
        </div>
        <div>  Live Freelancers</div>
        </div>
    </div>


    <div className='flex flex-row'>
        <div>
        <Image
          src="/pngs/paid.svg" // Path to your image in the public directory
          alt="paying icon"
          width={50} // Specify the width of the image
          height={50} // Specify the height of the image
        />
        </div>
    <div className='flex flex-col'>
        <div className='font-bold'>
            $100
        </div>
        <div> Paid to Freelancres</div>
        </div>
    </div>


    <div className='flex flex-row'>
        <div>
        <Image
          src="/pngs/Loyalty_customer.svg" // Path to your image in the public directory
          alt="customer icon"
          width={50} // Specify the width of the image
          height={50} // Specify the height of the image
        />
        </div>
    <div className='flex flex-col'>
        <div className='font-bold'>
        100%
        </div>
        <div> Customer Satisfaction</div>
        </div>
    </div>
    </div>
  )
}
