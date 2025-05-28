import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com', 
      'robohash.org',
      'cdn.discordapp.com',        // Discord avatars
      'api.mozambiquehe.re',       // Apex API images
      'media.contentapi.ea.com'    // EA/Apex official images
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    NEXT_PUBLIC_API_ENDPOINT: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_ENDPOINT 
      : 'http://localhost:3001',
  },

  // Add webpack configuration to handle GSAP SSR issues
  webpack: (config, { isServer }) => {
    // Handle GSAP on the server side
    if (isServer) {
      config.externals.push({
        gsap: 'gsap',
        'gsap/ScrollTrigger': 'gsap/ScrollTrigger'
      });
    }
    
    return config;
  },

  // Disable static generation for problematic pages during build
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
};

export default nextConfig;