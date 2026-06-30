import SavingsCalculator from "@/components/marketing/SavingsCalculator";
import BrandThemedDemo from "@/components/marketing/BrandThemedDemo";
import ClientBookingDemo from "@/components/marketing/ClientBookingDemo";
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
];

type PillarVisualType = "checkout" | "upsell" | "financial" | "opening";

const PILLARS: {
  name: string;
  visual: PillarVisualType;
  items: { title: string; body: string }[];
}[] = [
  {
    name: "Payments & POS",
    visual: "checkout",
    items: [
      {
        title: "Stripe wallet checkout",
        body: "Prepaid client wallets, powered by Stripe, move regulars off card swipes and cut merchant fees — with cards kept as a guest fallback.",
      },
    ],
  },
  {
    name: "Inventory & operations",
    visual: "upsell",
    items: [
      {
        title: "Inventory Assistant",
        body: "Staff flag a low product; the assistant alerts whoever orders, scans reputable suppliers for the best price, and files each order as COGS or Supplies for easier taxes.",
      },
      {
        title: "One customizable platform",
        body: "Every tool in a single place — no relearning ten apps. Add or remove modules so the OS fits your salon, not the other way around.",
      },
      {
        title: "Upsell cues",
        body: "Your team is notified the moment a client is a strong candidate for an upgrade, add-on, or retail product.",
      },
    ],
  },
  {
    name: "Marketing & intelligence",
    visual: "financial",
    items: [
      {
        title: "Financial Assistant",
        body: "Chat to update commissions, run payroll, review your numbers, and get monthly plain-English advice on lifting your bottom line.",
      },
      {
        title: "Industry Intelligence Assistant",
        body: "A monthly, executive one-page report on what's trending and what competitors are doing in your exact niche — informed by your Brand Brain and services.",
      },
      {
        title: "Reviews Assistant",
        body: "Scans Google Business and old booking services, imports reviews into the OS, writes unique replies to positive reviews, escalates reviews under 3 stars with a professional manager follow-up, and notifies the assigned owner or manager.",
      },
    ],
  },
  {
    name: "Clients & retention",
    visual: "opening",
    items: [
      {
        title: "Receptionist Assistant",
        body: "Supports missed calls, booking requests, and client questions so the front desk has fewer interruptions during services.",
      },
      {
        title: "Re-engagement workflows",
        body: "A daily list of clients overdue for each service, pulled from their portal — visit history, payments, reviews, and files, all in one place.",
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
        title: "Review hub",
        body: "Captures reviews from Google, your website, and old booking sites and condenses them into one central place.",
      },
    ],
  },
];

const LAUNCH_STEPS = [
  "Theme the booking experience to your brand.",
  "Import services, staff, hours, and checkout rules.",
  "Activate the wallet, rebooking, and upsell cues.",
  "Switch on the financial, inventory, reviews, intelligence, and receptionist assistants.",
];

const ASSISTANT_ROBOTS = [
  { name: "Financial", role: "Payroll + margin", color: "#4B7A63" },
  { name: "Inventory", role: "Stock + reorder", color: "#9A7B4F" },
  { name: "Reviews", role: "Reputation", color: "#B05B49" },
  { name: "Intelligence", role: "Market briefings", color: "#45657C" },
  { name: "Receptionist", role: "Booking support", color: "#7A5C91" },
];

const SUBSCRIPTION_URL = process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_URL || "/settings/stripe";

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

