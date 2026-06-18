import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salon Platform — Booking, lower card fees, AI front desk",
  description:
    "One platform for salons, spas, and medspas: online booking, ACH client wallets that cut card fees up to 70%, an AI receptionist that never misses a call, and marketing on autopilot.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full bg-charcoal text-white antialiased">{children}</body>
    </html>
  );
}
