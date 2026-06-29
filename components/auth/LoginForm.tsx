"use client";
/** LoginForm — passwordless sign-in. Emails a magic link via /api/auth/request. */
import { useState } from "react";

const inputClass =
  "w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-text-primary placeholder:text-text-muted";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [salon, setSalon] = useState("");
  const [needsSalon, setNeedsSalon] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, salon }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.needsSalon) setNeedsSalon(true);
        setError(json.error || "Something went wrong.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-surface-elevated px-6 py-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success text-2xl">✓</div>
        <h3 className="font-serif text-xl font-medium">Check your email</h3>
        <p className="mt-2 text-sm text-text-secondary">We sent a sign-in link to {email}. It expires in 15 minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-surface p-6 space-y-3">
      <input className={inputClass} type="email" placeholder="you@yoursalon.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
      {needsSalon && (
        <input className={inputClass} placeholder="Salon / business name" value={salon} onChange={(e) => setSalon(e.target.value)} aria-label="Salon name" />
      )}
      {error && <p className="text-sm text-error">{error}</p>}
      <button type="submit" disabled={submitting} className="w-full rounded-sm bg-gradient-brand px-6 py-3.5 text-[12px] uppercase tracking-[0.14em] text-white disabled:opacity-50">
        {submitting ? "Sending…" : "Email me a sign-in link"}
      </button>
      <p className="text-xs text-text-muted text-center">No passwords. We email you a secure link.</p>
    </form>
  );
}
