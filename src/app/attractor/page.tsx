import type { Metadata } from "next";
import { AttractorClient } from "./AttractorClient";

export const metadata: Metadata = {
  title: "The Attractor — 30-Day Ecological Mastery Cohort",
  description:
    "30 days. One AI companion. One cohort. Achieve escape velocity in your domain. The Attractor is a structured immersion for coaches, athletes, and high performers who want to make ecological mastery their default state.",
  openGraph: {
    title: "The Attractor — 30-Day Ecological Mastery Cohort",
    description:
      "30 days. One AI companion. One cohort. Achieve escape velocity in your domain.",
    type: "website",
  },
};

export default function AttractorPage() {
  return <AttractorClient />;
}
