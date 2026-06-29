import SavingsCalculator from "@/components/marketing/SavingsCalculator";
import BrandThemedDemo from "@/components/marketing/BrandThemedDemo";
import DemoCTA from "@/components/marketing/DemoCTA";

const BOTTLENECKS = [
  "Merchant fees skimming every sale",
  "Too many disconnected tech tools",
  "Inventory always running low",
  "Payroll & commission math",
  "Falling behind on social media",
  "Hard to keep up with trends",
  "Lapsed clients quietly slipping away",
  "Upsells the team forgets to make",
  "Last-minute cancellations left unfilled",
  "Retail & at-home sales left on the table",
  "Complaints with nowhere to go",
  "Google reviews going unanswered",
  "Reviews scattered across sites",
  "Rewards & promos too manual to run",
];

const PILLARS = [
  {
    name: "Payments & financials",
    items: [
      {
        title: "Stripe wallet checkout",
        body: "Prepaid client wallets, powered by Stripe, move regulars off card swipes and cut merchant fees — with cards kept as a guest fallback.",
      },
      {
        title: "Financial agent",
        body: "Chat to update commissions, run payroll, and review your numbers — plus monthly, plain-English advice on lifting your bottom line.",
      },
    ],
  },
  {
    name: "Inventory & operations",
    items: [
      {
        title: "Inventory agent",
        body: "Staff flag a low product; the agent alerts whoever orders, scans reputable suppliers for the best price (logging into your vendor accounts when needed), and files each order as COGS or Supplies for easy taxes.",
      },
      {
        title: "One customizable platform",
        body: "Every tool in a single place — no relearning ten apps. Add or remove modules so the OS fits your salon, not the other way around.",
      },
      {
        title: "Online store",
        body: "Sell at-home products online to extend the salon experience, and ring up retail in-salon from the same catalog.",
      },
    ],
  },
  {
    name: "Marketing & intelligence",
    items: [
      {
        title: "Growth suite",
        body: "Smart scheduling, analytics, Brand Brain, and comment-to-DM automation — all in your brand. (TikTok & LinkedIn coming soon.)",
      },
      {
        title: "Industry intelligence agent",
        body: "A monthly, executive one-page report on what's trending and what competitors are doing in your exact niche — informed by your Brand Brain and services.",
      },
      {
        title: "Rewards & promotions",
        body: "Build and schedule programs — birthdays, Mother's Day, major holidays — and target the right clients with the right offer automatically.",
      },
    ],
  },
  {
    name: "Clients & retention",
    items: [
      {
        title: "Re-engagement agent",
        body: "A daily list of clients overdue for each service, pulled from their portal — visit history, payments, reviews, and files, all in one place.",
      },
      {
        title: "Upsell cues",
        body: "Your team is notified the moment a client is a strong candidate for an upgrade, add-on, or retail product.",
      },
      {
        title: "Last-minute fills",
        body: "Clients opt in to be alerted of openings within 24 hours, by app or SMS — so cancellations don't stay empty.",
      },
      {
        title: "Speak to a manager",
        body: "Clients file complaints in-app instead of cornering the front desk. The owner/manager is alerted and re-pinged at 24 hours until the ticket is closed.",
      },
      {
        title: "Review management agent",
        body: "Replies to Google reviews professionally and escalates anything negative for your sign-off before it posts.",
      },
      {
        title: "Review hub",
        body: "Captures reviews from Google, your website, and old booking sites and condenses them into one central place.",
      },
    ],
  },
];

const LAUNCH_STEPS = [
  "Theme the booking experience to your brand.",
  "Import services, staff, hours, and checkout rules.",
  "Activate the wallet, rewards, rebooking, and upsell cues.",
  "Switch on the financial, inventory, marketing, and review agents.",
];

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`max-w-6xl mx-auto px-5 ${className}`}>{children}</section>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">{children}</p>;
}

