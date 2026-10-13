export type ContentCategory = 
  | 'Strategy' 
  | 'Operating Model' 
  | 'Technology' 
  | 'Data & AI' 
  | 'Customer Experience' 
  | 'Governance' 
  | 'Systems Thinking' 
  | 'Enterprise Transformation' 
  | 'Africa'
  | 'Product-Market Fit'
  | 'Fundraising'
  | 'Venture Building';

export interface SeoMetadata {
  title: string;
  description: string;
  primaryIntent?: string;
  secondaryIntent?: string;
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  body: string; // Markdown or HTML
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: ContentCategory;
  tags: string[];
  featuredImage?: string;
  relatedCapabilities: string[]; // slugs
  relatedTemplates: string[]; // slugs
  relatedResearch: string[]; // slugs
  seo: SeoMetadata;
  /** Library fields (optional; used by Crelligent Foundry research pieces). */
  type?: 'article' | 'whitepaper' | 'research' | 'ceo-corner';
  dek?: string;
  readingMinutes?: number;
  /** Inner HTML of each numbered source, matching the body's <sup>[n]</sup> keys. */
  sources?: string[];
  sourcesNote?: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  clientContext: string;
  challenge: string;
  systemDiagnosis: string;
  intervention: string;
  architectureDesign: string;
  implementation: string;
  results: string;
  lessons: string;
  relatedCapabilities: string[];
  seo: SeoMetadata;
  /** Only published case studies are listed, routed and put in the sitemap. Set true once the client story is confirmed. */
  published?: boolean;
}

export interface Industry {
  name: string;
  slug: string;
  context: string;
  majorProblems: string[];
  technologyChallenges: string[];
  dataOpportunities: string[];
  systemsArchitecture: string;
  relatedCapabilities: string[];
  seo: SeoMetadata;
}
