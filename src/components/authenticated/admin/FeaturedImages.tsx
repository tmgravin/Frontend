"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeaturedImages() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Upload successful');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Upload failed');
    }
  };

  return (
    <div className='text-black flex-col flex'>
      
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} className='primary-btn-blue'>
        Update Featured Images
      </button>
      <ToastContainer />
    </div>
  );
}

export default FeaturedImages;
