import { MetadataRoute } from 'next'
import { templates } from '@/data/templates'
import { aehiReports } from '@/data/research'
import { problems } from '@/data/problems'
import { industries } from '@/data/industries'
import { caseStudies } from '@/data/case-studies'
import { insights } from '@/data/insights'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.crelligent.com'

    const coreRoutes = [
        '',
        '/focus',
        '/contact',
        '/foundry',
        '/edge',
        '/enterprise',
        '/pricing',
        '/onboarding',
        '/tools/esre-os-score',
        '/tools/ai-readiness',
        '/tools/operating-model-assessment',
        '/tools/technology-readiness',
        '/templates',
        '/research/aehi',
        '/problems',
        '/industries',
        '/case-studies',
        '/insights',
        '/esre-os/methodology',
        '/esre-os/architecture',
        '/esre-os/layers',
        '/capabilities/business-design',
        '/capabilities/product-strategy',
        '/capabilities/product-systems',
        '/capabilities/systems-architecture',
        '/capabilities/cx-design',
        '/capabilities/design-experience',
        '/capabilities/data-intelligence',
        '/capabilities/technology-platform',
        '/capabilities/embedded-systems',
        '/capabilities/integration-infrastructure',
        '/capabilities/operating-model',
        '/capabilities/governance',
        '/capabilities/economics',
        '/capabilities/change-adoption',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : route.startsWith('/capabilities') ? 0.8 : 0.9,
    }))

    const templateRoutes = templates.map((t) => ({
        url: `${baseUrl}/templates/${t.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const researchRoutes = aehiReports.map((r) => ({
        url: `${baseUrl}/research/aehi/${r.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const problemRoutes = problems.map((p) => ({
        url: `${baseUrl}/problems/${p.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))
    
    const industryRoutes = industries.map((i) => ({
        url: `${baseUrl}/industries/${i.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const caseRoutes = caseStudies.map((cs) => ({
        url: `${baseUrl}/case-studies/${cs.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const insightRoutes = insights.map((a) => ({
        url: `${baseUrl}/insights/${a.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...coreRoutes, ...templateRoutes, ...researchRoutes, ...problemRoutes, ...industryRoutes, ...caseRoutes, ...insightRoutes]
}

