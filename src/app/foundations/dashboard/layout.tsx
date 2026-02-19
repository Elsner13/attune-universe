import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CommandCenter } from "@/components/CommandCenter";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#030303]">
      <CommandCenter />
      <div className="pl-56">{children}</div>
    </div>
  );
}
