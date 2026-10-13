import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/edge',
        destination: '/intelligent-systems',
        permanent: true,
      },
      {
        source: '/platforms/velodesk',
        destination: 'https://velodesk.crelligent.com',
        permanent: true,
      },
      // AEHI lives at crelligent.com/aehi. Old report pages and the old subdomain redirect there.
      { source: '/research/aehi', destination: '/aehi/report', permanent: true },
      { source: '/research/aehi/:slug', destination: '/aehi/report', permanent: true },
      { source: '/aehi/partners', destination: '/aehi/institutional', permanent: false },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aehi.crelligent.com' }],
        destination: 'https://crelligent.com/aehi/:path*',
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
