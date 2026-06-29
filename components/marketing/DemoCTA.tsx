"use client";
/**
 * DemoCTA — a "Book a free demo" button that opens a lead-capture modal and
 * POSTs to /api/demo-request. Used in the hero and footer of the /salons page.
 * Each instance manages its own modal + form state; success is shown inline.
 */
import { useState } from "react";
import Modal from "@/components/ui/Modal";

type Props = {
  label?: string;
  variant?: "primary" | "outline";
  className?: string;
};

const inputClass =
  "w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-text-primary outline-none focus:border-[#7b3ff2] placeholder:text-text-muted";

const priorities = [
  "Credit card transaction fees",
  "Client retention and cross-sell",
  "Social media scheduling",
  "Rewards or memberships",
  "Inventory tracking and reorder",
];

export default function DemoCTA({ label = "Book a free demo", variant = "primary", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    salonName: "",
    phone: "",
    website: "",
    priority: priorities[0],
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please add your name and email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function close() {
    setOpen(false);
    // Reset after the modal animates out so the form is fresh next time.
    setTimeout(() => {
      setDone(false);
      setError(null);
      setForm({
        name: "",
        email: "",
        salonName: "",
        phone: "",
        website: "",
        priority: priorities[0],
        message: "",
      });
    }, 200);
  }

  const btnClass =
    variant === "primary"
      ? "bg-gradient-brand text-white font-semibold"
      : "border border-border text-text-primary hover:bg-white/5";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`px-6 py-3 rounded-xl ${btnClass} ${className}`}>
        {label}
      </button>

      <Modal isOpen={open} onClose={close} title={done ? undefined : "Book your free demo"} size="md">
        {done ? (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success text-2xl">
              ✓
            </div>
            <h3 className="text-lg font-semibold mb-1">You&apos;re on the list</h3>
            <p className="text-sm text-text-secondary mb-6">
              We&apos;ll reach out within one business day to set up your demo.
            </p>
            <button onClick={close} className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-white/5">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <p className="text-sm text-text-secondary -mt-1 mb-1">
              Tell us a little about your salon and we&apos;ll show you the platform themed to your brand.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className={inputClass} placeholder="Your name *" value={form.name} onChange={set("name")} aria-label="Your name" />
              <input className={inputClass} type="email" placeholder="Email *" value={form.email} onChange={set("email")} aria-label="Email" />
              <input className={inputClass} placeholder="Salon / business name" value={form.salonName} onChange={set("salonName")} aria-label="Salon or business name" />
              <input className={inputClass} placeholder="Phone" value={form.phone} onChange={set("phone")} aria-label="Phone" />
            </div>
            <input className={inputClass} placeholder="Website or @instagram" value={form.website} onChange={set("website")} aria-label="Website or Instagram" />
            <select className={inputClass} value={form.priority} onChange={set("priority")} aria-label="Biggest bottleneck">
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <textarea className={`${inputClass} min-h-[80px] resize-y`} placeholder="Anything we should know? (optional)" value={form.message} onChange={set("message")} aria-label="Notes" />
            {error && <p className="text-sm text-error">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-brand text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Request my demo"}
            </button>
            <p className="text-xs text-text-muted text-center">No card required. We&apos;ll never share your details.</p>
          </form>
        )}
      </Modal>
    </>
  );
}
