import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Flame, Crosshair, Lock, Clock } from "lucide-react";

const DOMAIN_LABELS: Record<string, string> = {
  coding: "Coding & Engineering",
  sport: "Sport & Performance",
  business: "Business & Strategy",
  creative: "Creative & Art",
  science: "Science & Research",
  other: "Unique Domain",
};

const BOTTLENECK_LABELS: Record<string, string> = {
  focus: "Focus & Attention",
  consistency: "Consistency",
  feedback: "Feedback Loops",
  overwhelm: "Information Overwhelm",
  direction: "Direction & Clarity",
  execution: "Execution Gap",
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
      bottleneck?: string;
      hoursPerWeek?: string;
    };
  };

  if (!meta.onboardingComplete) {
    redirect("/foundations/onboarding");
  }

  const firstName = user.firstName || "Operator";
  const domain = meta.foundations?.domain || "";
  const bottleneck = meta.foundations?.bottleneck || "";
  const hours = meta.foundations?.hoursPerWeek || "";

  return (
    <div className="relative min-h-screen bg-[#030303]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.03)_0%,transparent_50%)]" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/[0.04] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-attune-signal animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-attune-starlight/40">
            Foundations — Active
          </span>
        </div>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-8 border border-white/10",
            },
          }}
        />
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-attune-signal/50">
            Status: Initialized
          </p>
          <h1 className="text-authority text-4xl sm:text-5xl text-attune-starlight mb-3">
            Welcome to the Arena,{" "}
            <span className="text-attune-signal text-glow-signal">
              {firstName}
            </span>
          </h1>
          <p className="text-attune-starlight/40">
            Your perception-action loop is now active. Here&apos;s your
            configuration.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full border border-attune-signal/20 bg-attune-signal/[0.06]">
              <Crosshair className="size-5 text-attune-signal" />
            </div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-attune-starlight/30">
              Domain
            </p>
            <p className="text-sm font-medium text-attune-starlight/90">
              {DOMAIN_LABELS[domain] || domain}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full border border-attune-signal/20 bg-attune-signal/[0.06]">
              <Lock className="size-5 text-attune-signal" />
            </div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-attune-starlight/30">
              Constraint
            </p>
            <p className="text-sm font-medium text-attune-starlight/90">
              {BOTTLENECK_LABELS[bottleneck] || bottleneck}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full border border-attune-signal/20 bg-attune-signal/[0.06]">
              <Clock className="size-5 text-attune-signal" />
            </div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-attune-starlight/30">
              Weekly Hours
            </p>
            <p className="text-sm font-medium text-attune-starlight/90">
              {hours} hours / week
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-attune-signal/10 bg-attune-signal/[0.04] px-5 py-2.5">
            <Flame className="size-4 text-attune-signal" />
            <span className="text-xs font-medium text-attune-signal/70">
              Foundations modules loading soon...
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
