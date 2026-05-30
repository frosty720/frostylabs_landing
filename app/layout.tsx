import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layouts/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";
import { ThirdwebProvider } from "thirdweb/react";
import { SITE } from "@/lib/site";

const GA_MEASUREMENT_ID = "G-X9XDDBT2WM";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: 'FrostyFi — Build autonomous on-chain agents',
  description: 'The visual platform for AI agents that act on-chain. Build workflows, run them anywhere, pay per call with x402. Now in beta.',
  keywords: ['on-chain AI agents', 'x402 payments', 'no-code AI workflows', 'web3 automation', 'agent platform', 'EVM', 'Solana'],
  authors: [{ name: 'FrostyFi' }],
  creator: 'FrostyFi',
  publisher: 'FrostyFi',

  // OpenGraph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.domain,
    siteName: 'FrostyFi',
    title: 'FrostyFi — Build autonomous on-chain agents',
    description: 'The visual platform for AI agents that act on-chain. Build workflows, run them anywhere, pay per call with x402. Now in beta.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FrostyFi - Visual platform for autonomous on-chain agents',
      }
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@FrostyLabsAi',
    creator: '@FrostyLabsAi',
    title: 'FrostyFi — Build autonomous on-chain agents',
    description: 'The visual platform for AI agents that act on-chain. Build workflows, run them anywhere, pay per call with x402. Now in beta.',
    images: ['/twitter-image.png'],
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
  "name": "FrostyFi",
  "description": "The visual platform for AI agents that act on-chain",
  "url": SITE.domain,
  "logo": `${SITE.domain}/resources/frostylogo.png`,
  "sameAs": [SITE.github, SITE.twitter],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "url": SITE.domain,
  }
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FrostyFi",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "description": "Free beta access"
  },
  "operatingSystem": "Web",
  "url": SITE.domain,
  "description": "The visual platform for AI agents that act on-chain. Build workflows, run them anywhere, pay per call with x402.",
  "screenshot": `${SITE.domain}/screenshots/workflow-builder.png`,
  "featureList": [
    "Visual no-code workflow builder",
    "x402 per-call micropayments",
    "EVM + Solana on-chain actions",
    "Agent-to-agent (A2A) protocol",
    "Secure key management with thirdweb Vault",
    "NFT-based subscription access"
  ]
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
