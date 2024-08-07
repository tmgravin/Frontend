// src/CompletedAssignments.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserFromCookies } from '@/components/auth/token';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const user = getUserFromCookies();

interface DataItem {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
}

const CompletedAssignments: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File | null }>({});
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/doer?doer=${user.id}`,
        {withCredentials:true}
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, projectId: number) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles({
        ...selectedFiles,
        [projectId]: e.target.files[0],
      });
    }
  };

  const handleUpload = async (projectId: number) => {
    const file = selectedFiles[projectId];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [projectId]: true }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId.toString());
    formData.append('doerId',user.id)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/completed/project/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true // Include credentials with the request
      });
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }

    setUploading((prev) => ({ ...prev, [projectId]: false }));
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className='flex justify-center items-center primary-green p-2'>Completed Assignments</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <p className="text-sm">Project Amount: {item.amount}</p>
            <p className="text-sm">Deadline: {item.deadline}</p>
            <p className="text-sm">Upload Assignment:</p>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, item.id)}
              className="mb-2"
            />
            <button
              onClick={() => handleUpload(item.id)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              disabled={uploading[item.id]}
            >
              {uploading[item.id] ? 'Uploading...' : 'Upload'}
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
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default CompletedAssignments;
