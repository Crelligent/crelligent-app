import { FormSchema } from './FormEngine'

export const pmfSurveySchema: FormSchema = {
    id: 'pmf-blind-spot-survey-v1',
    title: 'The PMF Blind Spot',
    description: 'We are researching how founders actually measure product-market fit. Your answers will remain anonymous.',
    fields: [
        {
            id: 'startup_stage',
            type: 'select',
            label: '1. What is your current startup stage?',
            options: [
                { label: 'Pre-Seed', value: 'pre_seed' },
                { label: 'Seed', value: 'seed' },
                { label: 'Series A', value: 'series_a' },
                { label: 'Series B+', value: 'series_b_plus' },
                { label: 'Bootstrapped', value: 'bootstrapped' }
            ],
            required: true
        },
        {
            id: 'location',
            type: 'text',
            label: '2. Where are you based?',
            placeholder: 'e.g., San Francisco, London, Lagos',
            required: true
        },
        {
            id: 'sector',
            type: 'text',
            label: '3. What sector is your startup in?',
            placeholder: 'e.g., B2B SaaS, Fintech',
            required: true
        },
        {
            id: 'funding_status',
            type: 'select',
            label: '4. What is your funding status?',
            options: [
                { label: 'Fundraising Now', value: 'fundraising' },
                { label: 'Recently Funded', value: 'recently_funded' },
                { label: 'Not Fundraising', value: 'not_fundraising' }
            ],
            required: true
        },
        {
            id: 'pmf_confidence',
            type: 'select',
            label: '5. On a scale of 1-10, how confident are you that you have PMF?',
            options: Array.from({ length: 10 }, (_, i) => ({ label: String(i + 1), value: String(i + 1) })),
            required: true
        },
        {
            id: 'tracks_retention_cohorts',
            type: 'radio',
            label: '6. Do you track retention cohorts?',
            options: [
                { label: 'Yes, rigorously', value: 'yes' },
                { label: 'Somewhat', value: 'somewhat' },
                { label: 'No', value: 'no' }
            ],
            required: true
        },
        {
            id: 'knows_d30_retention',
            type: 'radio',
            label: '7. Do you know your Day-30 retention offhand?',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ],
            required: true
        },
        {
            id: 'time_to_pmf_proof',
            type: 'select',
            label: '8. How long does it take you to pull data proving PMF?',
            options: [
                { label: 'Instantly (Dashboard)', value: 'instantly' },
                { label: 'A few hours', value: 'hours' },
                { label: 'A few days', value: 'days' },
                { label: 'I cannot reliably do this', value: 'cannot_do' }
            ],
            required: true
        },
        {
            id: 'sean_ellis_usage',
            type: 'radio',
            label: '9. Have you run the Sean Ellis test ("How would you feel if you could no longer use this product?")',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ],
            required: true
        },
        {
            id: 'investor_pmf_question',
            type: 'textarea',
            label: '10. What is the hardest PMF-related question an investor has asked you?',
            placeholder: 'Share your experience...',
            required: false
        },
        {
            id: 'runway_wasted',
            type: 'radio',
            label: '11. Do you feel you have wasted runway scaling before finding true PMF?',
            options: [
                { label: 'Yes, significantly', value: 'yes_significantly' },
                { label: 'A little bit', value: 'a_little' },
                { label: 'No, we are disciplined', value: 'no' }
            ],
            required: true
        },
        {
            id: 'has_unified_dashboard',
            type: 'radio',
            label: '12. Do you have a single unified dashboard that combines product usage and revenue data?',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ],
            required: true
        },
        {
            id: 'biggest_pmf_frustration',
            type: 'textarea',
            label: '13. What is your biggest frustration when trying to measure or prove PMF?',
            placeholder: 'Be honest...',
            required: false
        },
        {
            id: 'pmf_score_usefulness',
            type: 'select',
            label: '14. If a tool could automatically calculate a definitive PMF score (1-100) from your raw data, how useful would that be? (1-10)',
            options: Array.from({ length: 10 }, (_, i) => ({ label: String(i + 1), value: String(i + 1) })),
            required: true
        },
        {
            id: 'follow_up_email',
            type: 'email',
            label: '15. (Optional) Enter your email to receive early access to VeloDesk and the final survey report.',
            placeholder: 'you@company.com',
            required: false
        }
    ]
}
