"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewRating from '../../Review-modal/ReviewRating';

interface DataItem {
  title: string;
  description: string;
  amount: number;
  deadline: string;
  fileUrl: string;
}

interface Review {
  rating: number;
  comment: string;
  reviewer: string;
}

const CompletedAssignments: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    { title: 'Project 1', description: 'Description 1', amount: 1000, deadline: '2024-07-30', fileUrl: 'https://example.com/file1.pdf' },
    { title: 'Project 2', description: 'Description 2', amount: 2000, deadline: '2024-08-15', fileUrl: 'https://example.com/file2.pdf' },
    { title: 'Project 3', description: 'Description 3', amount: 3000, deadline: '2024-09-01', fileUrl: 'https://example.com/file3.pdf' },
    { title: 'Project 4', description: 'Description 4', amount: 4000, deadline: '2024-07-25', fileUrl: 'https://example.com/file4.pdf' },
    { title: 'Project 5', description: 'Description 5', amount: 5000, deadline: '2024-08-05', fileUrl: 'https://example.com/file5.pdf' },
    { title: 'Project 6', description: 'Description 6', amount: 6000, deadline: '2024-09-10', fileUrl: 'https://example.com/file6.pdf' },
    { title: 'Project 7', description: 'Description 7', amount: 7000, deadline: '2024-07-29', fileUrl: 'https://example.com/file7.pdf' },
    { title: 'Project 8', description: 'Description 8', amount: 8000, deadline: '2024-08-20', fileUrl: 'https://example.com/file8.pdf' },
    { title: 'Project 9', description: 'Description 9', amount: 9000, deadline: '2024-09-15', fileUrl: 'https://example.com/file9.pdf' },
    { title: 'Project 10', description: 'Description 10', amount: 10000, deadline: '2024-10-01', fileUrl: 'https://example.com/file10.pdf' },
  ]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<DataItem | null>(null);
  const [reviews, setReviews] = useState<Review[]>([
    { rating: 5, comment: 'Excellent teacher!', reviewer: 'John Doe' },
    { rating: 4, comment: 'Very good, but can improve.', reviewer: 'Jane Doe' },
    { rating: 3, comment: 'Average experience.', reviewer: 'Alex Smith' },
  ]);
  const [averageRating, setAverageRating] = useState(4.0);
  const [totalRatings, setTotalRatings] = useState(3);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>('API_ENDPOINT',{
        withCredentials: true // Include credentials with the request
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleReviewClick = (assignment: DataItem) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleRate = () => {
    console.log('Rate teacher clicked');
    // Add logic to handle rating here
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className='flex justify-center items-center primary-green p-2 font-bold'>Completed Assignments Ready For Download</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <h2>Completed by:</h2>
            <p>{item.description}</p>
            <p className="text-sm">Project Amount: {item.amount}</p>
            <p className="text-sm">Deadline: {item.deadline}</p>
            <p className='text-sm'>
              Download Assignment: 
              <a href={item.fileUrl} className="text-blue-500 underline ml-2" download>
                Download
              </a>
            </p>
            <button
              className="mt-4 px-4 py-2  text-white rounded primary-btn-blue"
              onClick={() => handleReviewClick(item)}
            >
              Review Teacher
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
      {selectedAssignment && (
        <ReviewRating
          open={modalOpen}
          onClose={handleModalClose}
          // onRate={handleRate}
          reviews={reviews}
          averageRating={averageRating}
          totalRatings={totalRatings}
        />
      )}
    </div>
  );
};

export default CompletedAssignments;
