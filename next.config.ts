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
      {
        protocol: 'https',
        hostname: 'noticias.maisesports.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
