export interface DecodedToken {
  email: string;
  id: string;
  userType: string;
  token: string;
}

import { jwtDecode } from "jwt-decode"; // Correct import
export function getUserFromCookies(): DecodedToken | null {
  if (typeof window !== "undefined" && document.cookie) {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );

    if (tokenCookie) {
      const tokenValue = tokenCookie.split("=")[1];
      try {
        // Decode the token without verifying it
        const decoded = jwtDecode<DecodedToken>(tokenValue);
        console.log("Decoded payload:", decoded); // Log the decoded payload

        // Return the decoded payload
        return {
          email: decoded.email,
          id: decoded.id, // Assuming 'id' is the user ID field
          userType: decoded.userType,
          token: tokenValue,
        };
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    } else {
      console.error("Token cookie is not available");
      return null;
    }
  } else {
    console.error("Window or document.cookie is not available");
    return null;
  }
}

export function getTokenFromCookies(): any | null {
  if (typeof window !== "undefined" && document.cookie) {
    // Check if window and document.cookie are available
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );

    if (userCookie) {
      const userValue = userCookie.split("=")[1];
      try {
        return JSON.parse(decodeURIComponent(userValue));
      } catch (error) {
        console.error("Failed to parse user data from cookies:", error);
        return null;
      }
    } else {
      console.error("User cookie is not available");
      return null;
    }
  } else {
    console.error("Window or document.cookie is not available");
    return null;
  }
}
