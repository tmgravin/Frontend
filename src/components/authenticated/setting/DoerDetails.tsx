"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { getUserFromCookies } from "@/components/auth/token";
import { ToastContainer, toast } from "react-toastify";
import ChangePasswordDialog from "./ChangePasswordDialog";
import useUserData from "@/components/providers/UserProvider";
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

  useEffect(() => {
    fetchImage();
  }, []); // Only run fetchImage once on initial render

  const { user, setUser, fieldValues, setFieldValues, fetchData } =
    useUserData();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  // const [fieldValues, setFieldValues] = useState<User>(user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCV, setSelectedCV] = useState<File | null>(null); // New state for CV file
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

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

  const handleSavePicture = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("imageUrl", selectedFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${cookieuser?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Profile picture updated successfully");
        const pictureUrl = URL.createObjectURL(selectedFile);
        // setUser((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setFieldValues((prev) => ({ ...prev, profilePicture: pictureUrl }));
        setSelectedFile(null);
        fetchImage();
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${cookieuser?.id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Profile picture deleted successfully");
        // setUser((prev) => ({ ...prev, profilePicture: undefined }));
        setFieldValues((prev) => ({ ...prev, profilePicture: undefined }));
        fetchImage();
      } else {
        console.error("Failed to delete profile picture");
      }
    } catch (error) {
      console.error("Error deleting profile picture:", error);
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
      setSelectedCV(e.target.files[0]); // Set the selected CV file
    }
  };

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedCV(e.target.files[0]); // Set the selected CV file
    }
  };
  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${cookieuser?.id}`
      );
      const imageUrl = await response.data;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching the image URL:", error);
    }
  };

  const getFileNameFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="container mx-auto font-bold p-4 max-w-lg">
      <ToastContainer />
      <h2 className="text-2xl mb-4">Personal Information</h2>

      <div className="flex items-center justify-center mb-4">
        <Image
          src={imageUrl || "/default-img.png"}
          alt="Profile Picture"
          width={96}
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
                Change Picture
              </button>
              <button
                onClick={deletePicture}
                className="ml-2 bg-orange-500 rounded-sm px-3 py-1 text-white transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
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
                className="px-4 py-2 bg-orange-500 text-white rounded mr-2"
              >
                Edit Profile
              </button>
            ) : (
              <div>
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-orange-500 text-white rounded mr-2"
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
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Change Password
            </button>
          </div>
        </div>
      </form>

      {/* Change Password Dialog */}
      {openPasswordDialog && (
        <ChangePasswordDialog
          userId={cookieuser.id}
          onClose={handleClosePasswordDialog}
        />
      )}
    </div>
  );
};

export default UserDetails;
