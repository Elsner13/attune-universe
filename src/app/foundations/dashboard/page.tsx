import type { Metadata } from "next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "War Room",
};

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const meta = user.publicMetadata as {
    onboardingComplete?: boolean;
    foundations?: {
      domain?: string;
      constraint?: string;
      goal?: string;
      completedModules?: string[];
    };
  };

  if (!meta.onboardingComplete) {
    redirect("/foundations/onboarding");
  }

  return (
    <DashboardClient
      firstName={user.firstName || "Operator"}
      domain={meta.foundations?.domain || ""}
      constraint={meta.foundations?.constraint || ""}
      goal={meta.foundations?.goal || ""}
      completedModules={meta.foundations?.completedModules || []}
    />
  );
}
