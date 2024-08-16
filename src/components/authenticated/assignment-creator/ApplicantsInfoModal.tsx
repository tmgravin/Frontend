// src/components/authenticated/assignment-creator/ApplicantsInfoModal.tsx
import React from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Applicant {
  name: string;
  email: string;
  appliedDate?: string; // Mark as optional
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
  doer: Applicant; // Changed from { name: string; email: string; } to Applicant
  status: string;
  createdAt: string;
  updatedAt: string;
  
  applicants?: Applicant[]; // Made optional
}

interface ApplicantsInfoModalProps {
  open: boolean;
  onClose: () => void;
  assignment: DataItem | null;
  handleAccept: (applicationId: number) => void;
  handleReject: (applicationId: number) => void;
}

const ApplicantsInfoModal: React.FC<ApplicantsInfoModalProps> = ({ open, onClose, assignment, handleAccept, handleReject }) => {
  if (!assignment) return null;

  const applicants = [assignment.doer, ...(assignment.applicants ?? [])];

  const acceptApplication = async (applicationId: number) => {
    try {
      // Use FormData to send the application ID as form data
      const formData = new FormData();
      formData.append('applicationId', applicationId.toString());

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/acceptApplication`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true // Include credentials with the request
      });

      toast.success('Application accepted successfully!');
    } catch (error) {
      console.error('Error accepting application', error);
      toast.error('Error accepting application. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Applicants Information</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Project Details</Typography>
        <Typography variant="body1"><strong>Project Name:</strong> {assignment.projects.projectName}</Typography>
        <Typography variant="body1"><strong>Project Amount:</strong> ${assignment.projects.projectAmount}</Typography>
        <Typography variant="body1"><strong>Project Deadline:</strong> {assignment.projects.projectDeadline}</Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>Applicants Information</Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length ? (
              applicants.map((applicant, index) => (
                <TableRow key={index}>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.appliedDate ?? '-'}</TableCell>
                  <TableCell>{applicant.status ?? '-'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => acceptApplication(assignment.id)} // Pass the application ID
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(assignment.id)} // Pass the application ID
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No applicants available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
      <ToastContainer /> {/* Add ToastContainer here */}
    </Dialog>
  );
};

export default ApplicantsInfoModal;
