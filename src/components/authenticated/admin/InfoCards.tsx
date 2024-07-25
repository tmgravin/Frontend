
import React from 'react';
import Image from 'next/image';

const InfoCards: React.FC = () => {
  const data = {
    totalTeachers: 25,
    totalAssignments: 150,
    ongoingProjects: 12,
    totalEarnings: "$25,000",
    positivechange:"+9.5%",
    negativechange:"-5.7%"

  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start justify-start">
       <div className=' w-full flex flex-row justify-between'>
        <h3 className="text-xl font-bold mb-2">{data.totalTeachers}</h3>
        <div> <Image
          src="/admin-icons/totalteacher.svg" // Replace with the path to your image
          alt="Total Teachers"
          width={15}
          height={15}
          className="mb-4"
        /></div>
        </div>
        <p className=" text-start primary-gray">Total Teachers</p>
        <div className='bg-green-300 text-green-600'>{data.positivechange}</div>
      </div>

      <div className="bg-white cb-shadow rounded-lg p-4 flex flex-col items-start justify-start">
       <div className=' w-full flex flex-row justify-between'>
        <h3 className="text-xl font-bold mb-2">{data.totalAssignments}</h3>
        <div> <Image
          src="/admin-icons/totalassignment.svg" 
          alt="Total Teachers"
          width={15}
          height={15}
          className="mb-4"
        /></div>
        </div>
        <p className="text-start primary-gray">Total Assignments</p>
        <div className='bg-red-300 text-red-600'>{data.negativechange}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start justify-start">
       <div className=' w-full flex flex-row justify-between'>
        <h3 className="text-xl font-bold mb-2">{data.ongoingProjects}</h3>
        <div> <Image
          src="/admin-icons/ongoingprojects.svg" 
          alt="Total Teachers"
          width={15}
          height={15}
          className="mb-4"
        /></div>
        </div>
        <p className=" text-start primary-gray">Ongoing Projects</p>
        <div className='bg-green-300 text-green-600'>{data.positivechange}</div>

      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start justify-start ">
       <div className=' w-full flex flex-row justify-between'>
        <h3 className="text-xl font-bold mb-2">{data.totalEarnings}</h3>
        <div> <Image
          src="/admin-icons/totalearning.svg"
          alt="Total Teachers"
          width={15}
          height={15}
          className="mb-4"
        /></div>
        </div>
        <p className="text-start primary-gray">Total Earning</p>
        <div className='bg-green-300 text-green-600'>{data.positivechange}</div>

      </div>
 
    </div>
  );
};

export default InfoCards;
