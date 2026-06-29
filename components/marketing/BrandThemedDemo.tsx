"use client";
/**
 * BrandThemedDemo — landing-page widget that pulls a prospect's brand from
 * /api/brandfetch (Brandfetch + deterministic fallback) and re-skins a live
 * booking mockup with their name, logo, and colors. The whole point is the
 * "see your own salon themed before you pay" demo moment.
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

type BrandResponse = {
  ok: true;
  source: "brandfetch" | "fallback";
  brand: Brand;
  note?: string;
};

const DEFAULT_BRAND: Brand = {
  name: "Precision Lash",
  domain: "precisionlash.com",
  logoUrl: null,
  iconUrl: null,
  primaryColor: "#0F6E56",
  accentColor: "#1D9E75",
  fontFamily: null,
};

const SERVICES = [
  { name: "Classic full set", price: "$120", tag: "Wallet eligible" },
  { name: "Hybrid fill", price: "$75", tag: "8-week rebook" },
  { name: "Lash lift & tint", price: "$95", tag: "Cross-sell brow tint" },
];

const OPS = [
  { label: "Rewards", value: "420 pts", detail: "Next visit credit ready" },
  { label: "Social", value: "2 posts queued", detail: "Last-minute fill openings" },
  { label: "Stock", value: "Adhesive low", detail: "Reorder draft pending" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "•";
}

export default function BrandThemedDemo() {
  const [query, setQuery] = useState("precisionlash.com");
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [source, setSource] = useState<"brandfetch" | "fallback" | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={applyBrand} className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="yourwebsite.com or @instagram"
          aria-label="Your website or Instagram"
          className="flex-1 rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
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

      <div className="rounded-2xl bg-surface p-5 flex justify-center">
        <div
          className="w-full max-w-[680px] rounded-2xl border border-border overflow-hidden bg-surface-elevated"
          style={brand.fontFamily ? { fontFamily: `${brand.fontFamily}, var(--font-sans, sans-serif)` } : undefined}
        >
          <div className="px-5 py-4 text-white" style={{ backgroundColor: primary }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/25 flex items-center justify-center overflow-hidden text-sm font-semibold">
                {brand.iconUrl || brand.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.iconUrl || brand.logoUrl || ""}
                    alt={`${brand.name} logo`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  initials(brand.name)
                )}
              </div>
              <div>
                <p className="m-0 text-[15px] font-semibold leading-tight">{brand.name}</p>
                <p className="m-0 text-[11px] opacity-85">Book your appointment</p>
              </div>
              </div>
              <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium">
                Branded client wallet live
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 px-5 py-4 md:grid-cols-[1fr_0.85fr]">
            <div>
              {SERVICES.map((s, i) => (
                <div
                  key={s.name}
                  className={`py-2.5 ${i < SERVICES.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] text-text-primary">{s.name}</span>
                    <span className="text-[13px] text-text-secondary">{s.price}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-text-muted">{s.tag}</p>
                </div>
              ))}

              <div
                className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ backgroundColor: `${accent}1f` }}
              >
                <span className="text-[18px]" style={{ color: accent }} aria-hidden="true">
                  ◍
                </span>
                <span className="text-xs text-text-secondary">
                  Wallet balance{" "}
                  <span className="font-semibold" style={{ color: accent }}>
                    $300.00
                  </span>
                </span>
              </div>

              <button
                className="mt-3 w-full rounded-lg py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                Book & pay from wallet
              </button>
            </div>

            <div className="rounded-xl border border-border bg-[#0f0f0f] p-3">
              <p className="text-[11px] uppercase tracking-wide text-text-muted">Owner ops</p>
              <div className="mt-3 space-y-2">
                {OPS.map((item) => (
                  <div key={item.label} className="rounded-lg bg-surface-elevated p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-text-secondary">{item.label}</span>
                      <span className="text-[12px] font-semibold text-text-primary">{item.value}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-text-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
