"use client";
/**
 * WalletPanel — load funds (real Stripe Checkout on the salon's connected
 * account) and pay from balance (internal debit, no fee). Balance reads from
 * the Wallet ledger via /api/wallet/balance.
 */
import { useCallback, useEffect, useState } from "react";

const inputClass =
  "w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-text-primary placeholder:text-text-muted";

export default function WalletPanel({ initialSalon = "", initialClient = "", loaded = false }: { initialSalon?: string; initialClient?: string; loaded?: boolean }) {
  const [salon, setSalon] = useState(initialSalon);
  const [client, setClient] = useState(initialClient);
  const [amount, setAmount] = useState("100");
  const [spendAmount, setSpendAmount] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(loaded ? "Payment received — balance updates within a few seconds (ACH may take a few days to clear)." : null);

  const refreshBalance = useCallback(async () => {
    if (!salon.trim() || !client.trim()) return;
    try {
      const res = await fetch(`/api/wallet/balance?salon=${encodeURIComponent(salon)}&client=${encodeURIComponent(client)}`);
      const json = await res.json().catch(() => ({}));
      if (res.ok) setBalance(json.balance);
    } catch {
      /* ignore */
    }
  }, [salon, client]);

  useEffect(() => {
    if (initialSalon && initialClient) refreshBalance();
  }, [initialSalon, initialClient, refreshBalance]);

  async function load() {
    setError(null);
    if (!salon.trim() || !client.trim()) {
      setError("Enter the salon and your name/email.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/wallet/load", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ salon, client, amount: Number(amount) }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.url) {
        setError(json.error || "Couldn't start checkout.");
        return;
      }
      window.location.href = json.url; // hosted Stripe Checkout
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function pay() {
    setError(null);
    setInfo(null);
    const amt = Number(spendAmount);
    if (!salon.trim() || !client.trim() || !amt) {
      setError("Enter salon, client, and an amount to pay.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/wallet/charge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ salon, client, amount: amt, note: "service" }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Couldn't charge the wallet.");
        if (typeof json.balance === "number") setBalance(json.balance);
        return;
      }
      setBalance(json.balance);
      setSpendAmount("");
      setInfo("Paid from wallet — no card fee.");
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className={inputClass} placeholder="Salon name" value={salon} onChange={(e) => setSalon(e.target.value)} aria-label="Salon" />
          <input className={inputClass} placeholder="Your name or email" value={client} onChange={(e) => setClient(e.target.value)} aria-label="Client" />
        </div>
        <button type="button" onClick={refreshBalance} className="text-[12px] uppercase tracking-[0.12em] text-text-secondary hover:text-text-primary">
          Check balance
        </button>
        {balance !== null && (
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-text-secondary">Wallet balance</span>
            <span className="font-serif text-3xl font-medium">${balance.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Load funds</p>
        <div className="flex flex-wrap items-center gap-2">
          {[100, 250, 500].map((v) => (
            <button key={v} type="button" onClick={() => setAmount(String(v))} className="rounded-full border border-border px-3 py-1.5 text-[12px] text-text-secondary hover:bg-black/[0.03]">
              ${v}
            </button>
          ))}
          <input className={`${inputClass} w-28`} type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} aria-label="Load amount" />
        </div>
        <button type="button" onClick={load} disabled={busy} className="rounded-sm bg-gradient-brand px-6 py-3 text-[12px] uppercase tracking-[0.14em] text-white disabled:opacity-50">
          {busy ? "…" : "Load by bank (ACH) or card"}
        </button>
        <p className="text-xs text-text-muted">ACH keeps fees low. Funds settle to the salon&apos;s own Stripe.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Pay for a service</p>
        <div className="flex flex-wrap items-center gap-2">
          <input className={`${inputClass} w-32`} type="number" placeholder="Amount" value={spendAmount} onChange={(e) => setSpendAmount(e.target.value)} aria-label="Pay amount" />
          <button type="button" onClick={pay} disabled={busy} className="rounded-sm border border-text-primary/30 px-6 py-3 text-[12px] uppercase tracking-[0.14em] text-text-primary hover:bg-black/[0.04] disabled:opacity-50">
            Pay from wallet
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}
      {info && <p className="text-sm text-success">{info}</p>}
    </div>
  );
}