function AssistantRobotShowcase() {
  return (
    <div className="assistant-robot-stage mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5">
      {ASSISTANT_ROBOTS.map((robot, index) => (
        <div key={robot.name} className="assistant-robot-card" style={{ animationDelay: `${index * 0.18}s` }}>
          <div className="assistant-robot" aria-hidden="true" style={{ animationDelay: `${index * 0.12}s` }}>
            <div className="assistant-robot-antenna" style={{ backgroundColor: robot.color }} />
            <div className="assistant-robot-head" style={{ borderColor: robot.color }}>
              <span />
              <span />
            </div>
            <div className="assistant-robot-body" style={{ backgroundColor: robot.color }}>
              <div className="assistant-robot-panel" />
            </div>
            <div className="assistant-robot-arm assistant-robot-arm-left" style={{ backgroundColor: robot.color }} />
            <div className="assistant-robot-arm assistant-robot-arm-right" style={{ backgroundColor: robot.color }} />
          </div>
          <p className="mt-3 font-serif text-lg font-medium">{robot.name} Assistant</p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-text-muted">{robot.role}</p>
        </div>
      ))}
    </div>
  );
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[32px] border border-text-primary bg-text-primary p-2 shadow-sm">
      <div className="min-h-[420px] rounded-[26px] bg-white p-4">
        <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-border" />
        {children}
      </div>
    </div>
  );
}

