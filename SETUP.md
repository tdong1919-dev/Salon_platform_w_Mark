# JIDOKA Cosmetics OS — Setup & "what's left" checklist

This is everything needed to take the app from "builds locally" to "live and fully
working," plus the bigger features that still need real integrations.

---

## 1. Environment variables

Set these in `.env.local` (local) **and** in your Netlify site (Site settings →
Environment variables). Most features degrade gracefully if a key is missing.

| Variable | Powers | Where to get it | Status |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Financial agent, inventory reorder search, industry intelligence | [console.anthropic.com](https://console.anthropic.com) (pay-as-you-go) | **NEEDED** |
| `SHEETS_WEBHOOK_URL` | All sheet writes (leads, payroll, complaints, inventory, promotions, reviews, clients) | Apps Script `/exec` URL | ✅ you have it |
| `SHEETS_SHEET_ID` | Sheet **reads** (reviews hub, complaint re-ping, client re-engagement) | the long string between `/d/` and `/edit` in your sheet URL | **NEEDED for read features** |
| `SHEETS_WEBHOOK_SECRET` | (optional) reject unknown callers to the Apps Script | any random string (also set in the script) | optional |
| `CRON_SECRET` | Protects `/api/complaint/reping` and `/api/reengagement/digest` | any random string | **NEEDED for crons** |
| `BRANDFETCH_API_KEY` | Brand-theming demo | [developers.brandfetch.com](https://developers.brandfetch.com) | ✅ you have it |
| `RESEND_API_KEY` | All email notifications | [resend.com](https://resend.com) | ✅ you have it |
| `HELP_NOTIFY_EMAIL` | Inbox that receives alerts | your email | ✅ you have it |
| `NEXT_PUBLIC_APP_URL` | Absolute URLs | your live site URL | set on deploy |

---

## 2. Google Sheet — one-time

1. **Redeploy the Apps Script.** The script in `docs/sheets-webhook.gs` was updated
   to support structured tab writes (`{ tab, headers, row }`) used by the financial,
   inventory, promotions, reviews, and client features. In the Apps Script editor:
   paste the latest `docs/sheets-webhook.gs`, then **Deploy → Manage deployments →
   ✏️ → New version → Deploy** (same `/exec` URL). Without this, only lead capture works.
2. **Tabs are created automatically** on first write: `Leads`, `Staff`, `Payroll`,
   `Complaints`, `Inventory`, `Promotions`, `Reviews`, `Clients`.
3. **For the READ features** (reviews hub, complaint re-ping, client re-engagement digest):
   set `SHEETS_SHEET_ID` and share the sheet **"Anyone with the link can view."**
   - ⚠️ **Privacy:** link-view exposes *every* tab (incl. Payroll, Complaints, Clients)
     to anyone who has the link. The link/ID lives only in your server env, but if you
     handle real client data, move to a **service account or a real database** before
     launch. For early testing, link-view is an acceptable tradeoff.
   - If you skip this, read features degrade safely: the reviews hub shows sample
     reviews and the re-ping/digest crons simply find nothing.

---

## 3. Scheduled jobs (cron)

Two endpoints should run daily. Easiest free option: [cron-job.org](https://cron-job.org)
→ create a daily job for each URL with header `Authorization: Bearer <CRON_SECRET>`
(or append `?secret=<CRON_SECRET>`):

- `https://YOUR-SITE/api/complaint/reping` — re-alerts on complaints open >24h
- `https://YOUR-SITE/api/reengagement/digest` — emails the daily overdue-to-rebook list

(Netlify Scheduled Functions also work, but an external pinger is simplest for Next routes.)

---

## 4. Deploy to Netlify

1. Netlify → **Add new site → Import from Git** → pick `Salon_platform_w_Mark`.
2. Build command `npm run build`; the `@netlify/plugin-nextjs` runtime is in `netlify.toml`.
3. Add all the env vars from section 1.
4. After it's live, set `NEXT_PUBLIC_APP_URL` to the real URL and set up the crons (section 3).

---

## 5. What's built (working today)

| Page | What it does |
|---|---|
| `/` | Landing page, ROI calculator, brand-theming demo, demo-request capture |
| `/financials` | Financial agent — commissions, payroll (deterministic), advice |
| `/inventory` | Flag low stock + AI cheapest-reorder search; tax categories |
| `/intelligence` | Monthly executive industry/competitor briefing |
| `/clients` | Daily list of clients overdue to rebook + add clients |
| `/promotions` | Build & schedule rewards/promos with holiday templates |
| `/reviews` | Central reviews wall + leave-a-review |
| `/speak-to-a-manager` | Complaint tickets → owner alerts + 24h re-ping |

---

## 6. Still to build (need real integrations / decisions)

These were in the spec but require external services, approvals, or Mark's booking data:

| Feature | What it needs |
|---|---|
| **Stripe ACH client wallet** (flagship) | Stripe + **Stripe Connect** account, a balance/ledger store (a real DB is strongly recommended here — not the sheet), client auth |
| **Online store** | Stripe products + checkout, a product catalog |
| **Google review auto-responder** + **review aggregation** | **Google Business Profile API** (OAuth app + Google verification/approval) |
| **Last-minute cancellation fills (opt-in SMS)** | Booking calendar data + **Twilio** (SMS) and client opt-in storage |
| **Upsell cues** | Per-client visit/POS history (comes from the booking system) |
| **AUTOM8 marketing suite** (smart schedule, analytics, Brand Brain, comment→DM; TikTok/LinkedIn) | Integrate the existing Autom8 systems, re-branded to JIDOKA |
| **Scheduled promotion sends** | Wire the Promotions tab to a daily cron that sends via email/SMS |
| **Booking / POS / calendar core** | Mark's repo (merges in here) |

**Recommended next:** the Stripe ACH wallet — it's the headline value prop and the
one feature that genuinely warrants a real database (Supabase free tier or similar)
rather than the sheet.
