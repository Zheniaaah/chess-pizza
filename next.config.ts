import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dodobrands.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
