"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    profilePicture:'',
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

  const handleEditToggle = (field: keyof Profile, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async (field: keyof Profile, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.put(`/api/profile/${field}`, { // Replace with your API endpoint
        [field]: fieldValues[field]
      });
      if (response.status === 200) {
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

  const handleSavePicture = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const response = await axios.put('/api/profile/picture', formData); // Replace with your API endpoint
      if (response.status === 200) {
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
  
        <img
          src={fieldValues.profilePicture || '/default-profile.png'} // Default profile picture if none provided
          alt="Profile Picture"
          className="w-24 h-24 rounded-full"
        />
            <p>user roles</p>
     
        <div className="ml-4">
          <button
            onClick={(e) => handleEditToggle('picture', e)}
            className="text-blue-500"
          >
            <i className="fas fa-camera"></i>
          </button>
          {isEditing.picture && (
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
                onClick={(e) => handleEditToggle('picture', e)}
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
          <label className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={fieldValues.name}
            onChange={(e) => handleFieldChange(e, 'name')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing.name}
          />
          <div className="flex justify-end mt-2">
            {isEditing.name ? (
              <>
                <button
                  onClick={(e) => handleSave('name', e)}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={(e) => handleEditToggle('name', e)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={(e) => handleEditToggle('name', e)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                <i className="fas fa-edit"></i>
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={fieldValues.email}
            onChange={(e) => handleFieldChange(e, 'email')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing.email}
          />
          <div className="flex justify-end mt-2">
            {isEditing.email ? (
              <>
                <button
                  onClick={(e) => handleSave('email', e)}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={(e) => handleEditToggle('email', e)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={(e) => handleEditToggle('email', e)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                <i className="fas fa-edit"></i>
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={fieldValues.address}
            onChange={(e) => handleFieldChange(e, 'address')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing.address}
          />
          <div className="flex justify-end mt-2">
            {isEditing.address ? (
              <>
                <button
                  onClick={(e) => handleSave('address', e)}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={(e) => handleEditToggle('address', e)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={(e) => handleEditToggle('address', e)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                <i className="fas fa-edit"></i>
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={fieldValues.contact}
            onChange={(e) => handleFieldChange(e, 'contact')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing.contact}
          />
          <div className="flex justify-end mt-2">
            {isEditing.contact ? (
              <>
                <button
                  onClick={(e) => handleSave('contact', e)}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={(e) => handleEditToggle('contact', e)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={(e) => handleEditToggle('contact', e)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                <i className="fas fa-edit"></i>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleOpenPasswordDialog}
          className="px-4 py-2 primary-btn-blue text-white rounded mt-4"
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
