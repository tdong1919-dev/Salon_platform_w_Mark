import SavingsCalculator from "@/components/marketing/SavingsCalculator";
import BrandThemedDemo from "@/components/marketing/BrandThemedDemo";
import DemoCTA from "@/components/marketing/DemoCTA";

const PAINS = [
  {
    icon: "✕",
    title: "Card fees bleed your margin",
    body: "2.6–2.9% on every swipe, every visit, forever. It quietly adds up to thousands a year.",
  },
  {
    icon: "✕",
    title: "Missed calls = lost bookings",
    body: "You're mid-color and the phone rings out. That caller just booked your competitor.",
  },
  {
    icon: "✕",
    title: "Too many tools, too many fees",
    body: "Booking, POS, marketing, rewards, phones, and inventory live in separate systems.",
  },
];

const REVENUE_LEVERS = [
  {
    label: "Lower transaction costs",
    title: "ACH wallet at checkout",
    body: "Move regulars from card swipes to prepaid wallet loads, while keeping card fallback for guests.",
    metric: "Up to 70% fee reduction",
  },
  {
    label: "Retention and cross-sell",
    title: "Next-best-offer engine",
    body: "Trigger rebooking, memberships, packages, and add-ons from visit history and service timing.",
    metric: "+1 visit per loyal client",
  },
  {
    label: "Social scheduling",
    title: "Offer calendar",
    body: "Turn openings, seasonal services, and low-demand days into ready-to-post campaigns.",
    metric: "Fewer empty chairs",
  },
  {
    label: "Inventory and reorder",
    title: "Agentic stock assistant",
    body: "Track product use through POS, flag low stock, and draft reorder carts before shelves run dry.",
    metric: "No surprise stockouts",
  },
];

const LAUNCH_STEPS = [
  "Theme the booking demo to each salon's brand.",
  "Import services, staff, hours, and checkout rules.",
  "Activate wallet rewards, rebooking, and cross-sell campaigns.",
  "Connect inventory thresholds and reorder approvals.",
];

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`max-w-6xl mx-auto px-5 ${className}`}>{children}</section>;
}

function HeroConsole() {
  const rows = [
    { label: "POS checkout", value: "$225 balayage", meta: "ACH wallet fee: $1.80" },
    { label: "Retention", value: "8-week rebook due", meta: "Offer: gloss add-on +$45" },
    { label: "Social queue", value: "3 posts ready", meta: "Openings, rewards, retail push" },
    { label: "Inventory", value: "Color tubes low", meta: "Reorder draft needs approval" },
  ];

  return (
    <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-surface p-3 text-left shadow-2xl shadow-black/25">
      <div className="rounded-xl border border-white/5 bg-surface-elevated p-4 sm:p-5">
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-text-muted">Today at Glow House</p>
            <h2 className="mt-1 text-xl font-semibold">Booking, POS, marketing, and stock in one view</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-[#1f2937] px-3 py-2">
              <p className="text-[11px] text-text-secondary">Booked</p>
              <p className="text-sm font-semibold">87%</p>
            </div>
            <div className="rounded-lg bg-[#11372f] px-3 py-2">
              <p className="text-[11px] text-text-secondary">Saved</p>
              <p className="text-sm font-semibold text-success">$412</p>
            </div>
            <div className="rounded-lg bg-[#3b2a14] px-3 py-2">
              <p className="text-[11px] text-text-secondary">Alerts</p>
              <p className="text-sm font-semibold text-warning">4</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          {rows.map((row) => (
            <div key={row.label} className="rounded-xl border border-border bg-[#0f0f0f] p-4">
              <p className="text-xs uppercase tracking-wide text-text-muted">{row.label}</p>
              <p className="mt-2 text-sm font-semibold">{row.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">{row.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SalonLandingPage() {
  return (
    <main className="py-12 sm:py-20">
      <Section className="text-center">
        <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-surface-elevated border border-border text-text-secondary">
          Booking + POS + AI growth ops, in one
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold leading-tight mt-5 mb-4">
          Stop losing salon profit in the gaps between tools.
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
          A white-label booking and POS platform that lowers card fees with ACH client wallets,
          keeps clients coming back with rewards, schedules social offers, and helps salons reorder
          inventory before it hurts revenue.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <DemoCTA label="Book a free demo" variant="primary" />
          <a href="#calculator" className="border border-border text-text-primary px-6 py-3 rounded-xl hover:bg-white/5">
            Calculate my savings
          </a>
        </div>
        <HeroConsole />
      </Section>

      <Section className="mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PAINS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface-elevated p-5">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-error/15 text-error text-sm mb-3">
                {p.icon}
              </span>
              <p className="font-medium mb-1.5">{p.title}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-24">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs uppercase tracking-wide text-text-muted mb-1">Revenue operating system</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Built around the bottlenecks salon owners feel every week</h2>
          <p className="text-text-secondary">
            The product is packaged for owners who want fewer vendors, lower payment leakage, better repeat
            visits, and cleaner operations without adding another spreadsheet to manage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVENUE_LEVERS.map((lever) => (
            <div key={lever.title} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted">{lever.label}</p>
                  <h3 className="mt-2 text-xl font-semibold">{lever.title}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-surface-elevated px-3 py-1 text-xs text-text-secondary">
                  {lever.metric}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{lever.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="calculator" className="mt-24 scroll-mt-8">
        <p className="text-xs uppercase tracking-wide text-text-muted mb-1">Your savings calculator</p>
        <h2 className="text-2xl font-semibold mb-6">See what the ACH wallet puts back in your pocket</h2>
        <SavingsCalculator />
      </Section>

      <Section className="mt-24">
        <p className="text-xs uppercase tracking-wide text-text-muted mb-1">Live branded demo</p>
        <h2 className="text-2xl font-semibold mb-2">Your salon, your colors — in seconds</h2>
        <p className="text-text-secondary mb-6 max-w-xl">
          Drop in your website and business name. We pull your logo, brand colors, and fonts and theme the
          booking experience instantly.
        </p>
        <BrandThemedDemo />
      </Section>

      <Section className="mt-24">
        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-surface p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-text-muted mb-1">Launch sequence</p>
            <h2 className="text-2xl font-semibold mb-3">From prospect demo to operating system</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Start with the fee-savings wedge, then expand into retention, social scheduling, rewards,
              inventory tracking, and reorder approvals as the salon moves more workflow onto the platform.
            </p>
          </div>
          <div className="space-y-3">
            {LAUNCH_STEPS.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-xl bg-surface-elevated p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0f6e56] text-sm font-semibold">
                  {index + 1}
                </span>
                <p className="text-sm text-text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="mt-24">
        <div className="rounded-2xl bg-surface-elevated border border-border text-center px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            One platform. Lower fees. More repeat visits.
          </h2>
          <p className="text-text-secondary mb-7 max-w-lg mx-auto">
            Built on your booking site, themed to your brand, and packaged around the revenue leaks you already feel.
          </p>
          <DemoCTA label="Book a free demo" variant="primary" className="px-7" />
        </div>
      </Section>
    </main>
  );
}
