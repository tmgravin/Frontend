"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { getUserFromCookies } from "@/components/cookie/oldtoken"; // Adjust the path as necessary
import { ToastContainer, toast } from "react-toastify";
import ChangePasswordDialog from "./ChangePasswordDialog";
import useAdminData from "@/components/providers/AdminProvides";
import ImageDetails from "./ImageDetails";
import AdminImageDetails from "./AdminImageDetails";

// Default user object if getUserFromCookies returns null
const cookieuser = getUserFromCookies();

interface User {
  name: string;
  email?: string;
  address: string;
  phone: string;
  userType: string;
  cv: string | null;
  profilePicture?: string;
}

const AdminDetails: React.FC = () => {
  const { user, setUser, fieldValues, setFieldValues, fetchData } =
    useAdminData();
  const [isEditing, setIsEditing] = useState(false);
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

    try {
      // Send PUT request with FormData
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/updateAdmin/${cookieuser?.id}`,
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
        setIsEditing(false);
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

  return (
    <div className="container mx-auto font-bold p-4 max-w-lg">
      <ToastContainer />
      <h2 className="text-2xl mb-4">Personal Information</h2>

      <AdminImageDetails />

      <form noValidate autoComplete="off">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            value={fieldValues.email || ""}
            className="w-full p-2 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={fieldValues.name}
            onChange={(e) => handleFieldChange(e, "name")}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
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
                  className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center ml-4">
            <button
              onClick={handleOpenPasswordDialog}
              className="primary-orangebg rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
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

export default AdminDetails;
