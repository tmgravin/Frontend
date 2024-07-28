"use client"
// src/DataFetching.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Container, Grid, CircularProgress } from '@mui/material';
import ApplicantsInfoModal from './ApplicantsInfoModal';

interface Applicant {
  name: string;
  email: string;
  appliedDate: string;
  status?: string;
}

interface DataItem {
  title: string;
  description: string;
  amount: number;
  deadline: string;
  applicants: Applicant[];
}

const PendingForApproval: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    {
      title: 'Project 1',
      description: 'Description 1',
      amount: 1000,
      deadline: '2024-07-30',
      applicants: [
        { name: 'John Doe', email: 'john@example.com', appliedDate: '2024-07-01' },
        { name: 'Jane Smith', email: 'jane@example.com', appliedDate: '2024-07-02' }
      ]
    },
    {
      title: 'Project 2',
      description: 'Description 2',
      amount: 2000,
      deadline: '2024-08-15',
      applicants: [
        { name: 'Alice Johnson', email: 'alice@example.com', appliedDate: '2024-07-05' },
        { name: 'Bob Brown', email: 'bob@example.com', appliedDate: '2024-07-06' }
      ]
    },
    {
      title: 'Project 3',
      description: 'Description 3',
      amount: 3000,
      deadline: '2024-09-01',
      applicants: [
        { name: 'Charlie Davis', email: 'charlie@example.com', appliedDate: '2024-07-10' },
        { name: 'David Evans', email: 'david@example.com', appliedDate: '2024-07-11' }
      ]
    },
    {
      title: 'Project 4',
      description: 'Description 4',
      amount: 4000,
      deadline: '2024-07-25',
      applicants: [
        { name: 'Eve Foster', email: 'eve@example.com', appliedDate: '2024-07-12' },
        { name: 'Frank Green', email: 'frank@example.com', appliedDate: '2024-07-13' }
      ]
    },
    {
      title: 'Project 5',
      description: 'Description 5',
      amount: 5000,
      deadline: '2024-08-05',
      applicants: [
        { name: 'Grace Harris', email: 'grace@example.com', appliedDate: '2024-07-14' },
        { name: 'Hank Iverson', email: 'hank@example.com', appliedDate: '2024-07-15' }
      ]
    }
  ]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<DataItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleViewApplicants = (assignment: DataItem) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const handleAccept = (index: number) => {
    if (selectedAssignment) {
      const updatedApplicants = [...selectedAssignment.applicants];
      updatedApplicants[index].status = 'accepted';
      const updatedData = data.map(item =>
        item.title === selectedAssignment.title ? { ...item, applicants: updatedApplicants } : item
      );
      setData(updatedData);
      setSelectedAssignment({ ...selectedAssignment, applicants: updatedApplicants });
    }
  };

  const handleReject = (index: number) => {
    if (selectedAssignment) {
      const updatedApplicants = [...selectedAssignment.applicants];
      updatedApplicants[index].status = 'rejected';
      const updatedData = data.map(item =>
        item.title === selectedAssignment.title ? { ...item, applicants: updatedApplicants } : item
      );
      setData(updatedData);
      setSelectedAssignment({ ...selectedAssignment, applicants: updatedApplicants });
    }
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <Container>
      
        <p  className='flex justify-center items-center primary-green p-2 font-bold'>Assignment Pending For Approval</p>
     
      <Grid container spacing={4}>
        {displayedData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
              <Typography variant="h6" component="h2">{item.title}</Typography>
              <Typography variant="body1">Description: {item.description}</Typography>
              <Typography variant="body2">Amount: ${item.amount}</Typography>
              <Typography variant="body2">Deadline: {item.deadline}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewApplicants(item)}
                sx={{ mt: 2 }}
              >
                View Applicants
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        {visibleCount < data.length && (
          <Button
            variant="contained"
            color="primary"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Load More'}
          </Button>
        )}
      </Box>
      {selectedAssignment && (
        <ApplicantsInfoModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          assignment={selectedAssignment}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      )}
    </Container>
  );
};

export default PendingForApproval;
