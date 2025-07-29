import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import "../globals.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bet Esports - Apostas Esportivas",
  description: "A melhor plataforma para apostar em esports",
};

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 border-t border-white/10  `}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 1728 1180"
            fill="currentColor"
            className="absolute w-full h-full min-h-screen top-0 left-0 pointer-events-none z-10 lg:z-20"
          >
            <g filter="url(#filter0_f_226_149)">
              <path
                d="M2123.75 293.105C1333.23 688.128 703.641 515.327 508.724 374.099C452.243 349.269 313.169 228.867 73.6286 197.922C-225.797 159.242 110.578 663.582 380.092 782.356C649.606 901.131 1580.73 925.224 2029.92 784.99C2601.98 606.399 3111.92 -200.674 2123.75 293.105Z"
                fill="url(#paint0_radial_226_149)"
                fillOpacity="0.45"
              ></path>
            </g>
            <defs>
              <filter
                id="filter0_f_226_149"
                x="-342.14"
                y="-163"
                width="3323.17"
                height="1342.42"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="149.181"
                  result="effect1_foregroundBlur_226_149"
                ></feGaussianBlur>
              </filter>
              <radialGradient
                id="paint0_radial_226_149"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(2522.36 771.207) rotate(-178.79) scale(2230.36 879.25)"
              >
                <stop stopColor="#6248FF"></stop>
                <stop offset="0.269278" stopColor="#E5FF48"></stop>
                <stop offset="0.588842" stopColor="#FF48ED"></stop>
                <stop offset="0.508333" stopColor="#48BDFF"></stop>
                <stop offset="0.632292" stopColor="#6248FF"></stop>
              </radialGradient>
            </defs>
          </svg>
          {children}
             {/* Language Switcher */}
      <LanguageSwitcher locale={locale} />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
