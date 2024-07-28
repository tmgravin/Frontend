import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../Students';
import UsersAssignment from './UsersAssignment';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  open: boolean;
}

const StudentInfoModal: React.FC<UserModalProps> = ({ user, onClose, open }) => {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Box className="bg-white p-6 rounded shadow-md w-1/2 relative max-h-[80vh] overflow-y-auto">
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            className="absolute top-2 right-2"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="user-modal-title" className="mb-4">
            User Details
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>ID:</strong> {user.id}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Registration Date:</strong> {user.registrationDate}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
            <strong>Address:</strong> {user.address}
          </Typography>
          <Typography id="user-modal-description" className="mb-2">
          <p className="text-sm">Total Spent: $1000</p>
          </Typography>

        
          <Box className="mt-4">
            <UsersAssignment />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default StudentInfoModal;
