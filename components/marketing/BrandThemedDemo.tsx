"use client";
/**
 * BrandThemedDemo — pulls a prospect's brand from /api/brandfetch and re-skins
 * a miniature version of Mark's JIDOKA owner dashboard with their name, logo,
 * and colors. This should feel like the real platform, not a separate mockup.
 */
import { useMemo, useState } from "react";

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
  name: "[Business Name]",
  domain: null,
  logoUrl: null,
  iconUrl: null,
  primaryColor: "#2F4A43",
  accentColor: "#1D9E75",
  fontFamily: null,
};

const SAMPLE_STORE_ITEMS = [
  {
    name: "Gloss Revival Mask",
    price: "$38",
    copy: "Recommended after color services.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Scalp Reset Serum",
    price: "$42",
    copy: "Attach to refresh appointments.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
  },
] as const;

const MODULES = [
  {
    key: "dashboard",
    label: "Dashboard",
    title: "Your salon command center.",
    eyebrow: "Owner dashboard",
    body: "The owner view Mark built: wallet, store, openings, reviews, assistant reports, and the next best action for the day.",
  },
  {
    key: "wallet",
    label: "Wallet",
    title: "Lower-fee checkout.",
    eyebrow: "Wallet checkout",
    body: "Client wallet loads, service checkout, and in-salon retail checkout settle to the salon's own Stripe account.",
  },
  {
    key: "store",
    label: "Online store",
    title: "Retail between visits.",
    eyebrow: "Retail",
    body: "Clients can buy the at-home products you recommend from a mobile-friendly storefront with sample products ready to explore.",
  },
  {
    key: "assistants",
    label: "Assistants",
    title: "Assistant workspace.",
    eyebrow: "Assistants",
    body: "Chat with each assistant, review reports, see the latest data, and skim one-page executive summaries without jumping between tools.",
  },
] as const;

type ModuleKey = (typeof MODULES)[number]["key"];

const ASSISTANTS = [
  {
    key: "financial",
    label: "Financial Assistant",
    metric: "$1,840 margin lift",
    status: "Payroll draft ready",
    report: "Retail attach rate rose to 31%. Move gloss add-ons into checkout prompts and review Alex's commission mix before Friday payroll.",
    messages: ["Can we afford a Tuesday promotion?", "Yes. Keep the offer service-only and cap it at 12 appointments to protect margin."],
  },
  {
    key: "inventory",
    label: "Inventory Assistant",
    metric: "4 low-stock items",
    status: "2 reorder drafts",
    report: "Lash adhesive and toner 7N are below threshold. Gloss trays are healthy for six weeks based on recent checkout movement.",
    messages: ["Which products need attention today?", "Lash adhesive first. It is below threshold and used faster than forecast this week."],
  },
  {
    key: "reviews",
    label: "Reviews Assistant",
    metric: "18 reviews imported",
    status: "1 manager alert",
    report: "Positive Google reviews have unique draft replies. One 2-star booking-site review is held with a professional response and manager notification.",
    messages: ["What needs owner attention?", "A 2-star review is ready for manager follow-up before any public reply is posted."],
  },
  {
    key: "intelligence",
    label: "Industry Intelligence",
    metric: "1-page brief",
    status: "June report ready",
    report: "Competitors are packaging maintenance gloss appointments with scalp care. Two nearby salons are pushing weekday color refresh offers.",
    messages: ["What should we try this month?", "Test a weekday gloss refresh bundle and measure rebooking within 14 days."],
  },
  {
    key: "receptionist",
    label: "Receptionist Assistant",
    metric: "23 requests handled",
    status: "3 bookings pending",
    report: "Missed-call follow-up recovered two consultations. Three booking requests need staff assignment approval.",
    messages: ["Any missed calls?", "Two missed calls were answered by text and one converted to a consultation request."],
  },
] as const;

type AssistantKey = (typeof ASSISTANTS)[number]["key"];
type ChatTurn = { assistantKey: AssistantKey; sender: "user" | "assistant"; text: string };

function initials(name: string): string {
  const parts = name.replace(/[\[\]]/g, "").trim().split(/\s+/).filter(Boolean);
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

function BrandLink({
  href,
  title,
  note,
  accent,
}: {
  href: string;
  title: string;
  note: string;
  accent: string;
}) {
  return (
    <a href={href} className="group bg-white p-5 transition-colors hover:bg-surface-elevated">
      <p className="font-serif text-lg font-medium">{title}</p>
      <p className="mt-1 text-sm text-text-secondary">{note}</p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.12em]" style={{ color: accent }}>
        Open sample
      </p>
    </a>
  );
}

