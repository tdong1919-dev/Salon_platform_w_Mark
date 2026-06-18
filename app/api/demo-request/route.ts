/**
 * POST /api/demo-request — capture a demo lead from the /salons landing page.
 * The lead is always saved to Supabase (service role, bypasses RLS); an email
 * notification fires via Resend if configured, reusing the support-email helper.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { sendHelpEmail } from '@/lib/notify'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const salonName = (body.salonName ?? body.salon_name ?? '').trim()
  const phone = (body.phone ?? '').trim()
  const website = (body.website ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || !email) {
    return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
  }

  const lead = {
    name,
    email,
    salon_name: salonName || null,
    phone: phone || null,
    website: website || null,
    message: message || null,
    source: (body.source ?? 'salons-landing').trim() || 'salons-landing',
  }

  // 1. Save the lead (service role — reliable, bypasses RLS).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svc = createServiceClient() as any
  const { data: saved, error } = await svc
    .from('demo_requests')
    .insert(lead)
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 2. Notify (never block the lead on this). Map into the support-email shape.
  const notify = await sendHelpEmail({
    name,
    email,
    phone: lead.phone,
    page_name: lead.salon_name,
    concern_type: 'Demo request',
    message:
      `New demo request from the salon landing page.\n\n` +
      `Salon: ${lead.salon_name || 'N/A'}\n` +
      `Website: ${lead.website || 'N/A'}\n` +
      `Phone: ${lead.phone || 'N/A'}\n\n` +
      `Notes:\n${message || 'N/A'}`,
  }).catch(() => ({ ok: false as const }))

  return NextResponse.json({ ok: true, id: saved.id, notification: notify })
}
