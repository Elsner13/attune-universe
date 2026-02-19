"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function saveOnboardingData(data: {
  domain: string;
  bottleneck: string;
  hoursPerWeek: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const existing = (user.publicMetadata as Record<string, unknown>) || {};

  await client.users.updateUser(userId, {
    publicMetadata: {
      ...existing,
      onboardingComplete: true,
      onboardingDate: new Date().toISOString(),
      foundations: {
        domain: data.domain,
        bottleneck: data.bottleneck,
        hoursPerWeek: data.hoursPerWeek,
      },
    },
  });

  redirect("/foundations/dashboard");
}
