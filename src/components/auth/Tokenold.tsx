// // //using localstoagre not cookies here
// // export function getUserFromCookies(): any | null {
// //     if (typeof window !== 'undefined') { // Check if window is available
// //       const userLocalStorage = localStorage.getItem('user');
// //       if (userLocalStorage) {
// //         try {
// //           return JSON.parse(userLocalStorage);
// //         } catch (error) {
// //           console.error('Failed to parse user data from localStorage:', error);
// //           return null;
// //         }
// //       } else {
// //         console.error('User data is not available in localStorage');
// //         return null;
// //       }
// //     } else {
// //       console.error('Window is not available');
// //       return null;
// //     }
// //   }

// export function getUserFromCookies(): any | null {
//   if (typeof window !== "undefined" && document.cookie) {
//     // Check if window and document.cookie are available
//     const cookies = document.cookie.split(";");
//     const userCookie = cookies.find((cookie) =>
//       cookie.trim().startsWith("user=")
//     );

//     if (userCookie) {
//       const userValue = userCookie.split("=")[1];
//       try {
//         return JSON.parse(decodeURIComponent(userValue));
//       } catch (error) {
//         console.error("Failed to parse user data from cookies:", error);
//         return null;
//       }
//     } else {
//       console.error("User cookie is not available");
//       return null;
//     }
//   } else {
//     console.error("Window or document.cookie is not available");
//     return null;
//   }
// }
