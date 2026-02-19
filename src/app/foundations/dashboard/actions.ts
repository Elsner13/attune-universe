"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateFoundationsField(
  field: "domain" | "constraint" | "goal",
  value: string
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const existing = (user.publicMetadata as Record<string, unknown>) || {};
  const foundations = (existing.foundations as Record<string, string>) || {};

  await client.users.updateUser(userId, {
    publicMetadata: {
      ...existing,
      foundations: {
        ...foundations,
        [field]: value,
      },
    },
  });

  revalidatePath("/foundations/dashboard");
}
