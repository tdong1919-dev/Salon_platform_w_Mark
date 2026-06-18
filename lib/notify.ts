/**
 * Email notification helper for demo requests.
 * Env-gated: if RESEND_API_KEY isn't set, it no-ops (skipped:true) so a lead
 * submission never fails just because notifications aren't configured.
 */

export interface TicketNotification {
  name: string
  email: string
  phone?: string | null
  page_name?: string | null
  concern_type?: string | null
  message: string
}

type NotifyResult = { ok: boolean; skipped?: boolean; error?: string }

/** Email via Resend (https://resend.com). Free tier: 100/day. */
export async function sendHelpEmail(ticket: TicketNotification): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.HELP_NOTIFY_EMAIL || 'hello@barebranding.site'
  // Resend's shared sender works without domain verification (delivers to the account owner).
  const from = process.env.HELP_NOTIFY_FROM || 'Salon Platform <onboarding@resend.dev>'
  if (!apiKey) return { ok: false, skipped: true }

  const subject = `New ${ticket.concern_type || 'lead'} — ${ticket.page_name || ticket.name}`
  const text =
    `New lead from the salon platform site\n\n` +
    `Name: ${ticket.name}\n` +
    `Email: ${ticket.email}\n` +
    `Phone: ${ticket.phone || 'N/A'}\n` +
    `Salon: ${ticket.page_name || 'N/A'}\n` +
    `Type: ${ticket.concern_type || 'N/A'}\n\n` +
    `${ticket.message}\n`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, reply_to: ticket.email, subject, text }),
    })
    if (!res.ok) return { ok: false, error: `Resend ${res.status}: ${await res.text()}` }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'email send error' }
  }
}
