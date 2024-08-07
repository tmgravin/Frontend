// src/DataFetching.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Container, Grid, CircularProgress } from '@mui/material';
import ApplicantsInfoModal from './ApplicantsInfoModal';
import { getUserFromCookies } from '@/components/auth/token';
const user = getUserFromCookies();

interface Applicant {
  name: string;
  email: string;
  appliedDate: string;
  status?: string;
}

interface Project {
  projectName: string;
  projectAmount: number;
  projectDeadline: string;
  // Include other fields as needed
}

interface DataItem {
  id: number;
  projects: Project;
  doer: {
    name: string;
    email: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PendingForApproval: React.FC = () => {
  const [data, setData] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<DataItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem>(`http://localhost:8080/api/application/?id=${user.id}`,{  withCredentials: true });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const handleViewApplicants = (assignment: DataItem) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const handleAccept = (index: number) => {
    if (selectedAssignment) {
      // Update state logic here
      // Assume you update applicant status in some way
    }
  };

  const handleReject = (index: number) => {
    if (selectedAssignment) {
      // Update state logic here
      // Assume you update applicant status in some way
    }
  };

  return (
    <Container>
      <p className='flex justify-center items-center primary-green p-2 font-bold'>Assignment Pending For Approval</p>
      <Grid container spacing={4}>
        {data && (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
              <Typography variant="h6" component="h2">{data.projects.projectName}</Typography>
              <Typography variant="body1">Description: {/* Add description if available */}</Typography>
              <Typography variant="body2">Amount: ${data.projects.projectAmount}</Typography>
              <Typography variant="body2">Deadline: {data.projects.projectDeadline}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewApplicants(data)}
                sx={{ mt: 2 }}
              >
                View Applicants
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        {loading && <CircularProgress size={24} />}
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
