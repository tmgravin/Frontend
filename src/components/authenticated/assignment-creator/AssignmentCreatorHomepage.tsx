import React from 'react'
import Header from './Header'
import LatestProjects from './LatestProjects'
import Applicationprocess2 from './Applicationprocess2'
import WorkYourWay from '@/components/non-authenticted/WorkYourWay'
import Footer from '@/components/non-authenticted/Footer'

function Homepage() {
  return (
    <div className='w-full h-full'>
     
    
      <div>
        <Header/>
      </div>
      <div className='creator-bg w-full px-2 h-screen flex flex-1 flex-col justify-center items-start'>

<div className='w-1/2 text-3xl text-white'>
  Get Freelancing Jobs Instantly Start Working for Yourself!
</div>

<div  className='text-white'>
  work with the best freelance talent from around the world on our secure,
  flexible and cost-effective platform
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
    <button type="submit" className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-sm border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      search
        <span className="sr-only">Search</span>
    </button>
</form>
</div>
<div className='text-white'>Academic writing|VC/Resume Writing|Copywriting</div>

<button className='bg-white text-black rounded-lg w-32  p-1'>Get Started</button>

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