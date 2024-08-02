"use client";

import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import PaymentUploadModal from './PaymentUploadModal';
import axios from 'axios';

const ParentComponent: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/v1/uploadpaymentdata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      setMessage('Payment data uploaded successfully!');
      setSeverity('success');
    } catch (error) {
      console.error('Error uploading data:', error);
      setMessage('Failed to upload payment data.');
      setSeverity('error');
    }
    handleCloseModal();
  };

  const handleCloseSnackbar = () => {
    setMessage(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal}>
        Upload Payment Data
      </Button>
      <PaymentUploadModal open={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
      
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ParentComponent;
