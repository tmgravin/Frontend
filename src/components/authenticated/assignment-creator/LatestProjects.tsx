"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadMoreModal from './ReadMoreModal';
import EditAssignmentModal from './EditAssignmentModal';
import { getUserFromCookies } from '../../auth/token';

const user = getUserFromCookies();

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
  const [editModalVisible, setEditModalVisible] = useState(false);
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
      const response = await axios.get<DataItem[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/byUser?userId=${user.id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const truncateDescription = (description: string, length: number) => {
    if (description.length <= length) return description;
    return description.slice(0, length) + '... ';
  };

  const handleReadMore = (project: DataItem) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const openEditModal = (project: DataItem) => {
    setSelectedProject(project);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedProject(null);
  };

  const handleSave = () => {
    closeEditModal();
    // Optionally, refresh the data or take some other action
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className='flex justify-center items-center primary-green p-2'>Assignments You Have Posted</div>
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
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => openEditModal(item)}
            >
              Edit Assignment
            </button>
          </div>
        ))}
      </div>
      {visibleCount < data.length && (
        <div className='flex items-center justify-center'>
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      {selectedProject && (
        <ReadMoreModal 
          project={selectedProject} 
          onClose={handleClose} 
        />
      )}
      {editModalVisible && selectedProject && (
        <EditAssignmentModal
          project={selectedProject}
          onClose={closeEditModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default LatestProjects;
