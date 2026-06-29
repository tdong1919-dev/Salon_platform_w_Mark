import SavingsCalculator from "@/components/marketing/SavingsCalculator";
import BrandThemedDemo from "@/components/marketing/BrandThemedDemo";
import DemoCTA from "@/components/marketing/DemoCTA";

const FEATURES = [
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
    label: "Marketing on autopilot",
    title: "Social offer calendar",
    body: "Turn openings, seasonal services, and quiet days into ready-to-post, on-brand campaigns.",
    metric: "Fewer empty chairs",
  },
  {
    label: "Never miss a call",
    title: "AI voice receptionist",
    body: "An AI agent answers, books, reschedules, and fills cancellations around the clock.",
    metric: "24/7 front desk",
  },
  {
    label: "Inventory and reorder",
    title: "Agentic stock assistant",
    body: "Track product use through POS, flag low stock, and draft reorder carts before shelves run dry.",
    metric: "No surprise stockouts",
  },
  {
    label: "One calendar",
    title: "Booking & POS in one",
    body: "Appointments, staff, deposits, and checkout in a single themed experience your clients love.",
    metric: "Fewer vendors",
  },
];

const LAUNCH_STEPS = [
  "Theme the booking experience to each salon's brand.",
  "Import services, staff, hours, and checkout rules.",
  "Activate wallet, rewards, rebooking, and cross-sell campaigns.",
  "Connect the AI receptionist, social calendar, and reorder approvals.",
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

export default function SalonLandingPage() {
  return (
    <main>
      {/* Top bar */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-5">
          <span className="font-serif text-lg tracking-wide">Salon Platform</span>
          <DemoCTA label="Book a demo" variant="outline" />
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-16 pb-12 text-center sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Booking · Payments · AI growth, in one</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            A more beautiful way to run your salon.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            One refined platform that lowers card fees with ACH client wallets, keeps clients coming back,
            answers every call with an AI receptionist, and markets while you work.
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
        <PhotoFrame caption="Hero — salon interior or signature service" ratioClass="aspect-[16/8]" className="mt-14" />
      </Section>

      {/* Built by salon owners, for salon owners */}
      <Section className="mt-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <PhotoFrame caption="Founders / your team at work" ratioClass="aspect-[4/5]" className="max-w-md" />
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
              Built by salon owners, for salon owners.
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary">
              We lived the 3% card fees, the missed calls during a color, and the juggling of five different
              tools that never talked to each other. So we built the platform we wished we had — one that
              protects your margin, fills your chairs, and feels as considered as the work you do.
            </p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              Every feature started as a problem on our own salon floor. Nothing here is theoretical.
            </p>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="mt-28">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow>What&apos;s inside</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
            Everything your salon runs on, in one place.
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Fewer vendors, less payment leakage, more repeat visits — without adding another spreadsheet to manage.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-surface p-6">
              <Eyebrow>{f.label}</Eyebrow>
              <h3 className="mt-3 font-serif text-xl font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{f.body}</p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.12em] text-[#9A7B4F]">{f.metric}</p>
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

      {/* Live branded demo */}
      <Section className="mt-28">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Eyebrow>Live branded demo</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">Your salon, your colors — every feature.</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Drop in your website or Instagram. We pull your logo, colors, and fonts, then walk you through
            booking, wallet checkout, rewards, marketing, the AI receptionist, and inventory — themed to you.
          </p>
        </div>
        <BrandThemedDemo />
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
              Start with the fee-savings wedge, then expand into retention, marketing, rewards, the AI
              receptionist, and inventory as more of the salon moves onto the platform.
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
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">One platform. Lower fees. More repeat visits.</h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-text-secondary">
              Themed to your brand and packaged around the revenue leaks you already feel. See it on your own salon.
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