function PillarVisual({ type }: { type: PillarVisualType }) {
  if (type === "checkout") {
    return (
      <div className="mt-5 grid grid-cols-1 items-center gap-5 rounded-md border border-border bg-surface-elevated p-5 md:grid-cols-[0.8fr_1fr]">
        <PhoneShell>
          <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Checkout</p>
          <h4 className="mt-2 font-serif text-2xl font-medium">Balayage refresh</h4>
          <div className="mt-5 space-y-3 rounded-2xl border border-border bg-surface p-4">
            <div className="flex justify-between text-sm"><span>Service</span><span>$225</span></div>
            <div className="flex justify-between text-sm"><span>Gloss add-on</span><span>$32</span></div>
            <div className="flex justify-between border-t border-border pt-3 text-sm font-medium"><span>Wallet balance</span><span>$300</span></div>
          </div>
          <button className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-medium text-white">Pay from wallet</button>
          <p className="mt-3 text-center text-xs text-text-muted">Lower-fee checkout, no front-desk scramble.</p>
        </PhoneShell>
        <div>
          <p className="font-serif text-2xl font-medium">What checkout feels like for the client.</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Clients can confirm the service, apply wallet funds, and attach retail before they leave the chair.
            The salon keeps the experience smooth while reducing repeat card fees.
          </p>
        </div>
      </div>
    );
  }

  if (type === "upsell") {
    return (
      <div className="mt-5 rounded-md border border-border bg-surface-elevated p-5">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-3 w-3 rounded-full bg-success" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Team cue</p>
              <p className="mt-2 font-serif text-2xl font-medium">
                Suggest a facial to Sandra, it&apos;s been 3 months.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                She just booked a brow service for today, so the cue appears before checkout.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs text-success">High-fit add-on</span>
            <span className="rounded-full bg-[#9A7B4F]/12 px-3 py-1 text-xs text-[#7a6038]">Before checkout</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "financial") {
    return (
      <div className="mt-5 grid grid-cols-1 gap-4 rounded-md border border-border bg-surface-elevated p-5 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md border border-border bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Financial Assistant report</p>
          <p className="mt-3 font-serif text-3xl font-medium">$1,840</p>
          <p className="mt-1 text-sm text-text-secondary">Projected monthly margin lift</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-border">
            <div className="h-full w-[68%] bg-success" />
          </div>
        </div>
        <div className="rounded-md border border-border bg-white p-5">
          <p className="font-serif text-xl font-medium">This month&apos;s read</p>
          <div className="mt-4 space-y-3 text-sm text-text-secondary">
            <p>Retail attach rate rose to 31%, but Tuesday color appointments are under capacity.</p>
            <p>Payroll is healthy if commission-only staff stay below a 47% blended payout.</p>
            <p className="text-text-primary">Recommended move: test a weekday gloss refresh bundle and measure rebooking within 14 days.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 items-center gap-5 rounded-md border border-border bg-surface-elevated p-5 md:grid-cols-[0.8fr_1fr]">
      <PhoneShell>
        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Opening alert</p>
        <h4 className="mt-2 font-serif text-2xl font-medium">Today at 2:30 PM</h4>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Jordan has a last-minute color opening. Want the spot?
        </p>
        <div className="mt-5 space-y-2">
          <button className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white">Claim appointment</button>
          <button className="w-full rounded-xl border border-border py-3 text-sm text-text-secondary">Not today</button>
        </div>
      </PhoneShell>
      <div>
        <p className="font-serif text-2xl font-medium">Empty chair, filled faster.</p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Clients who opted into openings get a clean, mobile-first alert. Your team fills the gap without
          manually texting through a waitlist.
        </p>
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
          <div className="flex items-center gap-5">
            <a href="/about" className="hidden text-[12px] uppercase tracking-[0.14em] text-text-secondary hover:text-text-primary sm:inline">
              About
            </a>
            <a href="/account" className="hidden text-[12px] uppercase tracking-[0.14em] text-text-secondary hover:text-text-primary sm:inline">
              Sign in
            </a>
            <DemoCTA label="Start my upgrade" variant="outline" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-16 pb-10 text-center sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>The operating system for modern cosmetics businesses</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            A less stress, more profit way to run your salon.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            JIDOKA Cosmetics Operating System gives you an assistant for every obstacle- payments,
            inventory, payroll, marketing, reviews, and retention in one customizable platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DemoCTA label="Start my salon upgrade" variant="primary" />
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
            booking, wallet checkout, retail, the receptionist assistant, inventory, and the assistant hub — themed to you.
          </p>
        </div>
        <BrandThemedDemo />
        <AssistantRobotShowcase />
      </Section>

      <Section className="mt-16">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Eyebrow>Client experience demo</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">What clients see when they book.</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Show your team the client side too: a simple booking flow that works on desktop and feels natural on a phone.
          </p>
        </div>
        <ClientBookingDemo />
      </Section>

      {/* Built by salon owners */}
      <Section className="mt-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <PhotoFrame caption="Founders / your team at work" ratioClass="aspect-[4/5]" className="max-w-md" />
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
              Built by salon owners,
              <span className="block">for salon owners.</span>
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
            You didn&apos;t open a salon to feel exhausted.
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            The uphill battle that quiently drains your margins, time, and energy - every. single. week.
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

      {/* The OS — an assistant for every obstacle */}
      <Section className="mt-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>One System, Five Assistants</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">An assistant for every obstacle.</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            JIDOKA Cosmetics OS puts intelligent assistants on the work that drains your day — and lets you add,
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
              <PillarVisual type={pillar.visual} />
            </div>
          ))}
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
              Start with the fee-savings wedge, then switch on assistants one by one as more of the salon moves
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
        <div className="rounded-lg border border-border bg-surface-elevated px-6 py-12 text-center">
          <Eyebrow>7-day guided trial</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
            Test it out with your team. Start a 7-day free trial.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-text-secondary">
            An implementation specialist will assist you and your business through the next 7 days so your team can
            explore the system, give feedback, and see where it saves time first.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={SUBSCRIPTION_URL}
              className="rounded-sm bg-gradient-brand px-7 py-3.5 text-[12px] uppercase tracking-[0.14em] text-white transition-colors hover:opacity-90"
            >
              Start 7-day free trial
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border">
        <Section className="py-12">
          <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">Explore the assistants</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { href: "/financials", label: "Financial Assistant" },
              { href: "/inventory", label: "Inventory Assistant" },
              { href: "/intelligence", label: "Industry intelligence" },
              { href: "/clients", label: "Client re-engagement" },
              { href: "/openings", label: "Fill openings" },
              { href: "/waitlist", label: "Client waitlist" },
              { href: "/reviews", label: "Reviews hub" },
              { href: "/speak-to-a-manager", label: "Speak to a manager" },
              { href: "/wallet", label: "Client wallet" },
              { href: "/store", label: "Online store" },
              { href: "/settings/stripe", label: "Connect Stripe" },
              { href: "/about", label: "About" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-text-secondary hover:text-text-primary">
                {l.label}
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-text-muted">JIDOKA Cosmetics OS — an assistant for every salon obstacle.</p>
        </Section>
      </footer>
    </main>
  );
}
