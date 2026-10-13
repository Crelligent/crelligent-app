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
      { source: '/research/aehi', destination: '/aehi#report', permanent: true },
      { source: '/research/aehi/:slug', destination: '/aehi#report', permanent: true },
      // One-page AEHI: the old section pages redirect to their section on /aehi.
      { source: '/aehi/methodology', destination: '/aehi#methodology', permanent: true },
      { source: '/aehi/contribute', destination: '/aehi#take-part', permanent: true },
      { source: '/aehi/barometer', destination: '/aehi#barometer', permanent: true },
      { source: '/aehi/report', destination: '/aehi#report', permanent: true },
      { source: '/aehi/research', destination: '/aehi#research', permanent: true },
      { source: '/aehi/institutional', destination: '/aehi#partners', permanent: true },
      { source: '/aehi/partners', destination: '/aehi#partners', permanent: true },
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
