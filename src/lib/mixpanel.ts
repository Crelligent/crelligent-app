import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN =
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '5f90e258e12c35431bca60ea4f50e89d'

let isInitialized = false

/**
 * Initialize Mixpanel for the main Crelligent website.
 * Default opt_out_tracking_by_default: true for GDPR/CCPA compliance.
 * Syncs with 'crelligent-cookie-consent' in localStorage.
 */
export function initMixpanel() {
    if (typeof window === 'undefined') return
    if (isInitialized) return

    mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV !== 'production',
        track_pageview: true,
        persistence: 'localStorage',
        opt_out_tracking_by_default: true,
        ignore_dnt: false,
    })

    mixpanel.register({
        app: 'crelligent_web',
        platform: 'web',
    })

    // Sync with existing cookie consent
    const consent = localStorage.getItem('crelligent-cookie-consent')
    if (consent === 'accepted') {
        mixpanel.opt_in_tracking()
    } else if (consent === 'rejected') {
        mixpanel.opt_out_tracking()
    }

    isInitialized = true
}

export function optInTracking() {
    if (typeof window === 'undefined') return
    initMixpanel()
    mixpanel.opt_in_tracking()
}

export function optOutTracking() {
    if (typeof window === 'undefined') return
    initMixpanel()
    mixpanel.opt_out_tracking()
}

export function hasOptedIn(): boolean {
    if (typeof window === 'undefined') return false
    initMixpanel()
    return mixpanel.has_opted_in_tracking()
}

export function identifyUser(
    userId: string,
    profile?: {
        name?: string
        email?: string
        company?: string
        [key: string]: any
    }
) {
    if (typeof window === 'undefined') return
    initMixpanel()

    mixpanel.identify(userId)

    if (profile) {
        const peopleProps: Record<string, any> = {}
        if (profile.name) peopleProps.$name = profile.name
        if (profile.email) peopleProps.$email = profile.email

        Object.entries(profile).forEach(([key, val]) => {
            if (key !== 'name' && key !== 'email' && val !== undefined) {
                peopleProps[key] = val
            }
        })

        mixpanel.people.set(peopleProps)
    }
}

export function resetUser() {
    if (typeof window === 'undefined') return
    initMixpanel()
    mixpanel.reset()
}

export function registerSuperProperties(properties: Record<string, any>) {
    if (typeof window === 'undefined') return
    initMixpanel()
    mixpanel.register(properties)
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
    if (typeof window === 'undefined') return
    initMixpanel()

    mixpanel.track(eventName, {
        app: 'crelligent_web',
        platform: 'web',
        ...properties,
    })
}

export default mixpanel
