import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectProvider } from "@/components/providers/ProjectProvider";
import { ImageProvider } from "@/components/providers/ImageProvider";
import ErrorBoundary from "@/components/ErrorBoundary"; // You'll need to create this component

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
      <ErrorBoundary>
        <ProjectProvider>
          <ImageProvider>
            <body className={inter.className}>
              {children}
              <ToastContainer />
            </body>
          </ImageProvider>
        </ProjectProvider>
      </ErrorBoundary>
    </html>
  );
}
