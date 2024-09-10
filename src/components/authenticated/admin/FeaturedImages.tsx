"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { getUserFromCookies } from "@/components/cookie/oldtoken";

const cookieuser = getUserFromCookies();

interface ImageData {
  id: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}

function FeaturedImages() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/`,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
          },
          withCredentials: true,
        }
      );
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setPreview(null);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !selectedCategory) {
      toast.error("No image or category selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/${selectedCategory}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Upload successful");
      setSelectedImage(null);
      setPreview(null);
      setSelectedCategory("");
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Upload failed");
    }
  };

  const handleDeleteImage = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureImages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookieuser?.token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Image deleted successfully");
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Update Featured Images
      </h2>

      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {preview && (
          <div className="mt-4">
            <Image
              src={preview}
              width={160}
              height={90}
              alt="Selected Preview"
              className="w-48 h-48 object-cover rounded-md"
            />
          </div>
        )}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option value="doer">Doer</option>
          <option value="creator">Creator</option>
          <option value="general">General</option>
        </select>
        <button
          onClick={handleImageUpload}
          className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Upload Image
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Featured Images</h3>
        {["general", "creator", "doer"].map((category) => (
          <div key={category} className="mb-6">
            <h4 className="text-lg font-medium mb-2 capitalize">{category}</h4>
            <div className="grid grid-cols-3 gap-4">
              {images
                .filter((image) => image.category === category)
                .map((image) => (
                  <div key={image.id} className="relative">
                    <Image
                      src={image.imageUrl}
                      width={160}
                      height={90}
                      alt={`${category} image`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {new Date(image.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default FeaturedImages;
