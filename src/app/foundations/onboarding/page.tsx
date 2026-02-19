import type { Metadata } from "next";
import { OnboardingClient } from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Initialize Protocol",
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}
