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
    body: "Fresha, Vagaro, a marketing app, a phone service — paying monthly for each.",
  },
];

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`max-w-3xl mx-auto px-5 ${className}`}>{children}</section>;
}

export default function SalonLandingPage() {
  return (
    <main className="py-16 sm:py-24">
      <Section className="text-center">
        <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-surface-elevated border border-border text-text-secondary">
          Booking + payments + AI front desk, in one
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mt-5 mb-4">
          Stop handing 3% of every<br />appointment to Visa.
        </h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto mb-8">
          Your salon&apos;s booking, payments, marketing, and phone line on one platform — with ACH
          client wallets that cut card fees up to 70%, and an AI receptionist that never misses a call.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <DemoCTA label="Book a free demo" variant="primary" />
          <a href="#calculator" className="border border-border text-text-primary px-6 py-3 rounded-xl hover:bg-white/5">
            Calculate my savings
          </a>
        </div>
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
        <div className="rounded-2xl bg-surface-elevated border border-border text-center px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            One platform. Lower fees. A front desk that never sleeps.
          </h2>
          <p className="text-text-secondary mb-7 max-w-lg mx-auto">
            Built on your booking site, themed to your brand, live in days.
          </p>
          <DemoCTA label="Book a free demo" variant="primary" className="px-7" />
        </div>
      </Section>
    </main>
  );
}
