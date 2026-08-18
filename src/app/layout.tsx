import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Outfit, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crelligent.com"),
  title: {
    default: "Crelligent | ESRE OS — The Enterprise Operating System for Africa",
    template: "%s | Crelligent",
  },
  description: "Crelligent installs and maintains ESRE OS — the enterprise operating system for African mid-market companies. Five capability layers. Continuous monitoring. One OS Performance Score.",
  keywords: [
    "ESRE OS",
    "enterprise operating system Africa",
    "enterprise systems architecture Nigeria",
    "African Enterprise Health Index",
    "AEHI",
    "enterprise health benchmark Nigeria",
    "operating model design Nigeria",
    "systems design Africa",
    "PRISM operational intelligence",
    "CEM industrial IoT Africa",
    "enterprise OS score",
    "Nigerian mid-market consulting",
    "Crelligent Lagos",
  ],
  authors: [{ name: "Crelligent", url: "https://crelligent.com" }],
  creator: "Crelligent",
  publisher: "Crelligent",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Crelligent | ESRE OS — Enterprise Operating System",
    description: "Crelligent installs and maintains ESRE OS — the enterprise operating system for African mid-market companies. Five capability layers. Continuous monitoring. One OS Performance Score.",
    url: "https://crelligent.com",
    siteName: "Crelligent",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crelligent | ESRE OS — Enterprise Operating System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crelligent | ESRE OS — Enterprise Operating System",
    description: "Crelligent installs and maintains ESRE OS — the enterprise operating system for African mid-market companies. Five capability layers. Continuous monitoring. One OS Performance Score.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://crelligent.com/#organization",
      name: "Crelligent",
      url: "https://crelligent.com",
      logo: "https://crelligent.com/logo.png",
      description: "Crelligent installs and maintains ESRE OS — the enterprise operating system for African mid-market companies. Five capability layers. Continuous monitoring. One OS Performance Score.",
      sameAs: [
        "https://twitter.com/crelligent",
        "https://www.linkedin.com/company/crelligent",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://crelligent.com/#service",
      name: "Crelligent",
      url: "https://crelligent.com",
      description: "Crelligent installs and maintains ESRE OS — the enterprise operating system for African mid-market companies. Five capability layers. Continuous monitoring. One OS Performance Score.",
      provider: {
        "@id": "https://crelligent.com/#organization",
      },
      serviceType: [
        "Systems Architecture",
        "Product Engineering",
        "Business Design",
        "Data Intelligence",
        "Enterprise Systems",
      ],
      areaServed: "Worldwide",
    },
    {
      "@type": "WebSite",
      "@id": "https://crelligent.com/#website",
      url: "https://crelligent.com",
      name: "Crelligent",
      description: "Crelligent installs and maintains ESRE OS — the enterprise operating system for African mid-market companies. Five capability layers. Continuous monitoring. One OS Performance Score.",
      publisher: {
        "@id": "https://crelligent.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${outfit.variable} ${plusJakartaSans.variable} ${dmSans.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
