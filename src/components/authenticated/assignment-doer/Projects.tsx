"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadMoreModal from './ReadMoreModal';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'; 
import { getUserFromCookies } from '../../auth/token'; 

export interface DataItem {
  id: number;
  projectStatus: string;
  scope: string;
  experienceYear: string;
  levelOfExperience: string;
  projectUrl: string;
  createdAt: string;
  updatedAt: string;
  projects: {
    id: number;
    projectName: string;
    projectAmount: string;
    projectDeadline: string;
    budgets: string | null;
    createdAt: string;
    updatedAt: string;
    users: {
      id: number;
      name: string;
      email: string;
    };
    projectCategory: {
      id: number;
      category: string;
    } | null;
  };
}

const LatestProjects: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DataItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/pending`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const truncateDescription = (description: string, length: number) => {
    if (typeof description !== 'string') return ''; // Return empty string if description is not a string
    if (description.length <= length) return description;
    return description.slice(0, length) + '...';
  };

  const handleReadMore = (project: DataItem) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleApplyNow = async (projectId: number) => {
    try {
      const user = getUserFromCookies();

      if (!user || !user.id) {
        toast.error('User not found. Please log in.');
        return;
      }

      const doerId = user.id;

      const formData = new FormData();
      formData.append('doerId', doerId.toString());
      formData.append('projectId', projectId.toString());

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true // Include credentials with the request
      });

      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for project', error);
      toast.error('Failed to apply for the project. Please try again.');
    }
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <ToastContainer />
      <div className='flex justify-center items-center primary-green p-2'>Latest Projects</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.projects.projectName}</h2>
            <p>
              {truncateDescription(item.projects.projectAmount, 100)}
              <button
                onClick={() => handleReadMore(item)}
                className="text-blue-500 hover:underline"
              >
                Read More
              </button>
            </p>
            <p className="text-sm">Project Amount: {item.projects.projectAmount}</p>
            <p className="text-sm">Deadline: {item.projects.projectDeadline}</p>
            <button
              className="primary-btn-blue rounded-md text-white"
              onClick={() => handleApplyNow(item.projects.id)}
            >
              Apply now
            </button>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center'>
        {visibleCount < data.length && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
      <ReadMoreModal 
        project={selectedProject} 
        onClose={handleClose} 
      />
    </div>
  );
};

export default LatestProjects;
