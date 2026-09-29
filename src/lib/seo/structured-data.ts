export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.crelligent.com/#organization",
        name: "Crelligent",
        url: "https://www.crelligent.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.crelligent.com/icon.png",
          width: 512,
          height: 512,
        },
        description: "Systems Design & Engineering for African Enterprises.",
        sameAs: [
          "https://www.linkedin.com/company/crelligent/",
          "https://twitter.com/crelligent"
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.crelligent.com/#website",
        url: "https://www.crelligent.com",
        name: "Crelligent",
        publisher: {
          "@id": "https://www.crelligent.com/#organization"
        },
      }
    ]
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `https://www.crelligent.com${item.item}`
    }))
  };
}

export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName = "Crelligent Research",
  url
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": authorName
    },
    "publisher": {
      "@id": "https://www.crelligent.com/#organization"
    }
  };
}
