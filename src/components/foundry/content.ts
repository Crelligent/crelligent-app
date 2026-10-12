/** /foundry copy, verbatim from CONTENT.md. Prices and package names come from @/lib/foundry/packages. */
import type { FoundryPackageId } from '@/lib/foundry/packages'

/** Rich text segment: plain text, a source citation, the AEHI chip, or an L2 highlight. */
export type Seg = string | { cite: number[] } | { aehi: true } | { l2: string }

export const HERO = {
  eyebrow: 'Crelligent Foundry',
  headline: 'Prove the market. Install the system. Then scale.',
  subhead:
    'Crelligent Foundry builds and validates startups with their founders. Early-stage founders prove product-market fit and install the operating system that lets them scale. Growing startups co-build their next venture with our team doing the build.',
  primaryCta: 'Apply to Foundry',
  secondaryCta: 'See packages',
  trust: ['No equity.', 'No cohort.', 'You own everything we build.'],
}

export const PROBLEM = {
  eyebrow: 'The problem',
  heading: 'Capital is back. Patience is not.',
  intro:
    'African startup funding recovered in 2025. But the money is going to fewer companies, in bigger cheques. Investors want evidence before the meeting, not after it. The founders who raise are the ones who can prove the market and show the team can deliver.',
}

export interface StatCardData {
  value: string
  line: string
  cite: number[]
  source: string
}

export const STAT_CARDS: StatCardData[] = [
  {
    value: '43%',
    line: 'of failed VC-backed startups cited poor product-market fit. Two-thirds of those never found a market.',
    cite: [1],
    source: 'CB Insights, 2026',
  },
  {
    value: '−38%',
    line: 'fewer seed deals in Africa than at the 2021 peak. Series A cheques got 21% bigger while round count fell.',
    cite: [2],
    source: 'Partech, 2026',
  },
  {
    value: '−21%',
    line: 'drop in Nigerian startup equity funding in 2025, to $412M.',
    cite: [2],
    source: 'Partech, 2026',
  },
  {
    value: '3×',
    line: 'more likely: novice venture builders launching without good product-market fit, compared with experienced builders.',
    cite: [15],
    source: 'McKinsey, 2024',
  },
]

export const FIXES = {
  eyebrow: 'Problem → solution',
  heading: 'Every problem has a fix. Here is ours.',
  intro: "Eight problems we see in founders' companies, the evidence behind each, and what Foundry installs.",
}

export interface FixRow {
  n: number
  problem: string
  short: string
  evidence: Seg[]
  solution: Seg[]
  packageId: FoundryPackageId
}

export const FIX_ROWS: FixRow[] = [
  {
    n: 1,
    problem: "You think you have PMF. You can't prove it.",
    short: "Can't prove PMF",
    evidence: ['43% of failed startups cite poor PMF', { cite: [1] }],
    solution: ['Scores PMF across 10 weighted dimensions and shows which ones are pitch-ready'],
    packageId: 'pmf',
  },
  {
    n: 2,
    problem: 'Investors write fewer, bigger cheques.',
    short: 'Fewer, bigger cheques',
    evidence: ['Seed deals −38% since 2021 peak; Series A ticket +21%', { cite: [2] }],
    solution: ['Investor Readiness Assessment and a PMF Narrative Framework built from your evidence'],
    packageId: 'pmf',
  },
  {
    n: 3,
    problem: 'Nigeria is the tightest raise in years.',
    short: 'Tightest raise in years',
    evidence: [
      'Nigeria equity −21% to $412M',
      { cite: [2] },
      "; Nigeria's share of African funding at its lowest since 2019",
      { cite: [9] },
    ],
    solution: ['Makes your case before the meeting, with the data investors check first'],
    packageId: 'foundry',
  },
  {
    n: 4,
    problem: 'Seed to Series A takes longer than your runway.',
    short: 'Runway vs Series A',
    evidence: [
      'Under 30% of seed cohorts reach Series A in 2 years',
      { cite: [11] },
      '; median 22 months from last raise to shutdown',
      { cite: [1] },
    ],
    solution: ['Installs the ', { l2: 'L2 Operating Model' }, ' so the runway you have goes further'],
    packageId: 'os-lite',
  },
  {
    n: 5,
    problem: 'Customers churn because delivery is inconsistent.',
    short: 'Inconsistent delivery',
    evidence: ['L2 Operating Model is the primary constraint in 91% of assessed enterprises ', { aehi: true }],
    solution: [
      { l2: 'L2 first' },
      ': processes, roles and decision rights, mapped to the retention and referral dimensions they lift',
    ],
    packageId: 'foundry',
  },
  {
    n: 6,
    problem: 'You are hiring ahead of the system.',
    short: 'Hiring ahead of the system',
    evidence: ['70% of startups scaled prematurely; none passed 100,000 users', { cite: [14] }],
    solution: ['Diagnoses L1, L2 and L3 and installs only what your stage needs'],
    packageId: 'os-lite',
  },
  {
    n: 7,
    problem: 'Your second product could fail like most new launches.',
    short: 'Second-product risk',
    evidence: [
      '76% of FMCG launches fail in year one',
      { cite: [16] },
      '; novices 3× likelier to build without PMF',
      { cite: [15] },
    ],
    solution: ['Validates demand, pricing and PMF evidence before you commit build budget'],
    packageId: 'venture',
  },
  {
    n: 8,
    problem: 'A new market costs more than it looks.',
    short: 'New-market cost',
    evidence: [
      'Experienced builders use partners 1.4× more and are 2× likelier to hit scale targets',
      { cite: [15] },
      '; 54 regulatory regimes',
      { cite: [19] },
    ],
    solution: ['Our team co-builds with yours, from validation to launch, so your core team stays on the core'],
    packageId: 'venture',
  },
]

