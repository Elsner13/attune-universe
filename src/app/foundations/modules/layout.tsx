import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BattlePlan } from "@/components/BattlePlan";

export default async function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const meta = user.publicMetadata as {
    foundations?: { completedModules?: string[] };
  };

  const completedModules = meta.foundations?.completedModules || [];

  return (
    <div className="min-h-screen bg-black">
      <BattlePlan completedModules={completedModules} />
      <div className="pl-60">{children}</div>
    </div>
  );
}
