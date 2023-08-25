/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  publicRuntimeConfig: { API_HOST: process.env.API_HOST, MONGODB_URI: process.env.MONGODB_URI },
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

module.exports = withBundleAnalyzer(withPWA(nextConfig));
