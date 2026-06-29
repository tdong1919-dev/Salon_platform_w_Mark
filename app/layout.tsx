import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Salon Platform — Booking, lower card fees, AI front desk",
  description:
    "One platform for salons, spas, and medspas: online booking, ACH client wallets that cut card fees up to 70%, an AI receptionist that never misses a call, and marketing on autopilot.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full`}>
      <body className="min-h-full bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
