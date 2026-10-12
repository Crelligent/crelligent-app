/** Sources list for /foundry. Numbering follows RESEARCH.md / CONTENT.md §11 (gaps are intentional). */
export interface FoundrySource {
  n: number
  title: string
  note?: string
  publisher: string
  year: number
  url: string
  domain: string
}

export const FOUNDRY_SOURCES: FoundrySource[] = [
  {
    n: 1,
    title: 'Why Startups Fail: Top 9 Reasons',
    publisher: 'CB Insights',
    year: 2026,
    url: 'https://www.cbinsights.com/research/report/startup-failure-reasons-top/',
    domain: 'cbinsights.com',
  },
  {
    n: 2,
    title: '2025 Africa Tech Venture Capital Report',
    publisher: 'Partech',
    year: 2026,
    url: 'https://cdn-website.partechpartners.com/africa-reports/2025-africa-tech-venture-capital-report',
    domain: 'partechpartners.com',
  },
  {
    n: 4,
    title: 'Start-ups in Africa raised $3.2 billion in 2025',
    publisher: 'Africa: The Big Deal',
    year: 2026,
    url: 'https://thebigdeal.substack.com/p/2025ir1',
    domain: 'thebigdeal.substack.com',
  },
  {
    n: 5,
    title: '2023: The Year of the Debt',
    publisher: 'Africa: The Big Deal',
    year: 2024,
    url: 'https://thebigdeal.substack.com/p/2023',
    domain: 'thebigdeal.substack.com',
  },
  {
    n: 6,
    title: '2021 in 21 numbers',
    publisher: 'Africa: The Big Deal',
    year: 2022,
    url: 'https://thebigdeal.substack.com/p/2021-in-21-numbers',
    domain: 'thebigdeal.substack.com',
  },
  {
    n: 7,
    title: 'Startup funding across Africa declined by 39% in 2023',
    note: 'citing Africa: The Big Deal',
    publisher: 'BusinessDay',
    year: 2024,
    url: 'https://businessday.ng/technology/article/startup-funding-across-africa-declined-by-39-in-2023/',
    domain: 'businessday.ng',
  },
  {
    n: 8,
    title: 'African startups raised $2.2B in 2024',
    note: 'citing Africa: The Big Deal',
    publisher: 'Connecting Africa',
    year: 2025,
    url: 'https://www.connectingafrica.com/startups/african-startups-raised-2-2b-in-2024-25-less-than-2023',
    domain: 'connectingafrica.com',
  },
  {
    n: 9,
    title: 'Africa Investment Report 2025',
    publisher: 'Briter',
    year: 2026,
    url: 'https://www.briter.co/insights/reports/africa-investment-report-2025',
    domain: 'briter.co',
  },
  {
    n: 11,
    title: 'Most Seed Startups Never Reach Series A',
    publisher: 'Carta',
    year: 2026,
    url: 'https://carta.com/data/linkedin-seed-to-series-a-still-uphill-battle/',
    domain: 'carta.com',
  },
  {
    n: 14,
    title: 'Premature Scaling: A Deep Dive',
    publisher: 'Startup Genome',
    year: 2011,
    url: 'https://startupgenome.com/insights/premature-scaling-a-deep-dive',
    domain: 'startupgenome.com',
  },
  {
    n: 15,
    title: 'How CEOs are turning corporate venture building into outsize growth',
    publisher: 'McKinsey & Company',
    year: 2024,
    url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/how-ceos-are-turning-corporate-venture-building-into-outsize-growth',
    domain: 'mckinsey.com',
  },
  {
    n: 16,
    title: '3 in 4 FMCG launches fail within a year',
    note: 'Nielsen',
    publisher: 'Marketing Week',
    year: 2014,
    url: 'https://www.marketingweek.com/3-in-4-fmcg-launches-fail-within-a-year/',
    domain: 'marketingweek.com',
  },
  {
    n: 19,
    title: 'The expansion dynamics of African startups',
    publisher: 'Techpoint Africa',
    year: 2025,
    url: 'https://techpoint.africa/insight/expansion-dynamics-of-african-startups/',
    domain: 'techpoint.africa',
  },
]

export const AEHI_SOURCE_TEXT =
  'AEHI figures: African Enterprise Health Index, Crelligent AEHI data (430 Nigerian mid-market enterprises, 9 sectors).'
