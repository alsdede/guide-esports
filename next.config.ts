import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.lolesports.com',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
