// src/ReadMoreModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DataItem } from './LatestProjects';

interface ReadMoreModalProps {
  project: DataItem | null;
  onClose: () => void;
  onEdit: () => void;
}

const ReadMoreModal: React.FC<ReadMoreModalProps> = ({ project, onClose, onEdit }) => {
  return (
    <Dialog open={!!project} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{project?.title}</DialogTitle>
      <DialogContent>
        <p>{project?.description}</p>
        <p className="text-sm">Project Amount: {project?.amount}</p>
        <p className="text-sm">Deadline: {project?.deadline}</p>
        <button onClick={onEdit} className='primary-btn-blue'>Edit Details</button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReadMoreModal;
