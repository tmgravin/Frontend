import React, { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface PaymentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const PaymentUploadModal: React.FC<PaymentUploadModalProps> = ({ open, onClose, onSubmit }) => {
  const [projectId, setProjectId] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value === '' ? '' : Number(value));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('projectName', projectName);
    formData.append('amount', amount.toString()); // Convert amount to string
    if (file) {
      formData.append('file', file);
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload Payment Data</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Project ID"
          type="text"
          fullWidth
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Project Name"
          type="text"
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
          InputProps={{ inputProps: { min: 0 } }} // Ensure amount is non-negative
        />
        <input
          accept="image/*,application/pdf"
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Upload Screenshot/File
          </Button>
        </label>
        {file && (
          <div style={{ marginTop: '10px' }}>
            <strong>Selected File:</strong> {file.name}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentUploadModal;
