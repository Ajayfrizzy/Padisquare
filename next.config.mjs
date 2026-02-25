/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // Allow external images from Unsplash for demo purposes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
