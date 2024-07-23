"use client"

import React, { useEffect, useState, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  amount: number;
}

const LatestProjects: React.FC = () => {
   // const [projects, setProjects] = useState<Project[]>([]);

  const projects = [
    { id: 1, title: 'Home Automation System', description: 'Description for project one', amount: 150,deadline:'11 july 2024' },
    { id: 9, title: 'Smart Irrigation System', description: 'Description for project two', amount: 2000,deadline:'1 july 2024' },
     { id: 10, title: 'Home Automation System', description: 'Description for project one', amount: 150 ,deadline:'29 july 2024'},
    // { id: 11, title: 'Smart Irrigation System', description: 'Description for project two', amount: 2000 },
    // { id: 12, title: 'Smart Irrigation System', description: 'Description for project two', amount: 2000 },
    // { id: 13, title: 'Home Automation System', description: 'Description for project one', amount: 150 },
    
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
   // useEffect(() => {
  //   // Fetch data from the backend API
  //   fetch('http://localhost:3000/api/projects')
  //     .then(response => response.json())
  //     .then(data => setProjects(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const containerWidth = containerRef.current.clientWidth;
        const newPage = Math.round(scrollLeft / containerWidth);
        setCurrentPage(newPage);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className='relative'>
      <div className='primary-green font-bold flex w-full justify-center'>Latest projects</div>
      <div ref={containerRef} className='flex flex-row w-full overflow-x-scroll example p-4'>

        {projects.map(project => (
          <div key={project.id} className='flex flex-col shadow-md w-1/3 h-1/4 p-3 m-3 cb-shadow'>
            <div className='underline mb-2'>
              Title: {project.title}
            </div>
            <div className='mb-2'>
              Description: {project.description}
            </div>
            <div className='flex flex-row mb-2'>
              <div>Project Amount:</div>
              <div className='ml-1'>${project.amount}</div>
            </div>

            <div className='flex flex-row mb-2'>
              <div>Deadline:</div>
              <div className='ml-1'>${project.deadline}</div>
            </div>
            <div>

            <button className='btn-blue rounded-md w-25  h-7  text-white  m-2 text-center'>Apply Now</button>

            </div>
          </div>
        ))}
      </div>
      <div className='dots-container'>
        {projects.map((_, index) => (
          <div key={index} className={`dot ${index === currentPage ? 'active' : ''}`}></div>
        ))}
      </div>
    </div>
  );
};
export default LatestProjects;
