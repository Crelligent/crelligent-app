import { MetadataRoute } from 'next'
import { templates } from '@/data/templates'
import { aehiReports } from '@/data/research'
import { problems } from '@/data/problems'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.crelligent.com'

    const coreRoutes = [
        '',
        '/focus',
        '/contact',
        '/foundry',
        '/intelligent-systems',
        '/enterprise',
        '/pricing',
        '/onboarding',
        '/templates',
        '/research/aehi',
        '/problems',
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

    return [...coreRoutes, ...templateRoutes, ...researchRoutes, ...problemRoutes]
}
