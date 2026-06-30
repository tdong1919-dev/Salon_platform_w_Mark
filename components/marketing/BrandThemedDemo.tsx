"use client";
/**
 * BrandThemedDemo — pulls a prospect's brand from /api/brandfetch and re-skins a
 * miniature version of Mark's JIDOKA owner dashboard with their name, logo, and
 * colors. This should feel like the real platform, not a separate phone mockup.
 */
import { useState } from "react";

type Brand = {
  name: string;
  domain: string | null;
  logoUrl: string | null;
  iconUrl: string | null;
  primaryColor: string;
  accentColor: string;
  fontFamily: string | null;
};

type BrandResponse = { ok: true; source: "brandfetch" | "fallback"; brand: Brand; note?: string };

const DEFAULT_BRAND: Brand = {
  name: "Precision Lash",
  domain: "precisionlash.com",
  logoUrl: null,
  iconUrl: null,
  primaryColor: "#2F4A43",
  accentColor: "#1D9E75",
  fontFamily: null,
};

const MODULES = [
  {
    key: "dashboard",
    label: "Dashboard",
    title: "Your salon command center.",
    eyebrow: "Owner dashboard",
    body: "Everything Mark built for the owner: wallet, store, financials, inventory, retention, reviews, promos, and opening fills.",
  },
  {
    key: "wallet",
    label: "Wallet & POS",
    title: "Lower-fee checkout.",
    eyebrow: "Payments",
    body: "Client wallet loads, service payments, and in-salon retail checkout settle to the salon's own Stripe account.",
  },
  {
    key: "inventory",
    label: "Inventory",
    title: "Never run out mid-service.",
    eyebrow: "Agent · Inventory",
    body: "Staff flag low stock, the agent drafts reorder recommendations, and items are categorized for cleaner books.",
  },
  {
    key: "growth",
    label: "Growth",
    title: "Keep clients coming back.",
    eyebrow: "Retention",
    body: "Rewards, re-engagement, waitlist alerts, and opening fills turn lapsed demand into booked appointments.",
  },
  {
    key: "reviews",
    label: "Reviews",
    title: "Centralize reputation.",
    eyebrow: "Reviews hub",
    body: "Capture reviews from the website, Google, and old booking tools, then surface what needs owner attention.",
  },
] as const;

type ModuleKey = (typeof MODULES)[number]["key"];

const DASHBOARD_LINKS = [
  { label: "Client wallet", note: "Loads & balances" },
  { label: "Online store", note: "Retail checkout" },
  { label: "Financial agent", note: "Payroll & commissions" },
  { label: "Inventory agent", note: "Low stock & reorder" },
  { label: "Fill openings", note: "Alert the waitlist" },
  { label: "Rewards & promos", note: "Build & schedule" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "•";
}

function LogoMark({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-elevated text-sm font-medium">
      {brand.iconUrl || brand.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={brand.iconUrl || brand.logoUrl || ""} alt={`${brand.name} logo`} className="h-full w-full object-contain" />
      ) : (
        initials(brand.name)
      )}
    </div>
  );
}

function Row({ left, right, sub }: { left: string; right?: string; sub?: string }) {
  return (
    <div className="border-b border-border py-3 last:border-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-text-primary">{left}</span>
        {right && <span className="text-sm text-text-secondary">{right}</span>}
      </div>
      {sub && <p className="mt-1 text-xs leading-relaxed text-text-muted">{sub}</p>}
    </div>
  );
}

