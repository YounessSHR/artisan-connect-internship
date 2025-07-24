

/** @type {import('next').NextConfig} */
const nextConfig = {
  // config options here
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  allowedDevOrigins: [
    "https://3000-firebase-studio-1752748070845.cluster-c3a7z3wnwzapkx3rfr5kz62dac.cloudworkstations.dev",
    "https://bxj68g3w-3000.uks1.devtunnels.ms"
  ],
};

module.exports = nextConfig;
