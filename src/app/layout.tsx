import type { Metadata } from "next";
import "../styles/globals.css";
import { Toaster } from "../components/ui/sonner";

//import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Providers } from "./providers";

import { zentry } from '@/lib/fonts';
import { general } from '@/lib/fonts';
import { circular } from '@/lib/fonts';
import { robert } from '@/lib/fonts';

// Local Fonts
// const zentry = localFont({
//   src: "../../public/fonts/zentry-regular.woff2",
//   variable: "--font-zentry",
// });

// const general = localFont({
//   src: "../../public/fonts/general.woff2",
//   variable: "--font-general",
// });

// const circular = localFont({
//   src: "../../public/fonts/circularweb-book.woff2",
//   variable: "--font-circular-web",
// });

// const robert = localFont({
//   src: "../../public/fonts/robert-regular.woff2",
//   variable: "--font-robert-regular",
// });

export const metadata: Metadata = {
  title: "Raijin Ascendancy E-Sports",
  description: "The Unified Play Layer Bridging Gaming, AI, and Blockchain | Raijin",
};

const RootLayout = async ({
  children,
}: {
  children: ReactNode;
}) =>{

  return (
    <html lang="en" suppressHydrationWarning>
        <body
          className={`${zentry.variable} ${general.variable} ${circular.variable} ${robert.variable} antialiased`}
        >
          <Providers>
            {children}
            <Toaster richColors position="bottom-right" />
          </Providers>
        </body>
    </html>
  );
};

export default RootLayout;