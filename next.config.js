/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
