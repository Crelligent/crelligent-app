/**
 * AEHI Research: published third-party evidence on how Nigerian enterprises are run.
 *
 * EVERY figure here is copied from a named public source, with its source number. None of it is
 * AEHI data. AEHI's own results come only from the diagnostic and the Barometer, and only once
 * published. Do not round, combine or "update" these numbers without re-checking the source.
 *
 * World Bank Enterprise Surveys (WBES) Nigeria 2025: 1,043 formal private firms with 5+ employees
 * (546 small 5-19, 344 medium 20-99, 153 large 100+), interviewed February to September 2025.
 * Management-practice indicators are computed only for firms with 20 or more workers.
 */

export interface EvidenceSource {
  n: number
  title: string
  publisher: string
  year: number
  url: string
  domain: string
  note?: string
}

export const EVIDENCE_SOURCES: EvidenceSource[] = [
  {
    n: 1,
    title: 'Enterprise Surveys: Nigeria 2025 Country Profile',
    publisher: 'World Bank',
    year: 2025,
    url: 'https://www.enterprisesurveys.org/content/dam/enterprisesurveys/documents/country/Nigeria-2025.pdf',
    domain: 'enterprisesurveys.org',
    note: '1,043 firms, fieldwork February to September 2025',
  },
  {
    n: 2,
    title: 'Nigeria Family Business Survey 2021',
    publisher: 'PwC Nigeria',
    year: 2021,
    url: 'https://www.pwc.com/ng/en/assets/pdf/nigeria-family-business-survey-2021.pdf',
    domain: 'pwc.com',
    note: 'interviews 5 October to 11 December 2020',
  },
  {
    n: 3,
    title: '2018 Nigeria Family Business Survey',
    publisher: 'PwC Nigeria',
    year: 2018,
    url: 'https://www.pwc.com/ng/en/publications/2018-nigeria-family-business-survey.html',
    domain: 'pwc.com',
  },
  {
    n: 4,
    title: "PwC's 2024 MSME Survey",
    publisher: 'PwC Nigeria',
    year: 2024,
    url: 'https://www.pwc.com/ng/en/press-room/pwc-msme-survey-2024.html',
    domain: 'pwc.com',
    note: '567 MSMEs across 13 sectors and 29 states',
  },
  {
    n: 5,
    title: '2021 National Survey on MSMEs (announcement, citing the previous national survey)',
    publisher: 'SMEDAN with the National Bureau of Statistics',
    year: 2021,
    url: 'https://smedan.gov.ng/?p=49903',
    domain: 'smedan.gov.ng',
  },
]

/** One bar row. `compare` is the Sub-Saharan Africa value where the source gives one. */
export interface Row {
  label: string
  value: number
  compare?: number
  highlight?: boolean
}

export interface BarChart {
  id: string
  title: string
  subtitle: string
  unit: '%' | 'score' | 'count'
  max: number
  valueLabel: string
  compareLabel?: string
  rows: Row[]
  source: number[]
  caption: string
  takeaway: string
  layer?: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'context'
}

/** WBES 2025: biggest obstacle (% of firms naming it as the single biggest), top 10 for Nigeria. */
export const BIGGEST_OBSTACLE: BarChart = {
  id: 'biggest-obstacle',
  title: 'The biggest obstacle firms name',
  subtitle: '% of firms choosing each as their single biggest obstacle, from a list of 15',
  unit: '%',
  max: 40,
  valueLabel: 'Nigeria 2025',
  compareLabel: 'Sub-Saharan Africa',
  rows: [
    { label: 'Electricity', value: 27.6, compare: 11.0, highlight: true },
    { label: 'Access to finance', value: 23.2, compare: 29.9 },
    { label: 'Tax rates', value: 10.0, compare: 8.8 },
    { label: 'Crime, theft and disorder', value: 7.6, compare: 5.9 },
    { label: 'Corruption', value: 6.5, compare: 6.8 },
    { label: 'Practices of the informal sector', value: 6.0, compare: 8.0 },
    { label: 'Tax administration', value: 5.1, compare: 3.5 },
    { label: 'Transportation', value: 4.3, compare: 3.8 },
    { label: 'Political instability', value: 3.7, compare: 8.1 },
    { label: 'Customs and trade regulations', value: 2.1, compare: 3.8 },
  ],
  source: [1],
  caption: 'Source: World Bank Enterprise Surveys, Nigeria 2025 [1]. All firms (5+ employees).',
  takeaway: 'Half of Nigerian firms name power or finance as their biggest obstacle. Both sit outside the firm.',
  layer: 'context',
}

