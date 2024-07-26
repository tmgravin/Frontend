import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataItem } from './Projects'; // Adjust the import path as necessary

interface ReadMoreModalProps {
  project: DataItem | null;
  onClose: () => void;
  open: boolean;
  onApply: (project: DataItem) => void; // New prop
}

const ReadMoreModal: React.FC<ReadMoreModalProps> = ({ project, onClose, open, onApply }) => {
  if (!project) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="read-more-modal-title"
      aria-describedby="read-more-modal-description"
    >
      <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Box className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto relative">
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            className="absolute top-2 right-2"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="read-more-modal-title" className="mb-4">
            {project.title}
          </Typography>
          <Typography id="read-more-modal-description">
            {project.description}
          </Typography>
          <Typography className="mt-4">
            <strong>Amount:</strong> {project.amount}
          </Typography>
          <Typography>
            <strong>Deadline:</strong> {project.deadline}
          </Typography>
          <div className="mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={() => project && onApply(project)}
            >
              Apply Now
            </Button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReadMoreModal;
