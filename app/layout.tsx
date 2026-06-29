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
  title: "JIDOKA Cosmetics OS — An agent for every salon bottleneck",
  description:
    "The operating system for modern cosmetics businesses: a Stripe wallet that cuts merchant fees, plus intelligent agents for inventory, payroll, marketing, reviews, retention, and more — in one customizable platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full`}>
      <body className="min-h-full bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
