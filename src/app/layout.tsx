import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://crelligent.com"),
  title: {
    default: "Crelligent | Systems Design & Engineering",
    template: "%s | Crelligent",
  },
  description: "We design the systems companies rely on before scale and complexity expose their weaknesses. Systems architecture, product engineering, and intelligence systems for modern organizations.",
  keywords: [
    "systems design",
    "systems engineering",
    "systems architecture",
    "product engineering",
    "business design",
    "enterprise systems",
    "technology consulting",
    "digital transformation",
    "operating model design",
    "data intelligence",
  ],
  authors: [{ name: "Crelligent", url: "https://crelligent.com" }],
  creator: "Crelligent",
  publisher: "Crelligent",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Crelligent | Systems Design & Engineering",
    description: "We design the systems companies rely on before scale and complexity expose their weaknesses.",
    url: "https://crelligent.com",
    siteName: "Crelligent",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crelligent | Systems Design & Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crelligent | Systems Design & Engineering",
    description: "We design the systems companies rely on before scale and complexity expose their weaknesses.",
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
      description: "Systems architecture, product engineering, and intelligence systems for modern organizations.",
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
      description: "We design the systems companies rely on before scale and complexity expose their weaknesses.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${outfit.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
