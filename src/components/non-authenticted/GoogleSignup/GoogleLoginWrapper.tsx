"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignupButton from "./GoogleSignupButton";

const GoogleLoginWrapper: React.FC<{ type: string }> = ({ type }) => (
  <GoogleOAuthProvider
    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
  >
    <GoogleSignupButton userType={type} />
  </GoogleOAuthProvider>
);

export default GoogleLoginWrapper;
