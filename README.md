# Salon Platform

A customizable booking-and-payments platform for salons, spas, and medspas — sold
as a white-label template. This repo is the **marketing + demo + lead-capture
layer**; the full booking system (built with Mark) merges in here.

## What's in here today

- **Landing page** (`app/page.tsx`) — hero, pain points, ROI calculator, branded
  demo, and demo-request CTAs.
- **Savings calculator** (`components/marketing/SavingsCalculator.tsx`) — two tabs:
  - *Fee savings* — credit-card processing fees today vs. with ACH client wallets.
  - *Revenue lift* — extra-visit revenue from retention + breakage − wallet promo cost.
- **Live brand theming** (`components/marketing/BrandThemedDemo.tsx` + `app/api/brandfetch`)
  — enter a website/Instagram and the booking demo re-skins to the brand's logo,
  colors, and fonts via the Brandfetch API (deterministic palette fallback).
- **Demo-request capture** (`components/marketing/DemoCTA.tsx` + `app/api/demo-request`)
  — modal lead form → saved to Supabase (`demo_requests`) + optional Resend email.

## Tech stack

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Supabase · recharts ·
deploy on Netlify (`@netlify/plugin-nextjs`).

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
```

## Database

Apply the migration in `supabase/migrations/` to your Supabase project to create
the `demo_requests` table (or run it from the Supabase SQL editor).

## Deploy (Netlify)

1. Connect this repo as a new Netlify site.
2. Build command `npm run build`, plugin `@netlify/plugin-nextjs` (already in `netlify.toml`).
3. Add the environment variables from `.env.example` in **Site settings → Environment variables**.

## Roadmap

- Merge Mark's booking system (calendar, services, staff, checkout).
- ACH client wallet (Stripe / Stripe Connect) — the core fee-saving feature.
- Retell.ai voice agent for inbound calls.
- Marketing automation (Autom8 integration).
