import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  email: string;
  id: string;
  userType: string;
  token: string;
}

export function getUserFromCookies(): DecodedToken | null {
  if (typeof window !== "undefined" && document.cookie) {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );

    if (tokenCookie) {
      // Extract and clean the token value
      const tokenValue = tokenCookie.split("=")[1];
      const cleanedTokenValue = decodeURIComponent(tokenValue).replace(
        /^"|"$/g,
        ""
      ); // Remove extra quotes if present

      // console.log(cleanedTokenValue);
      try {
        // Decode the token without verifying it
        const decoded = jwtDecode<DecodedToken>(cleanedTokenValue);
        // console.log("Decoded payload:", decoded);
        // Log the decoded payload

        // Return the decoded payload
        return {
          email: decoded.email,
          id: decoded.id, // Assuming 'id' is the user ID field
          userType: decoded.userType,
          token: cleanedTokenValue,
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
