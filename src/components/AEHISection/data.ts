export const AEHI_HOMEPAGE_DATA = {
  edition:            'Q4 2026',
  overallScore:       44,
  sampleSize:         430,
  partner:            'Lagos Business School',
  primaryConstraint:  'L2 · Operating Model',
  constraintPercent:  91,
  reportUrl:          'https://aehi.crelligent.com/report',
  micrositeUrl:       'https://aehi.crelligent.com',
  sectors: [
    { name: 'Financial Services', score: 58, trend: 3  },
    { name: 'Technology',         score: 53, trend: 5  },
    { name: 'FMCG',               score: 44, trend: 0  },
    { name: 'Manufacturing',      score: 41, trend: 1  },
    { name: 'Logistics',          score: 39, trend: -2 },
  ],
} as const;
