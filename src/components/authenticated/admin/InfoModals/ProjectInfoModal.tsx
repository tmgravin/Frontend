import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Project } from '../Projects'; // Adjust the import path as necessary

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  open: boolean;
}

const ProjectInfoModal: React.FC<ProjectModalProps> = ({ project, onClose, open }) => {
  if (!project) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
    >
      <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Box className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            className="absolute top-2 right-2"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="project-modal-title" className="mb-4">
            Project Details
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Doer ID:</strong> {project.doerId}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Doer Name:</strong> {project.doerName}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Creator ID:</strong> {project.creatorId}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Creator Name:</strong> {project.creatorName}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Project Title:</strong> {project.projectTitle}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Project Name:</strong> {project.projectId}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Deadline:</strong> {project.deadline}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
            <strong>Status:</strong> {project.status}
          </Typography>
          <Typography id="project-modal-description" className="mb-2">
           <button className='primary-btn-blue rounded-sm p-1 text-white'>Make Assignment visible to Creator</button>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectInfoModal;
