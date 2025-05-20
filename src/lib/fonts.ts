// src/lib/fonts.ts
import localFont from 'next/font/local';

export const zentry = localFont({
  src: [
    {
      path: '../public/fonts/zentry-regular.woff2',
    }
  ],
  variable: '--font-zentry',
});

export const general = localFont({
  src: [
    {
      path: '../public/fonts/general.woff2',
    }
  ],
  variable: '--font-general',
});

export const circular = localFont({
  src: [
    {
      path: '../public/fonts/circularweb-book.woff2',
    }
  ],
  variable: '--font-circular-web',
});

export const robert = localFont({
  src: [
    {
      path: '../public/fonts/robert-regular.woff2',
    }
  ],
  variable: '--font-robert-regular',
});