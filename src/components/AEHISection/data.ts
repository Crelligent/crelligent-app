/**
 * Homepage AEHI block. The inaugural edition has not been published yet, so this shows what the index
 * measures and invites enterprises to contribute. Put real figures here only from a published edition.
 */
export const AEHI_HOMEPAGE_DATA = {
  edition: 'Q4 2026',
  contributeUrl: '/aehi#take-part',
  micrositeUrl: '/aehi',
  layers: [
    { code: 'L1', name: 'Business Design', measures: 'Model, positioning and economics' },
    { code: 'L2', name: 'Operating Model', measures: 'Processes, roles and decision rights' },
    { code: 'L3', name: 'Technology', measures: 'Systems, platforms and integration' },
    { code: 'L4', name: 'Data & Intelligence', measures: 'How the business senses and decides' },
    { code: 'L5', name: 'Governance', measures: 'Controls, risk and accountability' },
  ],
} as const
