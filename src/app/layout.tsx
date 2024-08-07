import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Poppins({weight:"500" , subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSP Assignment",
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


      <body className={inter.className}>{children}</body>
      
    </html>
  );
}
