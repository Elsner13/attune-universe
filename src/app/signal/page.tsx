import type { Metadata } from "next";
import { SignalClient } from "./SignalClient";

export const metadata: Metadata = {
  title: "The Signal — Weekly Intelligence on Ecological Mastery",
  description:
    "Free weekly newsletter. Filtering conventional wisdom to find what actually works in learning and skill acquisition. 538+ coaches, athletes, and learners already tuned in.",
  openGraph: {
    title: "The Signal — Weekly Intelligence on Ecological Mastery",
    description:
      "Free weekly newsletter on ecological dynamics and skill acquisition. 538+ subscribers. Pure signal, no noise.",
    type: "website",
  },
};

export default function SignalPage() {
  return <SignalClient />;
}