function ModulePreview({ moduleKey, accent }: { moduleKey: ModuleKey; accent: string }) {
  if (moduleKey === "wallet") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.85fr_1fr]">
        <div className="border border-border bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Client wallet</p>
          <p className="mt-3 font-serif text-4xl font-medium">$300</p>
          <p className="mt-1 text-xs text-text-secondary">Available balance</p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full" style={{ width: "72%", backgroundColor: accent }} />
          </div>
        </div>
        <div className="border border-border bg-white p-4">
          <Row left="Balayage checkout" right="$225.00" />
          <Row left="ACH wallet fee" right="$1.80" sub="Compared with the higher card-fee path." />
          <Row left="Retail add-on" right="$32.00" sub="At-home product attached at checkout." />
        </div>
      </div>
    );
  }

  if (moduleKey === "inventory") {
    return (
      <div className="border border-border bg-white p-4">
        <Row left="Lash adhesive" right="3 left" sub="Below threshold. Reorder draft ready for approval." />
        <Row left="Toner 7N" right="Reorder" sub="Used faster than forecast this week." />
        <Row left="Gloss trays" right="6 weeks" sub="Healthy cover based on recent POS movement." />
      </div>
    );
  }

  if (moduleKey === "growth") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border border-border bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Openings</p>
          <p className="mt-3 font-serif text-2xl font-medium">2:30 PM color slot</p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">Alerted 18 waitlist clients. 4 replies pending.</p>
        </div>
        <div className="border border-border bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Rewards</p>
          <p className="mt-3 font-serif text-2xl font-medium">Birthday gloss</p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">Scheduled for clients with birthdays this month.</p>
        </div>
      </div>
    );
  }

  if (moduleKey === "reviews") {
    return (
      <div className="border border-border bg-white p-4">
        <Row left="Google review" right="5.0" sub="Best balayage I have ever had. The wallet checkout was so easy." />
        <Row left="Website review" right="4.8" sub="Clean, calm, beautiful appointment experience." />
        <Row left="Needs owner review" right="1" sub="Negative feedback routed before a public reply goes out." />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {DASHBOARD_LINKS.map((link) => (
        <div key={link.label} className="bg-white p-5">
          <p className="font-serif text-lg font-medium">{link.label}</p>
          <p className="mt-1 text-sm text-text-secondary">{link.note}</p>
        </div>
      ))}
    </div>
  );
}

export default function BrandThemedDemo() {
  const [query, setQuery] = useState("precisionlash.com");
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [source, setSource] = useState<"brandfetch" | "fallback" | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moduleKey, setModuleKey] = useState<ModuleKey>("dashboard");

  async function applyBrand(e?: React.FormEvent) {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/brandfetch?q=${encodeURIComponent(q)}`);
      const json = (await res.json()) as BrandResponse | { error: string };
      if (!("ok" in json)) {
        setError(json.error || "Could not read that brand.");
        return;
      }
      setBrand(json.brand);
      setSource(json.source);
      setNote(json.note ?? null);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const primary = brand.primaryColor;
  const accent = brand.accentColor;
  const activeModule = MODULES.find((m) => m.key === moduleKey) ?? MODULES[0];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <form onSubmit={applyBrand} className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="yourwebsite.com or @instagram"
          aria-label="Your website or Instagram"
          className="flex-1 rounded-md border border-border bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-text-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: accent }}
        >
          {loading ? "Reading your brand…" : "Theme my demo"}
        </button>
      </form>

      {error && <p className="text-xs text-error mb-3">{error}</p>}
      {note && !error && <p className="text-xs text-text-secondary mb-3">{note}</p>}
      {source === "brandfetch" && !note && (
        <p className="text-xs text-text-secondary mb-3">Pulled live from Brandfetch.</p>
      )}

      <div
        className="overflow-hidden rounded-lg border border-border bg-white shadow-sm"
        style={brand.fontFamily ? { fontFamily: `${brand.fontFamily}, var(--font-sans, sans-serif)` } : undefined}
      >
        <div className="border-b border-border">
          <div className="flex min-h-16 flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <LogoMark brand={brand} />
              <div>
                <p className="font-serif text-xl font-medium tracking-wide">{brand.name}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Powered by JIDOKA Cosmetics OS</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="border border-border px-3 py-1.5 text-xs text-text-secondary">Owner dashboard</span>
              <span className="px-3 py-1.5 text-xs text-white" style={{ backgroundColor: primary }}>Live brand skin</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
          <div className="border-b border-border bg-surface-elevated p-3 lg:border-b-0 lg:border-r">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-5 lg:grid-cols-1">
              {MODULES.map((module) => {
                const active = module.key === moduleKey;
                return (
                  <button
                    key={module.key}
                    type="button"
                    onClick={() => setModuleKey(module.key)}
                    className="border px-3 py-2 text-left text-xs transition-colors"
                    style={
                      active
                        ? { borderColor: accent, color: accent, backgroundColor: "#fff" }
                        : { borderColor: "transparent", color: "var(--color-text-secondary)" }
                    }
                  >
                    {module.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">{activeModule.eyebrow}</p>
            <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
              <div>
                <h3 className="font-serif text-4xl font-medium tracking-tight">{activeModule.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">{activeModule.body}</p>
                <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-border bg-border">
                  {[
                    ["Booked", "87%"],
                    ["Wallet saved", "$412"],
                    ["Alerts", "4"],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-surface-elevated p-3 text-center">
                      <p className="text-[11px] text-text-muted">{label}</p>
                      <p className="mt-1 font-serif text-xl font-medium" style={label === "Wallet saved" ? { color: accent } : undefined}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <ModulePreview moduleKey={moduleKey} accent={accent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
