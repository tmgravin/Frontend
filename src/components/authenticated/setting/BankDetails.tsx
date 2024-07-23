"use client";
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const BankDetails: React.FC = () => {
  // State for bank details
  const [bankDetails, setBankDetails] = useState({
    firstName: '',
    lastName: '',
    accountNumber: '',
    bankName: '',
    creditCardNumber: '',
    registeredPhoneNumber: '',
    expiryDate: ''
  },);

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for editing values
  const [editValues, setEditValues] = useState({
    firstName: bankDetails.firstName,
    lastName: bankDetails.lastName,
    accountNumber: bankDetails.accountNumber,
    bankName: bankDetails.bankName,
    creditCardNumber: bankDetails.creditCardNumber,
    registeredPhoneNumber: bankDetails.registeredPhoneNumber,
    expiryDate: bankDetails.expiryDate
  });

  // State for edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    // Fetch bank details from API
    const fetchBankDetails = async () => {
      try {
        const response = await fetch('/api/bank-details'); // Replace with your API endpoint
        const result = await response.json();
        setBankDetails(result);
        setEditValues(result);
      } catch (error) {
        console.error('Error fetching bank details:', error);
      }
    };

    fetchBankDetails();
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setOpenEditDialog(!openEditDialog);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/bank-details', { // Replace with your API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editValues),
      });
      if (response.ok) {
        console.log('Bank details updated successfully');
        setBankDetails(editValues);
        handleEditToggle();
      } else {
        console.error('Failed to update bank details');
      }
    } catch (error) {
      console.error('Error updating bank details:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Typography variant="h4" gutterBottom>
        Bank Details
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <div className="mb-4">
          <Typography variant="h6">First Name</Typography>
          <Typography>{bankDetails.firstName}</Typography>
        </div>
        <div className="mb-4">
          <Typography variant="h6">Last Name</Typography>
          <Typography>{bankDetails.lastName}</Typography>
        </div>
        <div className="mb-4">
          <Typography variant="h6">Account Number</Typography>
          <Typography>{bankDetails.accountNumber}</Typography>
        </div>
        <div className="mb-4">
          <Typography variant="h6">Bank Name</Typography>
          <Typography>{bankDetails.bankName}</Typography>
        </div>
        <div className="mb-4">
          <Typography variant="h6">Credit Card Number</Typography>
          <Typography>{bankDetails.creditCardNumber}</Typography>
        </div>
        <div className="mb-4">
          <Typography variant="h6">Registered Phone Number</Typography>
          <Typography>{bankDetails.registeredPhoneNumber}</Typography>
        </div>
        <div className="mb-4">
          <Typography variant="h6">Expiry Date</Typography>
          <Typography>{bankDetails.expiryDate}</Typography>
        </div>

        <Button
          onClick={handleEditToggle}
          variant="contained"
          color="primary"
        >
          Edit Bank Details
        </Button>
      </Box>

      {/* Edit Bank Details Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditToggle}>
        <DialogTitle>Edit Bank Details</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={editValues.firstName}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editValues.lastName}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Account Number"
            name="accountNumber"
            value={editValues.accountNumber}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bank Name"
            name="bankName"
            value={editValues.bankName}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Credit Card Number"
            name="creditCardNumber"
            value={editValues.creditCardNumber}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Registered Phone Number"
            name="registeredPhoneNumber"
            value={editValues.registeredPhoneNumber}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiry Date"
            name="expiryDate"
            value={editValues.expiryDate}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditToggle} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BankDetails;
