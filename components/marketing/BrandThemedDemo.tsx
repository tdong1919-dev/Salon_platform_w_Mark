"use client";
/**
 * BrandThemedDemo — pulls a prospect's brand from /api/brandfetch and re-skins a
 * live product tour with their name, logo, and colors. A feature switcher lets
 * the visitor walk through every module (booking, wallet/POS, rewards, marketing,
 * voice AI, inventory) — not just the wallet — themed to their brand.
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

const FEATURES = [
  { key: "booking", label: "Booking" },
  { key: "wallet", label: "Wallet & POS" },
  { key: "rewards", label: "Rewards" },
  { key: "marketing", label: "Marketing" },
  { key: "voice", label: "Voice AI" },
  { key: "inventory", label: "Inventory" },
] as const;

type FeatureKey = (typeof FEATURES)[number]["key"];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "•";
}

function Row({ left, right, sub }: { left: string; right?: string; sub?: string }) {
  return (
    <div className="border-b border-border py-2.5 last:border-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] text-text-primary">{left}</span>
        {right && <span className="text-[13px] text-text-secondary">{right}</span>}
      </div>
      {sub && <p className="mt-1 text-[11px] text-text-muted">{sub}</p>}
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
  const [feature, setFeature] = useState<FeatureKey>("booking");

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
  const tint = `${accent}14`;

  const accentBtn = "mt-3 w-full rounded-md py-2.5 text-sm font-medium text-white";

  return (
    <div className="w-full max-w-3xl mx-auto">
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

      <div className="rounded-xl border border-border bg-surface-elevated p-4 sm:p-5">
        <div
          className="mx-auto w-full max-w-[680px] overflow-hidden rounded-xl border border-border bg-white"
          style={brand.fontFamily ? { fontFamily: `${brand.fontFamily}, var(--font-sans, sans-serif)` } : undefined}
        >
          {/* Brand header */}
          <div className="px-5 py-4 text-white" style={{ backgroundColor: primary }}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/25 text-sm font-semibold">
                {brand.iconUrl || brand.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={brand.iconUrl || brand.logoUrl || ""} alt={`${brand.name} logo`} className="h-full w-full object-contain" />
                ) : (
                  initials(brand.name)
                )}
              </div>
              <div>
                <p className="m-0 text-[15px] font-semibold leading-tight">{brand.name}</p>
                <p className="m-0 text-[11px] opacity-85">All-in-one salon platform</p>
              </div>
            </div>
          </div>

          {/* Feature switcher */}
          <div className="flex gap-1 overflow-x-auto border-b border-border px-2 py-2">
            {FEATURES.map((f) => {
              const active = f.key === feature;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFeature(f.key)}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors"
                  style={active ? { backgroundColor: accent, color: "#fff" } : { color: "var(--color-text-secondary)" }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Feature panel */}
          <div className="px-5 py-4">
            {feature === "booking" && (
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">Thursday · pick a time</p>
                <div className="mb-3 flex flex-wrap gap-2">
                  {["10:00", "11:30", "2:30", "4:00"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md border px-3 py-1.5 text-[12px]"
                      style={t === "2:30" ? { backgroundColor: accent, color: "#fff", borderColor: accent } : { borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Row left="Balayage with Alex" right="$225 · 2h" sub="Deposit held on the client's wallet" />
                <Row left="Glossing add-on" right="+$45" sub="Suggested cross-sell" />
                <button className={accentBtn} style={{ backgroundColor: accent }}>Confirm 2:30 PM booking</button>
              </div>
            )}

            {feature === "wallet" && (
              <div>
                <div className="mb-3 flex items-center justify-between rounded-md px-3 py-2" style={{ backgroundColor: tint }}>
                  <span className="text-xs text-text-secondary">Wallet balance</span>
                  <span className="text-sm font-semibold" style={{ color: accent }}>$300.00</span>
                </div>
                <Row left="Balayage checkout" right="$225.00" />
                <Row left="ACH wallet fee" right="$1.80" sub="vs. $6.83 on a card — kept in your pocket" />
                <Row left="Load $500, get $50 bonus" right="Promo" sub="Refill wallet, lock in the next visits" />
                <button className={accentBtn} style={{ backgroundColor: accent }}>Pay $225 from wallet</button>
              </div>
            )}

            {feature === "rewards" && (
              <div>
                <div className="mb-3 flex items-center justify-between rounded-md px-3 py-2" style={{ backgroundColor: tint }}>
                  <span className="text-xs text-text-secondary">Gold member · 420 pts</span>
                  <span className="text-[11px] text-text-muted">80 pts to free add-on</span>
                </div>
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full" style={{ width: "84%", backgroundColor: accent }} />
                </div>
                <Row left="Free brow tint" right="500 pts" sub="Almost there — nudge sent automatically" />
                <Row left="Birthday gloss" right="Unlocked" sub="Auto-applied next visit" />
                <button className={accentBtn} style={{ backgroundColor: accent }}>Redeem reward</button>
              </div>
            )}

            {feature === "marketing" && (
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">Social queue · 3 ready</p>
                <Row left="Tue 6pm — Fall gloss launch" right="Instagram" sub="AI caption + on-brand image drafted" />
                <Row left="Fri — “2 openings Saturday”" right="IG + FB" sub="Auto-fills last-minute gaps" />
                <Row left="Sun — Retail restock" right="Stories" sub="Tied to inventory levels" />
                <button className={accentBtn} style={{ backgroundColor: accent }}>Schedule all posts</button>
              </div>
            )}

            {feature === "voice" && (
              <div>
                <div className="mb-3 flex items-center justify-between rounded-md px-3 py-2" style={{ backgroundColor: tint }}>
                  <span className="text-xs text-text-secondary">AI receptionist · this week</span>
                  <span className="text-sm font-semibold" style={{ color: accent }}>12 calls · 4 booked</span>
                </div>
                <Row left="Missed call → booked" right="2:30 Thu" sub="“I'd like a fill Thursday” → booked with Alex" />
                <Row left="After-hours question" right="Answered" sub="Hours, pricing, and parking handled" />
                <Row left="Waitlist offer" right="Filled" sub="Called the next client when a slot opened" />
                <button className={accentBtn} style={{ backgroundColor: accent }}>Listen to call summary</button>
              </div>
            )}

            {feature === "inventory" && (
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">Stock · tracked through POS</p>
                <Row left="Lash adhesive" right="3 left" sub="Below threshold — flagged" />
                <Row left="Toner 7N" right="Reorder" sub="Used faster than forecast" />
                <Row left="Gloss trays" right="OK" sub="6 weeks of cover" />
                <button className={accentBtn} style={{ backgroundColor: accent }}>Approve reorder draft</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
