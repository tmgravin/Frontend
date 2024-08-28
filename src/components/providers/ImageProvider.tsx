"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getUserFromCookies } from "@/components/auth/token";

// Define the context state type for managing image data
interface ImageContextType {
  imageUrl: string;
  fetchImage: () => void;
}

// Create the context with default values
const ImageContext = createContext<ImageContextType>({
  imageUrl: "",
  fetchImage: () => {},
});

// Create a custom hook to use the ImageContext
export const useImageContext = () => useContext(ImageContext);

// Create the provider component to manage image data
export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const user = getUserFromCookies(); // Fetch user data once from cookies

  // Fetch image URL based on the user data
  const fetchImage = async () => {
    try {
      if (!user?.id) return; // Ensure user exists and has an ID
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/image/${user.id}`
      );
      setImageUrl(response.data);
    } catch (error) {
      console.error("Error fetching the image URL:", error);
    }
  };

  // Fetch image when the component mounts or when user data is available
  useEffect(() => {
    fetchImage();
  }, []);

  // Provide the context values
  return (
    <ImageContext.Provider value={{ imageUrl, fetchImage }}>
      {children}
    </ImageContext.Provider>
  );
};
