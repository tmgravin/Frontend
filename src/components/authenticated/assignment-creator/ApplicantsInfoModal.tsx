import React from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

interface ApplicantsInfoModalProps {
  open: boolean;
  onClose: () => void;
  assignment: DataItem;
  handleAccept: (index: number) => void;
  handleReject: (index: number) => void;
}

const ApplicantsInfoModal: React.FC<ApplicantsInfoModalProps> = ({ open, onClose, assignment, handleAccept, handleReject }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Applicants for {assignment.title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
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
              {assignment.applicants.map((applicant, index) => (
                <TableRow key={index}>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.appliedDate}</TableCell>
                  <TableCell>{applicant.status || 'Pending'}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" onClick={() => handleAccept(index)} sx={{ mr: 1 }}>Accept</Button>
                    <Button variant="contained" color="error" onClick={() => handleReject(index)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default ApplicantsInfoModal;
