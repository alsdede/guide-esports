import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();


const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.lolesports.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
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
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.communitydragon.org',
        pathname: '/**',
      },
   
    ],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
