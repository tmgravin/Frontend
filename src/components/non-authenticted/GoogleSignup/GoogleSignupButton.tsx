"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";

interface Props {
  userType: string;
}

const GoogleSignupButton: React.FC<Props> = ({ userType }) => {
  const handleSuccess = async (tokenResponse: any) => {
    console.log("Token Response:", tokenResponse);

    try {
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      const userData = userInfoResponse.data;
      // console.log("User Data:", userData);
      // Create a FormData object and append values
      const formData = new FormData();
      formData.append("googleaccesstoken", tokenResponse); // Google ID (unique)

      // formData.append("googleId", userData.sub); // Unique Google ID
      formData.append("name", userData.name); // Full name
      formData.append("email", userData.email); // Email address
      formData.append("picture", userData.picture); // Profile picture URL
      formData.append("is-emailVerified", "Y");
      formData.append("loginType", "googleLogin");
      formData.append("userType", userType); // The userType passed as a prop

      // Optionally, add more fields if needed

      // Send the formData using axios
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
      <span>Signup with Google</span>
    </button>
  );
};

export default GoogleSignupButton;
