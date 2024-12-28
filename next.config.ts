import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.sanity.io'], // Add Sanity's image CDN hostname
  },
};

export default nextConfig;
