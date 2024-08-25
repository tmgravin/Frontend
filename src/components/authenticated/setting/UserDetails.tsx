"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { getUserFromCookies } from "@/components/auth/token"; // Adjust the path as necessary
import { ToastContainer, toast } from "react-toastify";
import ChangePasswordDialog from "./ChangePasswordDialog";
// Default user object if getUserFromCookies returns null
const user = getUserFromCookies() || {
  id: "",
  name: "",
  email: "",
  address: "",
  phone: "",
  profilePicture: "",
  userType: "",
};

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
    profilePicture: user.profilePicture,
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for field values
  const [fieldValues, setFieldValues] = useState<Profile>(profile);

  // State for change password dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Profile
  ) => {
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
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updateUser/${user.id}`,
        payload,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        console.log("Profile updated successfully");

        setProfile(fieldValues);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profiles");
      console.error("Error updating profile:", error);
    }
  };

  const handleSavePicture = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("imageUrl", selectedFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        toast.success("Profile picture updated successfully");
        const pictureUrl = URL.createObjectURL(selectedFile);
        setProfile((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setFieldValues((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setSelectedFile(null);
      } else {
        toast.error("Failed to update profile picture");
      }
    } catch (error) {
      toast.error("Error updating profile picture:");
    }
  };

  const deletePicture = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${user.id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Profile picture deleted successfully");
        toast.success("Profile picture deleted successfully");
      } else {
        console.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Error deleting profile picture");
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
      setSelectedFile(e.target.files[0]);
    }
  };

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${user.id}`
        );
        const imageUrl = await response.data;
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching the image URL:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="container mx-auto font-bold p-4 max-w-lg">
      <ToastContainer />
      <h2 className="text-2xl mb-4">Personal Information</h2>

      {/* Profile Picture */}
      <div className="flex items-center justify-center mb-4">
        <Image
          src={imageUrl || "/default-img.png"} // Default profile picture if none provided
          alt="Profile Picture"
          width={96} // Set width and height for optimization
          height={96}
          className="w-24 h-24 rounded-full"
        />
        <div className="ml-4">
          <button onClick={() => setIsEditing(true)} className="primary-orange">
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
                className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
              >
                Change Picture
              </button>
              <button
                onClick={deletePicture}
                className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
              >
                Delete Picture
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded ml-2 mt-2"
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
            value={fieldValues.contact}
            onChange={(e) => handleFieldChange(e, "contact")}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-col">
          {isEditing ? (
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSaveAll}
                className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
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
              className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
            >
              <i className="fas fa-edit"></i> Edit Information
            </button>
          )}

          <button
            onClick={handleOpenPasswordDialog}
            className="px-4 py-2 primary-orangebg text-white rounded mt-2"
          >
            <i className="fa-solid fa-key"></i> Change Password
          </button>
        </div>
      </form>

      {/* Change Password Dialog */}
      {openPasswordDialog && (
        <ChangePasswordDialog
          userId={user.id}
          onClose={handleClosePasswordDialog}
        />
      )}
    </div>
  );
};

export default UserDetails;
