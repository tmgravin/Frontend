"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

// Updated Profile interface
interface Profile {
  name: string;
  email: string;
  address: string;
  contact: string;
  profilePicture?: string; // Made optional
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

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for field values
  const [fieldValues, setFieldValues] = useState<Profile>(profile);

  // State for change password dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch user profile data from API
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/profile'); // Replace with your API endpoint
        const result: Profile = response.data;
        setProfile(result);
        setFieldValues(result);
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

  const handleSaveAll = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/profile', fieldValues); // Replace with your API endpoint
      if (response.status === 200) {
        console.log('Profile updated successfully');
        setProfile(fieldValues);
        setIsEditing(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSavePicture = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const response = await axios.put('/api/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); // Replace with your API endpoint
      if (response.status === 200) {
        console.log('Profile picture updated successfully');
        const pictureUrl = URL.createObjectURL(selectedFile);
        setProfile((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setFieldValues((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setSelectedFile(null);
      } else {
        console.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const handleOpenPasswordDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenPasswordDialog(false);
  };

  const handleChangePassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/change-password', { // Replace with your API endpoint
        password: newPassword
      });
      if (response.status === 200) {
        console.log('Password changed successfully');
        handleClosePasswordDialog(e);
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
    <div className="container mx-auto font-bold p-4 max-w-md">
      <h2 className="text-2xl mb-4">Personal Information</h2>

      {/* Profile Picture */}
      <div className="flex items-center justify-center mb-4">
        <Image
          src={profile.profilePicture || '/default-profile.png'} // Default profile picture if none provided
          alt="Profile Picture"
          width={96} // Set width and height for optimization
          height={96}
          className="w-24 h-24 rounded-full"
        />
        <div className="ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500"
          >
            <i className="fas fa-camera"></i>
          </button>
          {isEditing && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2"
              />
              <button
                onClick={handleSavePicture}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save Picture
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded ml-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <form noValidate autoComplete="off">
        {['name', 'email', 'address', 'contact'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={fieldValues[field as keyof Profile]}
              onChange={(e) => handleFieldChange(e, field as keyof Profile)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!isEditing}
            />
          </div>
        ))}

        {isEditing ? (
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            >
              Save All
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            <i className="fas fa-edit"></i> Edit All
          </button>
        )}

        <button
          onClick={handleOpenPasswordDialog}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          Change Password
        </button>
      </form>

      {/* Change Password Dialog */}
      {openPasswordDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Change Password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="New Password"
            />
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Confirm New Password"
            />
            <div className="flex justify-end">
              <button
                onClick={handleClosePasswordDialog}
                className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
