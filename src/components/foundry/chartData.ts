/** CHART DATA from CONTENT.md, copied verbatim. Do not edit numbers here without updating CONTENT.md. */

export const AFRICA_FUNDING_BY_YEAR = {
  id: 'africa-funding-by-year',
  title: 'African startup funding, 2021–2025',
  subtitle: 'Deals of $100k+ (equity, debt, grants; exits excluded)',
  unit: 'USD billions',
  data: [
    { label: '2021', value: 4.3, note: 'over $4.3B', source: '[6]' },
    { label: '2022', value: 4.8, source: '[7]' },
    { label: '2023', value: 2.9, source: '[5]' },
    { label: '2024', value: 2.2, source: '[8]' },
    { label: '2025', value: 3.2, source: '[4]' },
  ],
  caption: 'Source: Africa: The Big Deal [4][5][6], via BusinessDay [7] and Connecting Africa [8].',
  takeaway: '2025 recovered 40% but is still about a third below the 2022 peak.',
} as const

export const STARTUP_FAILURE_REASONS = {
  id: 'startup-failure-reasons',
  title: 'Why VC-backed startups shut down',
  subtitle: '431 shutdowns since 2023; 385 with known causes; multiple reasons allowed (sums exceed 100%)',
  unit: '% of startups citing reason',
  data: [
    { label: 'Ran out of capital', value: 70 },
    { label: 'Poor product-market fit', value: 43, highlight: true },
    { label: 'Bad timing / macro', value: 29 },
    { label: 'Unsustainable unit economics', value: 19 },
  ],
  source: '[1]',
  caption: 'Source: CB Insights, 2026 [1]. Global data.',
  takeaway: 'Running out of cash is how startups die. Poor PMF is often why.',
} as const

export const AFRICA_SEED_VS_SERIES_A_2025 = {
  id: 'africa-seed-vs-series-a-2025',
  title: 'Fewer, bigger bets: seed vs Series A in Africa, 2025',
  unit: 'mixed (see each series)',
  series: [
    { label: 'Total raised (USD M)', seed: 462, seriesA: 610.6 },
    { label: 'Number of rounds', seed: 311, seriesA: 95 },
    { label: 'Average ticket (USD M)', seed: 1.7, seriesA: 7.0 },
  ],
  callouts: ['Seed deal count down 38% since 2021 peak', 'Series A average ticket up 21% year on year'],
  source: '[2]',
  caption: 'Source: Partech, 2025 Africa Tech Venture Capital Report [2].',
} as const

export const AEHI_L2_PRIMARY_CONSTRAINT = {
  id: 'aehi-l2-primary-constraint',
  title: 'Where the ESRE OS breaks',
  unit: '% of assessed enterprises',
  data: [
    { label: 'L2 Operating Model is the primary constraint', value: 91, highlight: true },
    { label: 'Another OS layer is the primary constraint', value: 9 },
  ],
  source: 'Crelligent AEHI data',
  caption: 'Crelligent AEHI data: 430 Nigerian mid-market enterprises, 9 sectors. Mid-market sample, not startups.',
} as const