/** WBES 2025: top three obstacles for medium firms (20-99), the core of the AEHI mid-market. */
export const MEDIUM_FIRM_OBSTACLES = {
  medium: [
    { label: 'Electricity', value: 20.6 },
    { label: 'Access to finance', value: 16.4 },
    { label: 'Tax rates', value: 14.4 },
  ],
  large: [
    { label: 'Electricity', value: 37.1 },
    { label: 'Crime, theft and disorder', value: 21.2 },
    { label: 'Corruption', value: 14.9 },
  ],
  source: [1],
}

/**
 * WBES 2025: management practices, firms with 20+ workers. Scores 0-100 (100 = most structured).
 * Nigeria all firms (20+) vs Sub-Saharan Africa.
 */
export const MANAGEMENT_PRACTICES: BarChart = {
  id: 'management-practices',
  title: 'How Nigerian firms manage: the eight components',
  subtitle: 'Score out of 100, firms with 20 or more workers (100 = most structured practice)',
  unit: 'score',
  max: 100,
  valueLabel: 'Nigeria 2025',
  compareLabel: 'Sub-Saharan Africa',
  rows: [
    { label: 'Action taken when a problem arose', value: 80.6, compare: 76.7 },
    { label: 'Non-managers promoted on performance', value: 70.0, compare: 68.6 },
    { label: 'Time focus of targets', value: 55.3, compare: 52.3 },
    { label: "Basis of managers' bonuses", value: 52.9, compare: 37.3 },
    { label: 'Staff know the targets', value: 43.7, compare: 39.4 },
    { label: 'Number of performance indicators monitored', value: 41.1, compare: 30.2, highlight: true },
    { label: 'Targets are achievable', value: 34.8, compare: 41.9, highlight: true },
    { label: 'Under-performers reassigned or dismissed', value: 27.3, compare: 27.1, highlight: true },
  ],
  source: [1],
  caption:
    'Source: World Bank Enterprise Surveys, Nigeria 2025 [1]. Composite management practices index: Nigeria 51.5, Sub-Saharan Africa 48.0.',
  takeaway:
    'Firms react well when something breaks (80.6) but score low on the routines that stop it breaking: measured, achievable targets and consequences.',
  layer: 'L2',
}

export const MANAGEMENT_INDEX = { nigeria: 51.5, medium: 51.4, large: 52.7, ssa: 48.0, lmi: 48.9, source: [1] }

/** WBES 2025 growth, % a year: medium and large firms added staff faster than real sales. */
export const GROWTH_BY_SIZE = {
  rows: [
    { label: 'Small (5-19)', employment: 8.5, sales: 5.1 },
    { label: 'Medium (20-99)', employment: 9.2, sales: 1.4 },
    { label: 'Large (100+)', employment: 5.1, sales: -1.5 },
  ],
  ssa: { employment: 7.5, sales: 6.7 },
  source: [1],
  caption: 'Source: World Bank Enterprise Surveys, Nigeria 2025 [1]. Annual growth over the three years before the survey.',
  takeaway: 'Medium firms grew headcount about 9% a year while real sales grew about 1%: more people, little more output.',
}

