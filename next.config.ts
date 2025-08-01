import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();


const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
        {
        protocol: 'http',
        hostname: 'static.lolesports.com',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'lolstatic-a.akamaihd.net',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