/** Elegant linen placeholder — swap the inner content for an <img> when photos are ready. */
function PhotoFrame({ caption, className = "", ratioClass = "aspect-[4/3]" }: { caption: string; className?: string; ratioClass?: string }) {
  return (
    <div className={`photo-frame relative w-full overflow-hidden rounded-md border border-border ${ratioClass} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] uppercase tracking-[0.24em] text-text-muted">{caption}</span>
      </div>
    </div>
  );
}

export default function JidokaLandingPage() {
  return (
    <main>
      {/* Top bar */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-5">
          <span className="font-serif text-lg tracking-wide">
            JIDOKA <span className="text-text-secondary">Cosmetics OS</span>
          </span>
          <DemoCTA label="Book a demo" variant="outline" />
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-16 pb-10 text-center sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>The operating system for modern cosmetics businesses</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            A more beautiful way to run your salon.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            JIDOKA Cosmetics OS puts an intelligent agent on every bottleneck — payments, inventory,
            payroll, marketing, reviews, and retention — in one customizable platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DemoCTA label="Book a free demo" variant="primary" />
            <a
              href="#calculator"
              className="rounded-sm border border-text-primary/30 px-7 py-3.5 text-[12px] uppercase tracking-[0.14em] text-text-primary transition-colors hover:bg-black/[0.04]"
            >
              Calculate my savings
            </a>
          </div>
        </div>
      </Section>

      {/* Live branded demo — right under the hero CTAs */}
      <Section className="mt-6">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Eyebrow>Live branded demo</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">See it in your brand — every feature.</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Drop in your website or Instagram. We pull your logo, colors, and fonts, then walk you through
            booking, wallet checkout, rewards, marketing, the AI receptionist, and inventory — themed to you.
          </p>
        </div>
        <BrandThemedDemo />
      </Section>

      {/* Built by salon owners */}
      <Section className="mt-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <PhotoFrame caption="Founders / your team at work" ratioClass="aspect-[4/5]" className="max-w-md" />
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
              Built by salon owners, for salon owners.
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary">
              We lived the 3% card fees, the missed calls during a color, and the juggling of ten tools that
              never talked to each other. So we built the platform we wished we had — one that protects your
              margin, fills your chairs, and feels as considered as the work you do.
            </p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              Every feature started as a problem on our own salon floor. Nothing here is theoretical.
            </p>
          </div>
        </div>
      </Section>

      {/* Bottlenecks */}
      <Section className="mt-28">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow>The daily grind</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
            You didn&apos;t open a salon to fight your software.
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            The bottlenecks that quietly drain your margin, your time, and your energy — every single week.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {BOTTLENECKS.map((b) => (
            <div key={b} className="flex items-baseline gap-3 border-b border-border py-3">
              <span className="text-[#9A7B4F]" aria-hidden="true">—</span>
              <span className="text-text-secondary">{b}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* The OS — an agent for every bottleneck */}
      <Section className="mt-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>One OS, many agents</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">An agent for every bottleneck.</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            JIDOKA Cosmetics OS puts intelligent agents on the work that drains your day — and lets you add,
            remove, and customize each one to fit how your salon actually runs.
          </p>
        </div>

        <div className="space-y-14">
          {PILLARS.map((pillar) => (
            <div key={pillar.name}>
              <div className="mb-5 flex items-center gap-4">
                <h3 className="font-serif text-2xl font-medium">{pillar.name}</h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                {pillar.items.map((item) => (
                  <div key={item.title} className="bg-surface p-6">
                    <h4 className="font-serif text-xl font-medium">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Editorial photo band */}
      <Section className="mt-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <PhotoFrame caption="Service close-up" ratioClass="aspect-[3/4]" />
          <PhotoFrame caption="Studio detail" ratioClass="aspect-[3/4]" />
          <PhotoFrame caption="Happy client" ratioClass="aspect-[3/4]" />
        </div>
      </Section>

      {/* Savings calculator */}
      <Section id="calculator" className="mt-28 scroll-mt-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Eyebrow>Your savings calculator</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">See it against your own numbers.</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Enter your salon&apos;s figures to see card fees, wallet savings, and revenue lift measured against your total revenue.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <SavingsCalculator />
        </div>
      </Section>

      {/* Launch sequence */}
      <Section className="mt-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Launch sequence</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">From demo to operating system.</h2>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              Start with the fee-savings wedge, then switch on agents one by one as more of the salon moves
              onto the platform — at your pace.
            </p>
          </div>
          <div className="space-y-3">
            {LAUNCH_STEPS.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-md border border-border bg-surface-elevated p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                  {index + 1}
                </span>
                <p className="text-sm text-text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="mt-28 mb-24">
        <div className="overflow-hidden rounded-lg border border-border">
          <PhotoFrame caption="Closing image — your space, your brand" ratioClass="aspect-[16/6]" className="rounded-none border-0" />
          <div className="bg-surface-elevated px-6 py-12 text-center">
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">One OS. An agent for every bottleneck.</h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-text-secondary">
              Themed to your brand, customizable to your salon, and built to protect your margin. See it on your own business.
            </p>
            <div className="mt-8 flex justify-center">
              <DemoCTA label="Book a free demo" variant="primary" />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
