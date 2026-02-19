import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getModuleBySlug, getNextModule } from "@/data/modules";
import { ModuleClient } from "./ModuleClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) return { title: "Module Not Found" };
  return { title: `${mod.id}: ${mod.title}` };
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const next = getNextModule(slug);

  const { userId } = await auth();
  let completedModules: string[] = [];

  if (userId) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const meta = user.publicMetadata as {
      foundations?: { completedModules?: string[] };
    };
    completedModules = meta.foundations?.completedModules || [];
  }

  const isCompleted = completedModules.includes(mod.slug);

  return (
    <ModuleClient
      mod={mod}
      nextSlug={next?.slug || null}
      nextTitle={next?.title || null}
      isCompleted={isCompleted}
    />
  );
}
