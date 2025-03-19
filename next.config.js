/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-leaflet', 'leaflet', '@react-leaflet/core', 'react-leaflet-draw'],
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = { fs: false, path: false };
    
    return config;
  }
};

module.exports = nextConfig; 