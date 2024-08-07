
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("Middleware running");
  
  const allCookies = request.cookies.getAll();
  // console.log("All Cookies:", allCookies);

  const user = request.cookies.get('user');
  console.log("User cookie:", user);

  if (!user) {
    // If user is not authenticated, redirect to the homepage
    console.log("User not authenticated, redirecting to /homepage");
    return NextResponse.redirect(new URL('/homepage', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admindashboard/:path*',  // Protect all routes under /admindashboard/
    '/assignment-creator/:path*', // Protect all routes under /assignment-creator/
    '/assignment-doer/:path*',  // Protect all routes under /protected-page/
    '/setting/:path*',         // Protect all routes under /setting/
  ],
};
