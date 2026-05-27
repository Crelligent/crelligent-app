import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://crelligent.com'

    const routes = [
        // Core pages
        '',
        '/focus',
        '/contact',

        // Service tiers
        '/foundry',
        '/intelligence-systems',
        '/enterprise',

        // Platforms
        '/platforms/velodesk',
        '/platforms/bisuite',
        '/platforms/marketpulse',

        // Capabilities
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

    return routes
}
