"use client";

import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";

// Define the shape of the decoded JWT token
interface DecodedToken {
  email: string;
  name: string;
  picture?: string;
}

const GoogleLoginButton: React.FC = () => {
  const handleSuccess = async (tokenResponse: any) => {
    console.log("Token Response:", tokenResponse);

    try {
      // Fetch user info using the access token
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      const userData = userInfoResponse.data;
      console.log("User Data:", userData);

      // Create a FormData object and append user data with custom keys
      const formData = new FormData();
      formData.append("googleId", userData.sub); // Google ID (unique)
      formData.append("fullName", userData.name); // Full name
      formData.append("email", userData.email); // Email address
      formData.append("profilePic", userData.picture); // Profile picture URL

      // Send the FormData to the backend
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/googlesignup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Specify form-data content type
            },
          }
        )
        .then((response) => {
          console.log("Backend Response:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => console.log("Login Failed"),
  });

  return (
    <button
      type="button"
      className="w-full border border-gray-300 text-gray-700 font-medium rounded-lg text-sm flex items-center justify-center space-x-2 px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={() => login()}
    >
      <Image
        src="/pngs/googleicon.svg"
        alt="Google icon"
        width={20}
        height={20}
      />
      <span>Login with Google</span>
    </button>
  );
};

const GoogleLoginWrapper: React.FC = () => (
  <GoogleOAuthProvider
    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
  >
    <GoogleLoginButton />
  </GoogleOAuthProvider>
);

export default GoogleLoginWrapper;
