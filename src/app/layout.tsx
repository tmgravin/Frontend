import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectProvider } from "@/components/providers/ProjectProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { cn } from "@/lib/utils";

const inter = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSP Academy",
  description: "MSP Assignment is a .....",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/deb7916e2f.js"></Script>
      <Script src="https://accounts.google.com/gsi/client"></Script>

      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <ProjectProvider>
          <body
            className={cn(inter.className, "antialiased overflow-x-hidden")}
          >
            {children}
            <ToastContainer />
          </body>
        </ProjectProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
