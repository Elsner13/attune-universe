import type { Metadata } from "next";
import { FoundationsClient } from "./FoundationsClient";

export const metadata: Metadata = {
  title: "Foundations — The Ecological Framework",
};

export default function FoundationsPage() {
  return <FoundationsClient />;
}
