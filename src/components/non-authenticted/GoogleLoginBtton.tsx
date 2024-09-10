// // components/GoogleLoginButton.tsx
// "use client";
// import { useEffect } from "react";
// import Script from "next/script";

// const GoogleLoginButton = () => {
//   useEffect(() => {
//     // Check if google accounts is loaded
//     if (window.google && window.google.accounts && window.google.accounts.id) {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById("google-signin-button"),
//         { theme: "outline", size: "large" }
//       );

//       window.google.accounts.id.prompt(); // Prompt the user to sign in
//     }
//   }, []);

//   const handleCredentialResponse = (response) => {
//     fetch("/api/auth/google-login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id_token: response.credential,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Backend response:", data);
//         // Handle response from your backend
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div>
//       <div id="google-signin-button"></div>
//       <Script
//         src="https://accounts.google.com/gsi/client"
//         strategy="beforeInteractive" // Ensures the script is loaded before the component mounts
//         onLoad={() => {
//           if (
//             window.google &&
//             window.google.accounts &&
//             window.google.accounts.id
//           ) {
//             window.google.accounts.id.initialize({
//               client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//               callback: handleCredentialResponse,
//             });

//             window.google.accounts.id.renderButton(
//               document.getElementById("google-signin-button"),
//               { theme: "outline", size: "large" }
//             );

//             window.google.accounts.id.prompt(); // Prompt the user to sign in
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default GoogleLoginButton;
