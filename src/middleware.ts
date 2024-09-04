import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode'; // Ensure you have this installed

// Define the interface for the decoded JWT payload
interface DecodedToken {
  email: string;
  id: string;
  userType: string;
}

export function middleware(request: NextRequest) {
  console.log("Middleware running");

  // Extract the user cookie
  const userCookie = request.cookies.get('token'); // Adjust the cookie name as necessary
  let userType: string | null = null;

  if (userCookie) {
    try {
      // Safely decode the token
      const tokenValue = userCookie.value;
      const decoded = jwtDecode<DecodedToken>(tokenValue);

      userType = decoded.userType;
    } catch (error) {
      console.error("Failed to decode or parse user token:", error);
    }
  }

  // Get the requested URL path
  const { pathname } = request.nextUrl;

  // Check route access based on userType
  if (pathname.startsWith('/admindashboard') && userType !== 'ADMIN') {
    console.log("User is not an admin, redirecting to /homepage");
    return NextResponse.redirect(new URL('/homepage', request.url));
  }

  if (pathname.startsWith('/assignment-doer') && userType !== 'ASSIGNMENT_DOER') {
    console.log("User is not a doer, redirecting to /homepage");
    return NextResponse.redirect(new URL('/homepage', request.url));
  }

  if (pathname.startsWith('/assignment-creator') && userType !== 'ASSIGNMENT_CREATOR') {
    console.log("User is not a creator, redirecting to /homepage");
    return NextResponse.redirect(new URL('/homepage', request.url));
  }

  if (pathname.startsWith('/setting') && !userType) {
    console.log("User is not authenticated, redirecting to /homepage");
    return NextResponse.redirect(new URL('/homepage', request.url));
  }

  // Allow the request to proceed if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admindashboard/:path*',  // Protect all routes under /admindashboard/
    '/assignment-creator/:path*', // Protect all routes under /assignment-creator/
    '/assignment-doer/:path*',  // Protect all routes under /assignment-doer/
    '/setting/:path*',         // Protect all routes under /setting/
  ],
};
