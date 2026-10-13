/**
 * AEHI content source. The inaugural edition is in preparation: there are no published scores yet.
 *
 * NEVER hand-edit figures (scores, percentages, sample sizes) into this file. The only numbers
 * here are methodology facts (layers, weights, the 0-10 / 0-100 scales, the minimum group size,
 * the mid-market definition) and dates. Published figures come only from the backend
 * (getPublishedEdition() in src/lib/editions.ts), behind the AEHI_SHOW_EDITION_DATA flag.
 */
import { MIN_GROUP_SIZE as ENFORCED_MIN_GROUP_SIZE } from '@/lib/aehi/kanon'

export const EDITION = {
  number: '01',
  label: 'Q4 2026',
  status: 'in-preparation' as const,
  statusLabel: 'Inaugural edition in preparation',
  chip: 'Edition 01 · Q4 2026 · In preparation',
  diagnosticUrl: '/diagnostic',
  methodVersion: '1.0',
  methodPublished: 'October 2026',
  contactEmail: 'aehi@crelligent.com',
}

/**
 * Smallest group of enterprises the index will ever publish a figure for.
 * Taken from the backend's k-anonymity floor so the published method always matches
 * what the system enforces.
 */
// OWNER CONFIRM: DESIGN.md proposed 5 as the public minimum group size; the backend enforces 10
// (src/lib/kanon.ts). The site states the enforced value. Change both together if 5 is intended.
export const MIN_GROUP_SIZE = ENFORCED_MIN_GROUP_SIZE

// OWNER CONFIRM: diagnostic length ("about 10 minutes").
export const DIAGNOSTIC_MINUTES = 10

export type LayerCode = 'L1' | 'L2' | 'L3' | 'L4' | 'L5'

export interface Layer {
  code: LayerCode
  /** 1 to 5, position in the stack (1 = foundation). */
  n: 1 | 2 | 3 | 4 | 5
  name: string
  /** Name as read aloud ("&" spelled out). */
  spokenName: string
  weight: number
  /** "1.4×" */
  weightLabel: string
  /** Share of the 100 points: weight ÷ 5 × 100. */
  points: number
  /** Short description used outside the explorer. */
  measures: string
  question: string
  covers: string
  whenWeak: string
  /** What a weakness here does to each layer above it (Trace mode). */
  upward: Partial<Record<LayerCode, string>>
  whyHighest?: string
  topOfStack?: string
}

