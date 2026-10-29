/**
 * Optional admin notification for new Foundry applications via Resend.
 * Skips silently when RESEND_API_KEY is not set. Never throws.
 */
import type { FoundryApplication } from './schema'
import { packageName } from './packages'

const ADMIN_EMAIL = 'admin@crelligent.com'
const DEFAULT_FROM = 'Crelligent Foundry <foundry@crelligent.com>'

export async function notifyNewApplication(app: FoundryApplication, applicationId?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const lines = [
    `New Foundry application${applicationId ? ` (${applicationId})` : ''}`,
    '',
    `Founder: ${app.founderName}`,
    `Email: ${app.email}`,
    `Phone: ${app.phone ?? '-'}`,
    `Company: ${app.companyName}`,
    `Website: ${app.website ?? '-'}`,
    `Country: ${app.country}`,
    `Stage: ${app.stage}`,
    `Team size: ${app.teamSize}`,
    `Path: ${app.path}`,
    `Package: ${packageName(app.packageInterest)}`,
    `Monthly revenue: ${app.revenueBand ?? '-'}`,
    `Heard from: ${app.heardFrom}${app.heardFromOther ? ` (${app.heardFromOther})` : ''}`,
    '',
    'What they want to achieve:',
    app.goals,
  ]

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.FOUNDRY_NOTIFY_FROM || DEFAULT_FROM,
        to: [ADMIN_EMAIL],
        reply_to: app.email,
        subject: `Foundry application: ${app.companyName} (${app.founderName})`,
        text: lines.join('\n'),
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) console.error('[foundry] Resend notification failed', res.status, await res.text().catch(() => ''))
  } catch (err) {
    console.error('[foundry] Resend notification error', err instanceof Error ? err.message : err)
  }
}
