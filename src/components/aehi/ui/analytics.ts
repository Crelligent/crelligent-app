/** Fires a GA4 event if gtag is loaded. Never send personal data. */
type Gtag = (command: 'event', name: string, params?: Record<string, string>) => void

export function track(name: 'diagnostic_click' | 'partner_enquiry_submit' | 'notify_submit', params?: Record<string, string>) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag === 'function') gtag('event', name, params)
}