export const L2_SECTION = {
  label: 'Crelligent AEHI data',
  heading: "Most companies don't stall on strategy. They stall on L2.",
  bigStat: '91%',
  bigStatLine:
    'the share of assessed Nigerian mid-market enterprises where L2 Operating Model is the primary constraint.',
  supportingLabel: 'Average ESRE OS Performance Score',
  supportingValue: '44/100',
  sample: 'Sample: 430 enterprises, 9 sectors.',
  smallPrint:
    'Source: African Enterprise Health Index (AEHI), Crelligent AEHI data. Sample is established mid-market enterprises, not startups.',
  body: [
    'L2 is the operating model: processes, roles and decision rights. In the ESRE OS Performance Score it carries a 1.4× weight, the highest of the five OS layers.',
    'If L2 is missing at 400 staff, it was missing at 10. Startups are where it is cheapest to install.',
    'ESRE OS Lite installs L1, L2 and L3, with L2 first.',
    'L2 lifts the two PMF signals investors trust most: retention and referrals. A team that delivers the same way every time keeps customers, and customers who are kept tell others.',
  ],
}

export interface PathData {
  id: 'validate' | 'venture'
  n: 1 | 2
  title: string
  forWho: string
  line: string
  body: Seg[]
  flow: string[]
  packageIds: FoundryPackageId[]
}

export const PATHS_HEADING = 'Two ways in.'

export const PATHS: PathData[] = [
  {
    id: 'validate',
    n: 1,
    title: 'Validate & scale',
    forWho: 'Early-stage founders, pre-seed to Series A.',
    line: 'Prove product-market fit. Install the operating system that lets you scale.',
    body: [
      'We score your PMF with VeloDesk, show you which dimensions are ready for investors, and install ESRE OS Lite: L1 Business Design, ',
      { l2: 'L2 Operating Model' },
      ' and L3 Technology & Platform. We install L2 first, because it is the primary constraint.',
    ],
    flow: ['Prove PMF', 'Install the OS (L2 first)', 'Scale'],
    packageIds: ['pmf', 'os-lite', 'foundry'],
  },
  {
    id: 'venture',
    n: 2,
    title: 'Venture build',
    forWho: 'Growing startups and their founders.',
    line: 'Co-build your next venture with us.',
    body: [
      'A second product, a spin-out or a new market. We take it from validation to launch, with our team doing the build. You test demand before you spend, and your core team keeps running the core business.',
    ],
    flow: ['Validation', 'Build', 'Launch'],
    packageIds: ['venture'],
  },
]

export const PROCESS_HEADING = 'From application to delivery in six steps.'

