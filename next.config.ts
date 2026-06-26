import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/platforms/velodesk',
        destination: 'https://velodesk.crelligent.com',
        permanent: true,
      },
      {
        source: '/platforms/prism',
        destination: 'https://prism.crelligent.com',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
