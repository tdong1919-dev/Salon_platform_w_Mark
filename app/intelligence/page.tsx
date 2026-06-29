import type { Metadata } from "next";
import PageShell from "@/components/marketing/PageShell";
import IntelligenceReport from "@/components/agents/IntelligenceReport";

export const metadata: Metadata = {
  title: "Industry intelligence — JIDOKA Cosmetics OS",
  description: "A monthly, executive one-page briefing on what's trending and what competitors are doing in your niche.",
};

export default function IntelligencePage() {
  return (
    <PageShell
      eyebrow="Agent · Intelligence"
      title="Know what's next in your niche."
      intro="A monthly, executive one-pager on what's trending and what comparable businesses are doing — focused on your exact services and market, so you can move first instead of catching up."
      note="The agent searches the live web; treat figures as directional. Connect ANTHROPIC_API_KEY to enable it."
    >
      <IntelligenceReport />
    </PageShell>
  );
}
