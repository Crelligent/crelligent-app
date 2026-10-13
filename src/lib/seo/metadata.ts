import { Metadata } from "next";

const SITE_URL = "https://www.crelligent.com";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article";
}

export function generateSeoMetadata({
  title,
  description,
  path,
  noindex = false,
  ogImage = "/og-image.jpg",
  ogType = "website",
}: SeoProps): Metadata {
  const url = `${SITE_URL}${path}`;
  // The root layout's title template adds " | Crelligent"; strip it here so it never appears twice.
  title = title.replace(/\s*\|\s*Crelligent[^|]*$/i, "").trim();
  const fullTitle = `${title} | Crelligent`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noindex,
      follow: true,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      siteName: "Crelligent",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
