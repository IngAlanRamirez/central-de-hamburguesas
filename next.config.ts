import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.centraldehamburguesas.com',
      },
    ],
  },
}

export default nextConfig