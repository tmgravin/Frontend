"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar
} from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';

interface Profile {
  name: string;
  email: string;
  address: string;
  contact: string;
  profilePicture: string; // URL or path to the profile picture
}

const UserDetails: React.FC = () => {
  // State for user profile data
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    address: '',
    contact: '',
    profilePicture: ''
  });

  // State for editing modes
  const [isEditing, setIsEditing] = useState<{
    name: boolean;
    email: boolean;
    address: boolean;
    contact: boolean;
    picture: boolean;
  }>({
    name: false,
    email: false,
    address: false,
    contact: false,
    picture: false
  });

  // State for field values
  const [fieldValues, setFieldValues] = useState<Profile>({
    name: profile.name,
    email: profile.email,
    address: profile.address,
    contact: profile.contact,
    profilePicture: profile.profilePicture
  });

  // State for change password dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch user profile data from API
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile'); // Replace with your API endpoint
        const result: Profile = await response.json();
        setProfile(result);
        setFieldValues({
          name: result.name,
          email: result.email,
          address: result.address,
          contact: result.contact,
          profilePicture: result.profilePicture
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Profile) => {
    const { value } = e.target;
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = (field: keyof Profile) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async (field: keyof Profile) => {
    try {
      const response = await fetch(`/api/profile/${field}`, { // Replace with your API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: fieldValues[field] }),
      });
      if (response.ok) {
        console.log(`${field} updated successfully`);
        setProfile((prev) => ({ ...prev, [field]: fieldValues[field] }));
        handleEditToggle(field);
      } else {
        console.error(`Failed to update ${field}`);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleSavePicture = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const response = await fetch('/api/profile/picture', { // Replace with your API endpoint
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        console.log('Profile picture updated successfully');
        setProfile((prev) => ({ ...prev, profilePicture: URL.createObjectURL(selectedFile) }));
        setFieldValues((prev) => ({ ...prev, profilePicture: URL.createObjectURL(selectedFile) }));
        setIsEditing((prev) => ({ ...prev, picture: false }));
        setSelectedFile(null);
      } else {
        console.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch('/api/change-password', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (response.ok) {
        console.log('Password changed successfully');
        handleClosePasswordDialog();
      } else {
        console.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>

      {/* Profile Picture */}
      <div className="flex items-center mb-4">
        <Avatar
          src={fieldValues.profilePicture || '/default-profile.png'} // Default profile picture if none provided
          alt="Profile Picture"
          sx={{ width: 100, height: 100 }}
        />
        <div className="ml-4">
          <IconButton
            onClick={() => setIsEditing((prev) => ({ ...prev, picture: true }))}
          >
            <CameraAltIcon />
          </IconButton>
          {isEditing.picture && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2"
              />
              <Button
                onClick={handleSavePicture}
                variant="contained"
                color="primary"
              >
                Save Picture
              </Button>
              <Button
                onClick={() => setIsEditing((prev) => ({ ...prev, picture: false }))}
                variant="outlined"
                color="secondary"
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <Box component="form" noValidate autoComplete="off">
        {['name', 'email', 'address', 'contact'].map((field) => (
          <div className="mb-4" key={field}>
            <TextField
              label={capitalizeFirstLetter(field)}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              value={fieldValues[field as keyof Profile]}
              onChange={(e) => handleFieldChange(e, field as keyof Profile)}
              fullWidth
              disabled={!isEditing[field as keyof Profile]}
            />
            <div className="flex justify-end mt-2">
              {isEditing[field as keyof Profile] ? (
                <>
                  <Button
                    onClick={() => handleSave(field as keyof Profile)}
                    variant="contained"
                    color="primary"
                    className="mr-2"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => handleEditToggle(field as keyof Profile)}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => handleEditToggle(field as keyof Profile)}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button
          onClick={handleOpenPasswordDialog}
          variant="outlined"
          color="secondary"
          className="mt-4"
        >
          Change Password
        </Button>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            color="primary"
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Helper function to capitalize the first letter of the field name
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default UserDetails;
