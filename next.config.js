/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: "build",
  // output: 'export',
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
