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

const DoerDetails: React.FC = () => {
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
  const [isEditingImage, setIsEditingImage] = useState(false);

  // State for field values
  const [fieldValues, setFieldValues] = useState<Profile>(profile);

  // State for change password dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Profile
  ) => {
    const { value } = e.target;
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = async (e: React.MouseEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (cvFile) {
      formData.append("cv", cvFile);
    }
    formData.append("name", fieldValues.name);
    formData.append("phone", fieldValues.contact);
    formData.append("address", fieldValues.address);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updateUser/${user.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setProfile(fieldValues);
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  const handleSavePicture = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("imageUrl", selectedFile);

    try {
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
      if (response.status === 200) {
        const pictureUrl = URL.createObjectURL(selectedFile);
        setProfile((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setFieldValues((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setSelectedFile(null);
        toast.success("Profile picture updated successfully");
      } else {
        toast.error("Failed to update profile picture");
      }
    } catch (error) {
      toast.error("Error updating profile picture");
      console.error("Error updating profile picture:", error);
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
        setProfile((prev) => ({ ...prev, profilePicture: "" }));
        setFieldValues((prev) => ({ ...prev, profilePicture: "" }));
        toast.success("Profile picture deleted successfully");
      } else {
        toast.error("Failed to delete profile picture");
      }
    } catch (error) {
      toast.error("Error deleting profile picture");
      console.error("Error deleting profile picture:", error);
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

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCvFile(e.target.files[0]);
    }
  };

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${user.id}`
        );
        const imageUrl = response.data; // Assuming the URL is returned directly
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
          <button
            onClick={() => setIsEditingImage(true)}
            className="primary-orange"
          >
            <i className="fas fa-camera"></i>
          </button>
          {isEditingImage && (
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
                Save Picture
              </button>
              <button
                onClick={deletePicture}
                className="bg-orange-500 rounded-sm px-3 py-1 ml-2 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
              >
                Delete Picture
              </button>
              <button
                onClick={() => setIsEditingImage(false)}
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
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            value={fieldValues.contact}
            onChange={(e) => handleFieldChange(e, "contact")}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">CV</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleCvChange}
            disabled={!isEditing}
            className="mb-2"
          />
          {/* <button
            onClick={handleSaveAll}
            className="px-4 py-2 primary-orangebg text-white rounded"
            disabled={!isEditing}
          >
            Save CV
          </button> */}
        </div>

        {isEditing ? (
          <div className="flex  mt-4">
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-4 py-2 primary-orangebg text-white rounded mr-2"
            >
              Save All
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          >
            Edit
          </button>
        )}
      </form>

      <div className="mt-4">
        <button
          onClick={handleOpenPasswordDialog}
          className="bg-orange-500 rounded-sm px-3 py-1 mt-3 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
        >
          Change Password
        </button>
      </div>

      {openPasswordDialog && (
        <ChangePasswordDialog
          userId={user.id}
          onClose={handleClosePasswordDialog}
        />
      )}
    </div>
  );
};

export default DoerDetails;
