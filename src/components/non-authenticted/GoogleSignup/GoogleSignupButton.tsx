"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUserFromCookies } from "@/components/cookie/oldtoken";

interface Props {
  userType: string;
}

const GoogleSignupButton: React.FC<Props> = ({ userType }) => {
  const router = useRouter();
  function setTokenCookie(token: string) {
    // Encode the token value directly
    const tokenValue = encodeURIComponent(token);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Cookie expires in 7 days

    // Set the cookie with the token value
    document.cookie = `token=${tokenValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  }
  const handleSuccess = async (tokenResponse: any) => {
    // console.log("Token Response:", tokenResponse);

    // try {
    //   const userInfoResponse = await axios.get(
    //     "https://www.googleapis.com/oauth2/v3/userinfo",
    //     { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
    //   );
    //   const userData = userInfoResponse.data;
    //   console.log(userData);
    // } catch (error) {
    //   console.error("Error fetching user info:", error);
    //   toast.error("Failed to retrieve user info from Google.");
    // }

    const formData = new FormData();
    formData.append("googleAccessToken", tokenResponse.access_token);
    formData.append("userType", userType);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/google/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setTokenCookie(response.data); // Set token data in cookie
        const user = getUserFromCookies();
        if (user) {
          console.log("User from login:", user.userType, user.token);
          toast.success("Signup successful! ");
          if (user.userType === "ASSIGNMENT_CREATOR") {
            router.push(
              `${process.env.NEXT_PUBLIC_FRONTEND_URL}/project-creator`
            );
          } else if (user.userType === "ASSIGNMENT_DOER") {
            router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/project-doer`);
          }
        } else {
          console.error("Failed to retrieve user token or token not found.");
        }
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your email and credentials.";
      toast.error(errorMessage);
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
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleSignupButton;
