// src/LatestProjects.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadMoreModal from './ReadMoreModal';

export interface DataItem {
  title: string;
  description: string;
  amount: number;
  deadline: string;
}

const LatestProjects: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    { title: 'Project 1', description: 'Description 1', amount: 1000, deadline: '2024-07-30' },
    { title: 'Project 2', description: 'Description 2', amount: 2000, deadline: '2024-08-15' },
    { title: 'Project 3', description: 'Description 3', amount: 3000, deadline: '2024-09-01' },
    { title: 'Project 4', description: 'Description 4', amount: 4000, deadline: '2024-07-25' },
    { title: 'Project 5', description: 'Description 5', amount: 5000, deadline: '2024-08-05' },
    { title: 'Project 6', description: 'Description 6', amount: 6000, deadline: '2024-09-10' },
    { title: 'Project 7', description: 'Description 7', amount: 7000, deadline: '2024-07-29' },
    { title: 'Project 8', description: 'Description 8', amount: 8000, deadline: '2024-08-20' },
    { title: 'Project 9', description: 'Description 9', amount: 9000, deadline: '2024-09-15' },
    { title: 'Project 10', description: 'Description 10', amount: 10000, deadline: '2024-10-01' },
  ]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DataItem | null>(null);
  const [editProject, setEditProject] = useState<DataItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>('API_ENDPOINT');
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

  const handleEditDetails = (project: DataItem) => {
    setEditProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleCloseEdit = () => {
    setEditProject(null);
  };

  const handleSaveEdit = (updatedProject: DataItem) => {
    setData(data.map(item => item.title === updatedProject.title ? updatedProject : item));
    handleCloseEdit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editProject) {
      setEditProject({ ...editProject, [e.target.name]: e.target.value });
    }
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className='flex justify-center items-center primary-green p-2'>Latest Projects</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>
              {truncateDescription(item.description, 100)}
              <button
                onClick={() => handleReadMore(item)}
                className="text-blue-500 hover:underline"
              >
                Read More
              </button>
            </p>
            <p className="text-sm">Project Amount: {item.amount}</p>
            <p className="text-sm">Deadline: {item.deadline}</p>
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
        onEdit={() => handleEditDetails(selectedProject!)} 
      />
    
    </div>
  );
};

export default LatestProjects;
