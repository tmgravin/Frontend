// ProjectDropdown.tsx
"use client"

import React, { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
}

const ProjectDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: 'Home Automation System', description: 'Description for project one', amount: 150, deadline: '11 July 2024' },
    { id: 9, title: 'Smart Irrigation System', description: 'Description for project two', amount: 2000, deadline: '1 July 2024' },
    { id: 10, title: 'Home Automation System', description: 'Description for project one', amount: 150, deadline: '29 July 2024' },
    // Uncomment and add more projects as needed
    // { id: 11, title: 'Smart Irrigation System', description: 'Description for project two', amount: 2000 },
    // { id: 12, title: 'Smart Irrigation System', description: 'Description for project two', amount: 2000 },
    // { id: 13, title: 'Home Automation System', description: 'Description for project one', amount: 150 },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

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

  // Calculate total number of pages
  const totalPages = Math.ceil(projects.length / 3);

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer text-sm px-5 py-2.5 text-center"
      >
        Projects
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className='p-4 '>
            <div className='font-bold'>Latest Projects</div>
            <div ref={containerRef} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
              {projects.map((project) => (
                <div key={project.id} className='flex flex-col shadow-md p-3'>
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
                    <div className='ml-1'>{project.deadline}</div>
                  </div>
                  <button className='btn-blue rounded-md w-full h-7 text-white m-2 text-center'>
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className='dots-container flex justify-center mt-4'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <div key={index} className={`dot ${index === currentPage ? 'active' : ''}`}></div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDropdown;
