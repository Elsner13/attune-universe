import type { Metadata } from "next";
import { OSClient } from "./OSClient";

export const metadata: Metadata = {
  title: "Attune OS — Your Second Brain for Ecological Mastery",
  description:
    "An AI-powered intelligence system for ecological skill acquisition. Adaptive constraint design, real-time affordance mapping, and neural feedback loops. Join the early access waitlist.",
  openGraph: {
    title: "Attune OS — Your Second Brain for Ecological Mastery",
    description:
      "AI-powered ecological skill acquisition system. Adaptive constraint design, affordance mapping, neural feedback loops. Join the waitlist.",
    type: "website",
  },
};

export default function AttuneOSPage() {
  return <OSClient />;
}