export interface ProcessStep {
  title: string
  text: string
  chip?: { label: string; kind: 'pay' | 'neutral' }
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Apply.',
    text: 'Tell us where you are and what you want to achieve. Takes about 5 minutes.',
    chip: { label: '~5 min', kind: 'neutral' },
  },
  {
    title: 'Discovery call.',
    text: 'We review your traction, team and timeline, and find your primary constraint.',
  },
  {
    title: 'Proposal.',
    text: 'A fixed scope, timeline and fee, quoted for your company.',
    chip: { label: 'Fee agreed', kind: 'neutral' },
  },
  {
    title: '50% deposit.',
    text: 'Pay the deposit by secure invoice link. Work starts when it clears.',
    chip: { label: '50%', kind: 'pay' },
  },
  {
    title: 'Build and validate.',
    text: 'We score, diagnose and install, working with your team week by week.',
  },
  {
    title: 'Delivery and balance.',
    text: 'You receive the deliverables. The remaining 50% is due on delivery.',
    chip: { label: '50%', kind: 'pay' },
  },
]

export const PACKAGES_SECTION = {
  heading: 'Packages',
  intro: 'Every engagement is quoted for your company. Tell us where you are and we will send a fixed quote after a short discovery call.',
}

export const NOT_ACCELERATOR = {
  heading: 'Not an accelerator.',
  line: 'You hire us. You keep the company.',
  rows: [
    ['Take equity', 'No equity. You pay a fee, agreed upfront.'],
    ['Run fixed cohorts and demo days', 'No cohort. You start when you are ready.'],
    ['Give advice and a network', 'We install working systems and, on Venture Build, do the build.'],
    ['Share IP or terms with the programme', 'You own everything we build: the systems, the code and the documents.'],
  ] as const,
  footer: 'You pay only Crelligent. We pay our own team and contractors.',
}

export interface FaqItem {
  q: string
  intro?: string
  a: string | string[]
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Who is Foundry for?',
    intro: 'Two groups:',
    a: [
      'Early-stage founders, pre-seed to Series A, who need to prove product-market fit and build a team that can execute.',
      'Growing startups that want to launch a second product, a spin-out or a new market without pulling their core team off the core.',
    ],
  },
  { q: 'Do you take equity?', a: 'No. Foundry is a paid engagement. You own everything we build.' },
  {
    q: 'How much does Foundry cost?',
    a: 'It depends on your stage, team size, data and what we build. Request a quote and we will send a fixed scope, timeline and fee after a short discovery call. The fee does not change after you sign.',
  },
  {
    q: 'How does payment work?',
    a: [
      '50% on signing and 50% on delivery.',
      'You pay by a secure invoice link, processed by Paystack.',
      'Nigerian clients pay in NGN. International clients are quoted and invoiced in USD, GBP or EUR.',
    ],
  },
  {
    q: 'What is the VeloDesk PMF Score?',
    a: [
      'A 0–100 score built from 10 weighted dimensions of product-market fit, from problem-solution fit to unit economics.',
      'Retention carries the highest weight.',
      'You get the score, an Investor Readiness Assessment, and a PMF Narrative Framework for investor conversations.',
    ],
  },
  {
    q: 'What does "install the operating system" mean?',
    a: [
      "We don't hand you a report and leave.",
      'We design and put in place the processes, roles, decision rights and tools your team runs on (L1, L2 and L3 of the ESRE OS), and we work with your team until they run.',
    ],
  },
  {
    q: 'We are outside Nigeria. Can we apply?',
    a: 'Yes. International clients are quoted and invoiced in US dollars, pounds or euros, and pay by card (USD) or bank transfer.',
  },
  {
    q: 'What happens after I apply?',
    a: [
      'We review your application and invite you to a discovery call.',
      'If there is a fit, you receive a proposal with scope, timeline and fee.',
      'Work starts when the deposit clears.',
    ],
  },
]

export const FINAL_CTA = {
  heading: 'Raise on evidence. Scale on a system.',
  line: 'Apply in about 5 minutes. We reply with next steps after we review your application.',
}

export const WHAT_HAPPENS_NEXT = [
  {
    title: 'Discovery call.',
    text: 'We review your traction, team and timeline, and find your primary constraint.',
  },
  { title: 'Proposal.', text: 'A fixed scope, timeline and fee, quoted for your company.' },
  { title: '50% deposit.', text: 'Pay the deposit by secure invoice link. Work starts when it clears.' },
]
