"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeaturedImages() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !selectedCategory) {
      toast.error('No image or category selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/${selectedCategory}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      toast.success('Upload successful');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Upload failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Featured Images</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        <option value="doer">Doer</option>
        <option value="creator">Creator</option>
        <option value="general">General</option>
      </select>
      <button
        onClick={handleImageUpload}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Upload Image
      </button>
      <ToastContainer />
    </div>
  );
}

export default FeaturedImages;
