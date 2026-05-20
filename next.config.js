/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
