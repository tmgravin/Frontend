"use client"

import React from 'react'
import Header from './Header'
import LatestProjects from './LatestProjects'
import Applicationprocess2 from './Applicationprocess2'
import WorkYourWay from '@/components/non-authenticted/WorkYourWay'
import Footer from '@/components/non-authenticted/Footer'
import axios from 'axios'
import { useState,useEffect } from 'react'

function Homepage() {
  const [backgroundImage, setBackgroundImage] = useState<string | null |[]>();
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/creator`,{
          withCredentials: true 
        }); // Replace with your API endpoint
      
        setBackgroundImage(response.data); // Assuming the API returns an object with `imageUrl` property
     console.log(response.data)
     if (response.data) {
      const image = response.data;
      const img: any = image[image.length - 1];
      console.log(img)
      setBackgroundImage(img); // Adjust based on your response structure
    }
    console.log(backgroundImage)
    
    } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, [backgroundImage]);
  return (
    <div className='w-full h-full'>
     
    
      <div>
        <Header/>
      </div>
      <div
      className='w-full homepage-bg h-screen px-2 flex flex-1 flex-col justify-center items-start'
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='w-1/2 text-3xl text-white'>
        Get Freelancing Jobs Instantly Start Working for Yourself!
      </div>
      <div className='text-white'>
        Work with the best freelance talent from around the world on our secure, flexible, and cost-effective platform
      </div>
      <div>
        <form className="flex items-center max-w-sm mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-sm focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
              placeholder="What skills are you searching for?"
              required
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            </div>
          </div>
          <button type="submit" className="p-2.5 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 rounded-r-sm focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className='text-white'>Academic writing | VC/Resume Writing | Copywriting</div>
      <button className='bg-white text-black rounded-lg w-32 p-1'>
        Get Started
      </button>
    </div>
 

<div>
  
  <LatestProjects/>
</div>
<div>

</div>

<div>
  <Applicationprocess2/>
</div>



      <div>
       <WorkYourWay/>

      </div>
<div>
  <Footer/>
</div>

      </div>
  )
}

export default Homepage