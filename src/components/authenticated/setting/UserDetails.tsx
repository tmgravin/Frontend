"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getUserFromCookies } from '@/components/auth/token'; // Adjust the path as necessary

// Default user object if getUserFromCookies returns null
const user = getUserFromCookies() || { id: '', name: '', email: '', address: '', phone: '', profilePicture: '' };

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
    name: user.name,
    email: user.email,
    address: user.address,
    contact: user.phone,
    profilePicture: user.profilePicture
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for field values
  const [fieldValues, setFieldValues] = useState<Profile>(profile);

  // State for change password dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Profile) => {
    const { value } = e.target;
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = async (e: React.MouseEvent) => {
    e.preventDefault();
    // Construct the payload in the specified format
    const payload = {
      name: fieldValues.name,
      phone: fieldValues.contact,
      address: fieldValues.address,
    };

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updateUser/${user.id}`, payload); // Replace with your API endpoint
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/changePassword`, {
        id: user.id,
        oldPassword: currentPassword,
        newPassword: newPassword
      },{
        withCredentials: true // Include credentials with the request
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

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            value={fieldValues.email}
            className="w-full p-2 border border-gray-300 rounded"
            disabled
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={fieldValues.name}
            onChange={(e) => handleFieldChange(e, 'name')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={fieldValues.address}
            onChange={(e) => handleFieldChange(e, 'address')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contact</label>
          <input
            type="text"
            value={fieldValues.contact}
            onChange={(e) => handleFieldChange(e, 'contact')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-col">
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
              <i className="fas fa-edit"></i> Edit Information
            </button>
          )}

          <button
            onClick={handleOpenPasswordDialog}
            className="px-4 py-2 bg-green-500 text-white rounded mt-4"
          >
            Change Password
          </button>
        </div>
      </form>

      {/* Change Password Dialog */}
      {openPasswordDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
            <h3 className="text-lg mb-4">Change Password</h3>
            <form noValidate autoComplete="off">
              <div className="mb-4">
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleClosePasswordDialog}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
