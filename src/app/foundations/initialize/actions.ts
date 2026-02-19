"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const VALID_KEYS = ["ATTUNE-BETA-2026"];

export async function validateAccessKey(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const key = formData.get("accessKey") as string;

  if (!key || !key.trim()) {
    return { error: "Please enter your access key." };
  }

  if (!VALID_KEYS.includes(key.trim().toUpperCase())) {
    return { error: "Invalid access key. Check your email and try again." };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "Authentication required." };
  }

  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: {
      accessKeyValidated: true,
      accessKeyDate: new Date().toISOString(),
    },
  });

  redirect("/foundations/onboarding");
}
