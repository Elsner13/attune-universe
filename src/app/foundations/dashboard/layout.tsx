import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CommandCenter } from "@/components/CommandCenter";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const meta = user.publicMetadata as {
    foundations?: { domain?: string };
  };

  const domain = meta.foundations?.domain || "";

  return (
    <div className="min-h-screen bg-[#030303]">
      <CommandCenter domain={domain} />
      <div className="pl-56">{children}</div>
    </div>
  );
}