/** WBES 2025 infrastructure and finance context. */
export const INFRA_FINANCE = {
  outagesPerMonth: { nigeria: 10.9, medium: 9.5, ssa: 6.6, lmi: 4.6 },
  firmsWithOutages: { nigeria: 82.5, ssa: 70.8 },
  investmentFinancedInternally: { nigeria: 75.8, medium: 78.7, ssa: 75.2 },
  investmentFinancedByBanks: { nigeria: 1.5, ssa: 9.3 },
  firmsUsingBanksForInvestment: { nigeria: 5.2, ssa: 20.7 },
  formalTraining: { nigeria: 36.2, medium: 37.9, large: 57.2, ssa: 28.3 },
  processInnovation: { nigeria: 19.8, ssa: 15.6 },
  bribery: { nigeria: 22.4, ssa: 16.7 },
  informalCompetition: { nigeria: 56.4, ssa: 55.8 },
  source: [1],
}

/** PwC family business governance, Nigeria vs global. */
export const FAMILY_BUSINESS_GOVERNANCE: BarChart = {
  id: 'family-business-governance',
  title: 'Governance in Nigerian family businesses',
  subtitle: '% of family businesses, Nigeria vs global',
  unit: '%',
  max: 100,
  valueLabel: 'Nigeria',
  compareLabel: 'Global',
  rows: [
    { label: 'Have no governance policies', value: 50, compare: 21, highlight: true },
    { label: 'Say they have a strong leadership team', value: 56, compare: 71 },
    { label: 'Have a documented, communicated succession plan', value: 25, compare: 30 },
    { label: 'Have a family constitution or protocol', value: 9, compare: 28 },
  ],
  source: [2],
  caption: 'Source: PwC Nigeria Family Business Survey 2021 [2], interviews October to December 2020.',
  takeaway: 'Half of Nigerian family businesses have no governance policies at all, more than twice the global share.',
  layer: 'L5',
}

/** PwC 2018: strategy and values written down. */
export const FAMILY_BUSINESS_STRATEGY: BarChart = {
  id: 'family-business-strategy',
  title: 'Strategy on paper',
  subtitle: '% of family businesses, Nigeria vs global',
  unit: '%',
  max: 100,
  valueLabel: 'Nigeria',
  compareLabel: 'Global',
  rows: [
    { label: 'Have a formal mid-term strategic plan', value: 33, compare: 49, highlight: true },
    { label: 'Have values and purpose in written form', value: 43, compare: 49 },
    { label: 'Expect to change their business model', value: 53, compare: 20 },
  ],
  source: [3],
  caption: 'Source: PwC 2018 Nigeria Family Business Survey [3].',
  takeaway: 'Two in three have no formal mid-term plan, yet more than half expect to change their business model.',
  layer: 'L1',
}

/** PwC 2024 MSME survey: number one challenge. */
export const MSME_TOP_CHALLENGES: BarChart = {
  id: 'msme-top-challenges',
  title: 'What MSMEs say holds them back',
  subtitle: '% of MSMEs naming each as a major challenge',
  unit: '%',
  max: 40,
  valueLabel: 'MSMEs, 2024',
  rows: [
    { label: 'Inadequate access to finance', value: 35, highlight: true },
    { label: 'Unreliable power supply', value: 21 },
    { label: 'Multiple taxation and levies', value: 12 },
    { label: 'Inadequate skilled labour', value: 11 },
    { label: 'Insecurity', value: 10 },
  ],
  source: [4],
  caption: "Source: PwC's 2024 MSME Survey [4], 567 MSMEs across 13 sectors and 29 states.",
  takeaway: 'Finance and power lead again. Internal ways of working do not appear on the list at all.',
  layer: 'context',
}

/** SMEDAN/NBS headline contribution figures (previous national MSME survey, as cited in 2021). */
export const MSME_CONTRIBUTION = { gdp: 49.78, employment: 76, exports: 7.64, source: [5] }
