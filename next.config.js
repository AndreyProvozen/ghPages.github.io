/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  images: {
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    formats: ['image/avif', 'image/webp'],
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
