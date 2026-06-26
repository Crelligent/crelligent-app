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
        '/intelligent-systems',
        '/intelligent-systems/its',
        '/intelligent-systems/ies',
        '/intelligent-systems/ils',
        '/intelligent-systems/iis',
        '/intelligent-systems/ibs',
        '/intelligent-systems/ihs',
        '/intelligent-systems/ias',
        '/intelligent-systems/iss',
        '/intelligent-systems/irs',
        '/intelligent-systems/ifis',
        '/enterprise',

        // Platforms
        'https://velodesk.crelligent.com',
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
