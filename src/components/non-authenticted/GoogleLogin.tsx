import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Define the shape of the decoded JWT token
interface DecodedToken {
  email: string;
  name: string;
  picture?: string; // Picture may be optional
}

const GoogleLoginButton: React.FC = () => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No credential found");
      return;
    }

    try {
      // Decode the JWT token
      const decodedToken = jwtDecode<DecodedToken>(
        credentialResponse.credential
      );
      console.log("Decoded Token:", decodedToken);

      // Extract user information from the decoded token
      const userData = {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      };

      // Send user data to the backend
      axios
        .post("/api/auth/google-login", userData)
        .then((response) => {
          console.log("Backend Response:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError} /* useOneTap */
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
