import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import type { ReactNode } from "react";
import { AuthProvider } from '../components/auth/auth-provider'
import { Toaster } from "sonner";

//Local Fonts
const zentry = localFont({
  src: "../public/fonts/zentry-regular.woff2",
  variable: "--font-zentry",
});

const general = localFont({
  src: "../public/fonts/general.woff2",
  variable: "--font-general",
});

const circular = localFont({
  src: "../public/fonts/circularweb-book.woff2",
  variable: "--font-circular-web",
});

const robert = localFont({
  src: "../public/fonts/robert-regular.woff2",
  variable: "--font-robert-regular",
});

export const metadata: Metadata = {
  title: "Raijin Ascendancy E-Sports",
  description: "The Unified Play Layer Bridging Gaming E-Sports | Raijin",
};

const RootLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {

  return (
    
      <html lang="en" suppressHydrationWarning>
          <body
            className={`${zentry.variable} ${general.variable} ${circular.variable} ${robert.variable} antialiased`}
          >
            <AuthProvider>
              {children}
              <Toaster richColors position="top-right" />
            </AuthProvider>
          </body>
      </html>

  );
};

export default RootLayout;