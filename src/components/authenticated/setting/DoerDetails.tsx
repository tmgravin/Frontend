"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/cookie/oldtoken";
import { ToastContainer, toast } from "react-toastify";
import ChangePasswordDialog from "./ChangePasswordDialog";
import useUserData from "@/components/providers/UserProvider";
import ImageDetails from "./ImageDetails";
const cookieuser = getUserFromCookies();

interface User {
  name: string;
  email?: string;
  address: string;
  phone: string;
  userType: string;
  cv: string | null;
  profilePicture?: string;
  cvUrl?: string;
}

const UserDetails: React.FC = () => {
  const { user, setUser, fieldValues, setFieldValues, fetchData } =
    useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCV, setSelectedCV] = useState<File | null>(null); // New state for CV file
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    const { value } = e.target;
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Create FormData instance
    const formData = new FormData();
    formData.append("name", fieldValues.name || "");
    formData.append("phone", fieldValues.phone || "");
    formData.append("address", fieldValues.address || "");
    if (selectedCV) {
      formData.append("cv", selectedCV);
    }

    try {
      // Send PUT request with FormData
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updateUser/${cookieuser?.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
            "Content-Type": "multipart/form-data", // Set header for FormData
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        //  setUser(fieldValues);
        setIsEditing(false);
        setSelectedCV(null);
        fetchData();
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  const handleOpenPasswordDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedCV(e.target.files[0]); // Set the selected CV file
    }
  };

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedCV(e.target.files[0]); // Set the selected CV file
    }
  };

  const getFileNameFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="container mx-auto  p-4 max-w-lg">
      <h2 className="text-2xl mb-4">Personal Information</h2>

      <ImageDetails />

      <form noValidate autoComplete="off">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            value={fieldValues.email || ""}
            readOnly
            className="w-full bg-gray-100 rounded-md py-2 px-4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={fieldValues.name}
            onChange={(e) => handleFieldChange(e, "name")}
            readOnly={!isEditing}
            className={`w-full ${
              isEditing ? "bg-white" : "bg-gray-100"
            } rounded-md py-2 px-4`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={fieldValues.address}
            onChange={(e) => handleFieldChange(e, "address")}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contact</label>
          <input
            type="text"
            value={fieldValues.phone}
            onChange={(e) => handleFieldChange(e, "phone")}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        {/* Other fields... */}

        <div className="mb-4">
          <label className="block text-gray-700">
            <div className="flex flex-row">
              <label className="block text-gray-700">Your CV:</label>
              <div className="ml-2 text-green-500">
                {fieldValues.cvUrl ? (
                  <a href={fieldValues.cvUrl} download>
                    {getFileNameFromUrl(fieldValues.cvUrl)}
                  </a>
                ) : (
                  <span>No CV available</span>
                )}
              </div>
            </div>
          </label>
          {fieldValues.cvUrl ? (
            <div>
              {isEditing && (
                <div className="mt-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              )}
            </div>
          ) : (
            isEditing && (
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!isEditing}
                />
                <p className="mt-2 text-gray-600">Choose file to upload</p>
              </div>
            )
          )}
        </div>
        {/* Save and cancel buttons */}
        <div className="flex flex-row">
          <div className="flex justify-center">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
              >
                Edit Profile
              </button>
            ) : (
              <div>
                <button
                  onClick={handleSaveAll}
                  className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 my-4 sm:my-0"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="ml-2  sm:mt-0 bg-gray-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-gray-500 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center ml-4">
            <button
              onClick={handleOpenPasswordDialog}
              className="ml-2 primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
            >
              Change Password
            </button>
          </div>
        </div>
      </form>

      {/* Change Password Dialog */}
      {openPasswordDialog && (
        <ChangePasswordDialog
          userId={cookieuser?.id}
          onClose={handleClosePasswordDialog}
        />
      )}
    </div>
  );
};

export default UserDetails;
