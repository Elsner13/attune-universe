import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function InitializePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-up");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const meta = user.publicMetadata as {
    onboardingComplete?: boolean;
  };

  if (meta.onboardingComplete) {
    redirect("/foundations/dashboard");
  }

  redirect("/foundations/onboarding");
}
