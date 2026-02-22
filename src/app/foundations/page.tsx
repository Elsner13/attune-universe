import type { Metadata } from "next";
import { FoundationsClient } from "./FoundationsClient";

export const metadata: Metadata = {
  title: "Attune Foundations — The Ecological Skill Acquisition Framework",
  description:
    "6 deep-dive modules on ecological psychology and skill acquisition. Learn direct perception, affordances, constraints-led approach, and self-organization. One-time $97. Lifetime access.",
  openGraph: {
    title: "Attune Foundations — The Ecological Skill Acquisition Framework",
    description:
      "6 modules. One framework. Lifetime access. Master the science of how skill actually develops — not how you were taught it should.",
    type: "website",
  },
};

export default function FoundationsPage() {
  return <FoundationsClient />;
}
