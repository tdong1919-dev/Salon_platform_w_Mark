# Salon Platform

A customizable booking-and-payments platform for salons, spas, and medspas — sold
as a white-label template. This repo is the **marketing + demo + lead-capture
layer**; the full booking system (built with Mark) merges in here.

## What's in here today

- **Landing page** (`app/page.tsx`) — hero, pain points, ROI calculator, branded
  demo, revenue operating-system positioning, launch sequence, and demo-request
  CTAs.
- **Savings calculator** (`components/marketing/SavingsCalculator.tsx`) — two tabs:
  - *Fee savings* — credit-card processing fees today vs. with ACH client wallets.
  - *Revenue lift* — extra-visit revenue from retention + breakage − wallet promo cost.
- **Live brand theming** (`components/marketing/BrandThemedDemo.tsx` + `app/api/brandfetch`)
  — enter a website/Instagram and the booking demo re-skins to the brand's logo,
  colors, and fonts via the Brandfetch API (deterministic palette fallback), then
  shows booking, wallet checkout, rewards, social queue, and inventory reorder
  signals.
- **Demo-request capture** (`components/marketing/DemoCTA.tsx` + `app/api/demo-request`)
  — modal lead form → appended to a Google Sheet (via Apps Script webhook) and/or
  emailed via Resend. No database required. Leads include the prospect's biggest
  bottleneck so outreach can focus on fees, retention/cross-sell, social
  scheduling, rewards, or inventory/reorder.

## Tech stack

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · recharts · Google Sheets +
Resend for lead capture · deploy on Netlify (`@netlify/plugin-nextjs`).

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
```

## Lead storage (Google Sheets)

No database needed. Demo requests are appended to a Google Sheet:

1. Open a Google Sheet → **Extensions → Apps Script**, paste `docs/sheets-webhook.gs`.
2. **Deploy → New deployment → Web app** (execute as you, access "Anyone"), copy the
   `/exec` URL.
3. Set `SHEETS_WEBHOOK_URL` (and optionally `SHEETS_WEBHOOK_SECRET`) in your env.

Leads are also emailed via Resend if `RESEND_API_KEY` is set. The legacy Supabase
schema is kept in `supabase/migrations/` for reference if you later move to Postgres.

## Deploy (Netlify)

1. Connect this repo as a new Netlify site.
2. Build command `npm run build`, plugin `@netlify/plugin-nextjs` (already in `netlify.toml`).
3. Add the environment variables from `.env.example` in **Site settings → Environment variables**.

## Roadmap

- Merge Mark's booking system (calendar, services, staff, checkout).
- ACH client wallet (Stripe / Stripe Connect) — the core fee-saving feature.
- Retell.ai voice agent for inbound calls.
- Marketing automation (Autom8 integration).
- Inventory thresholds, vendor reorder drafts, and owner approval workflow.