function ModulePreview({
  moduleKey,
  accent,
  walletHref,
  storeHref,
  assistantKey,
  setAssistantKey,
  allowWalletTips,
  setAllowWalletTips,
}: {
  moduleKey: ModuleKey;
  accent: string;
  walletHref: string;
  storeHref: string;
  assistantKey: AssistantKey;
  setAssistantKey: (key: AssistantKey) => void;
  allowWalletTips: boolean;
  setAllowWalletTips: (value: boolean) => void;
}) {
  const activeAssistant = ASSISTANTS.find((assistant) => assistant.key === assistantKey) ?? ASSISTANTS[0];
  const [chatInput, setChatInput] = useState("");
  const [chatTurns, setChatTurns] = useState<ChatTurn[]>([]);
  const visibleTurns = [
    { assistantKey: activeAssistant.key, sender: "user" as const, text: activeAssistant.messages[0] },
    { assistantKey: activeAssistant.key, sender: "assistant" as const, text: activeAssistant.messages[1] },
    ...chatTurns.filter((turn) => turn.assistantKey === activeAssistant.key),
  ];

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setChatTurns((turns) => [
      ...turns,
      { assistantKey: activeAssistant.key, sender: "user", text },
      {
        assistantKey: activeAssistant.key,
        sender: "assistant",
        text: `${activeAssistant.label} received that. In the full platform, I would pull your live data, create the report, and give you the next action.`,
      },
    ]);
    setChatInput("");
  }

  if (moduleKey === "wallet") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.85fr_1fr]">
        <div className="border border-border bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Client wallet</p>
          <p className="mt-3 font-serif text-4xl font-medium">$300</p>
          <p className="mt-1 text-xs text-text-secondary">Sample available balance</p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full" style={{ width: "72%", backgroundColor: accent }} />
          </div>
          <a href={walletHref} className="mt-5 inline-block text-[11px] uppercase tracking-[0.12em]" style={{ color: accent }}>
            Open live wallet sample
          </a>
        </div>
        <div className="border border-border bg-white p-4">
          <Row left="Balayage checkout" right="$225.00" />
          <Row left="ACH wallet fee" right="$1.80" sub="Compared with the higher card-fee path." />
          <Row left="Retail add-on" right="$32.00" sub="At-home product attached at checkout." />
          <div className="mt-4 rounded-md border border-border bg-surface-elevated p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-primary">Allow wallet tips</p>
                <p className="mt-1 text-xs text-text-muted">Owner checkout rule for client wallet checkout.</p>
              </div>
              <button
                type="button"
                onClick={() => setAllowWalletTips(!allowWalletTips)}
                className="relative h-7 w-12 rounded-full transition-colors"
                style={{ backgroundColor: allowWalletTips ? accent : "var(--color-border)" }}
                aria-pressed={allowWalletTips}
                aria-label="Toggle wallet tips"
              >
                <span
                  className="absolute left-0 top-1 h-5 w-5 rounded-full bg-white transition-transform"
                  style={{ transform: allowWalletTips ? "translateX(24px)" : "translateX(4px)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (moduleKey === "store") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SAMPLE_STORE_ITEMS.map((item) => (
          <div key={item.name} className="border border-border bg-white p-4">
            <div
              className="mb-3 aspect-[4/3] w-full rounded-md border border-border bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
              aria-label={`${item.name} sample photo`}
              role="img"
            />
            <p className="font-serif text-lg font-medium">{item.name}</p>
            <p className="mt-1 text-sm text-text-secondary">{item.copy}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium">{item.price}</span>
              <a href={storeHref} className="text-[11px] uppercase tracking-[0.12em]" style={{ color: accent }}>
                Shop sample
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (moduleKey === "assistants") {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="border border-border bg-white p-3">
          <div className="grid grid-cols-1 gap-1">
            {ASSISTANTS.map((assistant) => {
              const selected = assistant.key === assistantKey;
              return (
                <button
                  key={assistant.key}
                  type="button"
                  onClick={() => setAssistantKey(assistant.key)}
                  className="border px-3 py-3 text-left text-xs transition-colors"
                  style={
                    selected
                      ? { borderColor: accent, color: accent, backgroundColor: "#fff" }
                      : { borderColor: "transparent", color: "var(--color-text-secondary)" }
                  }
                >
                  <span className="block font-medium">{assistant.label}</span>
                  <span className="mt-0.5 block text-text-muted">{assistant.status}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="min-w-0 border border-border bg-white p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Signal</p>
              <p className="mt-2 break-words font-serif text-2xl font-medium leading-tight">{activeAssistant.metric}</p>
            </div>
            <div className="min-w-0 border border-border bg-white p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">One-page exec</p>
              <p className="mt-2 break-words text-sm leading-relaxed text-text-secondary">{activeAssistant.report}</p>
            </div>
          </div>
          <div className="border border-border bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Chat</p>
            <div className="mt-3 max-h-[280px] space-y-2 overflow-y-auto pr-1">
              {visibleTurns.map((turn, index) => (
                <p
                  key={`${turn.sender}-${index}-${turn.text}`}
                  className={`max-w-[88%] break-words rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    turn.sender === "assistant" ? "ml-auto text-white" : "bg-surface-elevated text-text-primary"
                  }`}
                  style={turn.sender === "assistant" ? { backgroundColor: accent } : undefined}
                >
                  {turn.text}
                </p>
              ))}
            </div>
            <form onSubmit={sendMessage} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Message ${activeAssistant.label}`}
                aria-label={`Message ${activeAssistant.label}`}
                className="min-w-0 flex-1 rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-text-primary"
              />
              <button
                type="submit"
                className="rounded-md px-4 py-2.5 text-sm font-medium text-white"
                style={{ backgroundColor: accent }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
      <BrandLink href={walletHref} title="Client wallet" note="Open a sample wallet with balance data." accent={accent} />
      <BrandLink href={storeHref} title="Online store" note="Shop sample retail products from the live storefront." accent={accent} />
      <div className="bg-white p-5">
        <p className="font-serif text-lg font-medium">Opening fill</p>
        <p className="mt-1 text-sm text-text-secondary">Alert waitlisted clients when a slot opens.</p>
      </div>
      <div className="bg-white p-5">
        <p className="font-serif text-lg font-medium">Reviews Assistant</p>
        <p className="mt-1 text-sm text-text-secondary">Positive replies and manager alerts in one place.</p>
      </div>
    </div>
  );
}

export default function BrandThemedDemo() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [source, setSource] = useState<"brandfetch" | "fallback" | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moduleKey, setModuleKey] = useState<ModuleKey>("dashboard");
  const [assistantKey, setAssistantKey] = useState<AssistantKey>("financial");
  const [allowWalletTips, setAllowWalletTips] = useState(true);

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
  const activeModule = MODULES.find((module) => module.key === moduleKey) ?? MODULES[0];
  const demoSalon = useMemo(() => encodeURIComponent(brand.name || "[Business Name]"), [brand.name]);
  const walletHref = `/wallet?demo=1&salon=${demoSalon}&client=Demo%20Customer%2FPatient`;
  const storeHref = `/store?demo=1&salon=${demoSalon}`;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <form onSubmit={applyBrand} className="mb-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="[Enter Your Website Here]"
          aria-label="Your website or Instagram"
          className="flex-1 rounded-md border border-border bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-text-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: accent }}
        >
          {loading ? "Reading your brand..." : "Theme my demo"}
        </button>
      </form>

      {error && <p className="mb-3 text-xs text-error">{error}</p>}
      {note && !error && <p className="mb-3 text-xs text-text-secondary">{note}</p>}
      {source === "brandfetch" && !note && (
        <p className="mb-3 text-xs text-text-secondary">Pulled live from Brandfetch.</p>
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
            <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">Owner dashboard</p>
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
            {moduleKey !== "assistants" && (
              <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">{activeModule.eyebrow}</p>
            )}
            <div className={moduleKey === "assistants" ? "mt-0" : "mt-3 grid grid-cols-1 gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start"}>
              {moduleKey !== "assistants" && (
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
              )}
              <ModulePreview
                moduleKey={moduleKey}
                accent={accent || primary}
                walletHref={walletHref}
                storeHref={storeHref}
                assistantKey={assistantKey}
                setAssistantKey={setAssistantKey}
                allowWalletTips={allowWalletTips}
                setAllowWalletTips={setAllowWalletTips}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
