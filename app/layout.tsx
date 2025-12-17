import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layouts/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";
import { ThirdwebProvider } from "thirdweb/react";

const GA_MEASUREMENT_ID = "G-X9XDDBT2WM";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://frostylabs.ai'),
  title: "FrostyLabs - Build AI Agents for Web3 | Research • DeFi • NFTs • DAOs & More",
  description: "Build AI-powered workflows for anything in Web3. Automate research, DeFi operations, NFT minting, DAO governance, and more across 35+ networks. No-code automation. Free beta launching December 2025.",
  keywords: ["AI Web3 automation", "blockchain AI agents", "no-code DeFi automation", "AI workflow builder", "NFT automation", "DAO automation", "Web3 AI tools", "crypto automation", "blockchain automation"],
  authors: [{ name: "FrostyLabs.ai" }],
  creator: "FrostyLabs.ai",
  publisher: "FrostyLabs.ai",

  // OpenGraph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frostylabs.ai',
    siteName: 'FrostyLabs',
    title: "FrostyLabs - Build AI Agents for Web3",
    description: "Build AI-powered workflows for anything in Web3. Automate research, DeFi operations, NFT minting, DAO governance, and more across 35+ networks.",
    images: [
      {
        url: '/og-image.png', // You'll add this image
        width: 1200,
        height: 630,
        alt: 'FrostyLabs - AI Workflow Automation for Web3',
      }
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@FrostyLabsAi',
    creator: '@FrostyLabsAi',
    title: "FrostyLabs - Build AI Agents for Web3",
    description: "Build AI-powered workflows for anything in Web3. Automate research, DeFi, NFTs, DAOs & more across 35+ networks.",
    images: ['/twitter-image.png'], // You'll add this image
  },

  // Additional
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // google: 'your-google-verification-code', // Add when you have it
    // yandex: 'your-yandex-verification-code',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FrostyLabs",
  "description": "AI-powered workflow automation platform for Web3",
  "url": "https://frostylabs.ai",
  "logo": "https://frostylabs.ai/resources/frostylogo.png",
  "sameAs": [
    "https://github.com/FrostyLabsAi",
    "https://x.com/FrostyLabsAi"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "url": "https://frostylabs.ai"
  }
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FrostyLabs",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "description": "Free beta access"
  },
  "operatingSystem": "Web",
  "description": "Build AI-powered workflows for anything in Web3. Automate research, DeFi operations, NFT minting, DAO governance, and more.",
  "screenshot": "https://frostylabs.ai/screenshots/workflow-builder.png",
  "featureList": [
    "20+ AI models including GPT-4, Claude, Gemini",
    "35+ blockchain networks supported",
    "15+ blockchain operations (swap, stake, mint, deploy)",
    "No-code visual workflow builder",
    "Secure key management with thirdweb Vault",
    "NFT-based subscription access"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "ratingCount": "1"
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/resources/frostylogo.png" />
        <link rel="apple-touch-icon" href="/resources/frostylogo.png" />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* JSON-LD Schema Markup */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="software-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className={`${orbitron.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThirdwebProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </ThirdwebProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
