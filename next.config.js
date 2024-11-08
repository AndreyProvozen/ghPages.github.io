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
  serverRuntimeConfig: { MONGODB_URI: process.env.MONGODB_URI },
  publicRuntimeConfig: { API_HOST: process.env.API_HOST },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-cache, must-revalidate, max-age=0' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
      ],
    },
  ],
  images: {
    deviceSizes: [420, 768, 1024, 1280],
    formats: ['image/avif', 'image/webp'],
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: false,
  },
  eslint: { ignoreDuringBuilds: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.module = true;
      config.experiments = { ...config.experiments, topLevelAwait: true, outputModule: true };
      config.optimization = { ...config.optimization, concatenateModules: true };
    }

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: 'babel-loader',
      options: {
        presets: ['next/babel'],
        plugins: [
          [
            'transform-imports',
            {
              '@/atoms': { transform: 'src/atoms/${member}', preventFullImport: true },
              '@/icons': { transform: 'src/icons/${member}', preventFullImport: true },
              '@/components': { transform: 'src/components/${member}', preventFullImport: true },
              '@/utils': { transform: 'src/utils/${member}', preventFullImport: true },
            },
          ],
          process.env.NODE_ENV === 'production' ? '@babel/plugin-transform-classes' : null,
        ].filter(Boolean),
      },
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