export const LAYERS: readonly Layer[] = [
  {
    code: 'L1',
    n: 1,
    name: 'Business Design',
    spokenName: 'Business Design',
    weight: 1.0,
    weightLabel: '1.0×',
    points: 20,
    measures: 'The commercial logic: revenue model, positioning and unit economics.',
    question: 'Does the business have a clear way to make money?',
    covers: 'The commercial logic: what the business sells, to whom, at what price and margin, and how it competes.',
    whenWeak:
      'Priorities shift with every new opportunity. Teams work hard on things that do not pay, and the business cannot say which customers or products actually make money.',
    upward: {
      L2: 'Processes are designed around the wrong priorities, or around whatever the last big customer asked for.',
      L3: 'Systems are bought for workflows that the business model does not need.',
      L4: 'Reports measure activity rather than the few numbers that show whether the model works.',
      L5: 'Controls protect the wrong risks, and nobody can say which decisions matter most.',
    },
  },
  {
    code: 'L2',
    n: 2,
    name: 'Operating Model',
    spokenName: 'Operating Model',
    weight: 1.4,
    weightLabel: '1.4×',
    points: 28,
    measures: 'How work gets done: processes, roles, decision rights and handovers.',
    question: 'Does work get done the same way, without the founder?',
    covers: 'How work actually happens: processes, roles, decision rights and the handovers between teams.',
    whenWeak:
      "Core processes live in people's heads. Work stops when key people are away, and the founder or CEO still routes day-to-day decisions.",
    upward: {
      L3: 'Software automates processes that are undocumented or done differently by each team, so people work around it in spreadsheets and WhatsApp.',
      L4: 'Data is inconsistent because the same work is recorded in different ways, so reports are argued over instead of used.',
      L5: 'Approvals and exceptions go to the top because nobody has clear authority, which makes the founder the bottleneck.',
    },
    whyHighest:
      "L2 is the layer the others run on. Technology automates it, data records it and governance controls it, so a weakness here shows up in all three. That is why it carries a weight of 1.4, the highest of the five. In Crelligent's diagnostic work it is also the layer that most often holds enterprises back. That is a hypothesis: the inaugural edition will test it.",
  },
  {
    code: 'L3',
    n: 3,
    name: 'Technology',
    spokenName: 'Technology',
    weight: 1.0,
    weightLabel: '1.0×',
    points: 20,
    measures: 'The systems the business runs on, and whether they connect.',
    question: "Do the business's systems connect and support the work?",
    covers: 'The systems the business runs on, from finance and sales to operations, and whether they share information.',
    whenWeak:
      'Information is typed in twice, kept in separate spreadsheets or lost between systems. Staff spend time moving data instead of using it.',
    upward: {
      L4: 'There is no single view of operations: numbers have to be pulled together by hand, so they arrive late and disagree.',
      L5: 'Controls are manual and after the fact, because systems cannot enforce limits or keep an audit trail.',
    },
  },
  {
    code: 'L4',
    n: 4,
    name: 'Data & Intelligence',
    spokenName: 'Data and Intelligence',
    weight: 1.0,
    weightLabel: '1.0×',
    points: 20,
    measures: 'How the business senses what is happening and decides on it.',
    question: 'Can leaders see what is happening in time to act?',
    covers:
      'How the business senses what is happening and turns it into decisions: reporting, measures and the timeliness of information.',
    whenWeak:
      "Leaders decide on instinct or on last month's figures. Problems are found when a customer complains or the cash runs short.",
    upward: {
      L5: 'Governance runs on late or unreliable numbers, so risks and exceptions are found after the damage is done.',
    },
  },
  {
    code: 'L5',
    n: 5,
    name: 'Governance',
    spokenName: 'Governance',
    weight: 0.6,
    weightLabel: '0.6×',
    points: 12,
    measures: 'Controls, risk and accountability: who can approve what, and how exceptions are handled.',
    question: 'Is it clear who can approve what, and how risk is controlled?',
    covers: 'Controls, risk and accountability: approval limits, how exceptions are handled, and who answers for what.',
    whenWeak:
      'Decisions are made by escalation. Exceptions are handled case by case, and accountability is unclear when things go wrong.',
    upward: {},
    topOfStack:
      'L5 is the top of the stack, so a weakness here does not spread upward. It leaves every layer below without clear control: spending, approvals and exceptions depend on who is in the room. Its weight is the lowest (0.6) because good governance cannot make up for weak layers underneath it.',
  },
] as const

export const LAYER_BY_CODE = Object.fromEntries(LAYERS.map((l) => [l.code, l])) as Record<LayerCode, Layer>

export const SCORE_FORMULA = 'OS Performance Score = (L1×1.0 + L2×1.4 + L3×1.0 + L4×1.0 + L5×0.6) ÷ 5 × 10'

/** Patterns from Crelligent's diagnostic work that the inaugural edition will test. Hypotheses, not findings. */
export const HYPOTHESES = [
  {
    index: 1,
    title: 'The founder as scheduler',
    layers: ['L2'],
    body: 'In many growing companies, core processes are not written down, so the founder or CEO still routes day-to-day work. We expect the Operating Model (L2) to be the most common primary constraint.',
  },
  {
    index: 2,
    title: 'Systems that do not talk',
    layers: ['L3', 'L4'],
    body: 'Companies invest in technology (L3) but score lower on data and intelligence (L4): the software is in place, but nobody has a timely view of operations.',
  },
  {
    index: 3,
    title: 'Governance by escalation',
    layers: ['L5'],
    body: 'Exceptions are resolved by going to the top rather than through clear approval limits and controls (L5).',
  },
] as const

export const INSTITUTION_TYPES = [
  'University or business school',
  'Research institute',
  'Industry association or chamber of commerce',
  'Founder or executive network',
  'Private equity or venture capital',
  'Development finance institution',
  'Bank or lender',
  'Government or regulator',
  'Company',
  'Other',
] as const

export const INTERESTS = [
  'Research partnership',
  'Inviting our members or portfolio to take part',
  'Access to published data',
  'Something else',
] as const
