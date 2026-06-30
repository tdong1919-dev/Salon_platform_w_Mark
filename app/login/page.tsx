import type { Metadata } from "next";
import PageShell from "@/components/marketing/PageShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — JIDOKA Cosmetics OS",
  description: "Passwordless sign-in for salon owners.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const expired = sp.error === "expired";
  return (
    <PageShell
      eyebrow="Account"
      title="Sign in to your salon."
      intro="Run your assistants, payments, and store from one place. We use a passwordless link — enter your email and we'll send you a secure sign-in link."
      note="First time? Add your salon name when prompted and we'll create your account."
    >
      {expired && <p className="mb-5 rounded-md border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">That link expired — request a fresh one below.</p>}
      <LoginForm />
    </PageShell>
  );
}
