"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function completeModule(slug: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const existing = (user.publicMetadata as Record<string, unknown>) || {};
  const foundations = (existing.foundations as Record<string, unknown>) || {};
  const completed = (foundations.completedModules as string[]) || [];

  if (completed.includes(slug)) return;

  await client.users.updateUser(userId, {
    publicMetadata: {
      ...existing,
      foundations: {
        ...foundations,
        completedModules: [...completed, slug],
      },
    },
  });

  revalidatePath("/foundations/modules");
  revalidatePath("/foundations/dashboard");
}
