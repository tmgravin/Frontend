"use client";

import { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Corrected import for jwtDecode

interface DecodedToken {
  name: string;
  email: string;
  picture: string;
}

export default function GoogleSignIn() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const decoded: DecodedToken = jwtDecode(credentialResponse.credential);
        setUser(decoded);
        setError(null);
        console.log("Login Success: currentUser:", decoded);

        // Optionally, send the token to your backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken: credentialResponse.credential }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        // Handle successful authentication (e.g., store session token)
      } catch (error: any) {
        console.error("Error:", error);
        setError(error.message);
      }
    } else {
      setError("No credential found. Please try again.");
    }
  };

  const onFailure = () => {
    console.log("Login failed");
    setError("Google authentication failed. Please try again.");
  };

  return (
    <div className="p-4">
      {user ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
          <img
            src={user.picture}
            alt="user image"
            className="mx-auto rounded-full"
          />
          <p className="mt-2">{user.email}</p>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          useOneTap
          logo_alignment="left"
        />
      )}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
