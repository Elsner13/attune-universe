"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  GitBranch,
  Layers,
  Activity,
  Orbit,
  Rocket,
  Map,
  CheckCircle2,
} from "lucide-react";
import { MODULES } from "@/data/modules";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Map,
  Eye,
  GitBranch,
  Layers,
  Activity,
  Orbit,
  Rocket,
};

export function BattlePlan({
  completedModules,
}: {
  completedModules: string[];
}) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[#222] bg-black">
      {/* Header */}
      <div className="border-b border-[#222] px-4 py-4">
        <Link
          href="/foundations/dashboard"
          className="group mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/25 transition-colors hover:text-attune-signal"
        >
          <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
          War Room
        </Link>
        <h2 className="font-kinetic text-xs font-bold uppercase tracking-[0.2em] text-white/60">
          The Battle Plan
        </h2>
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-0.5">
          {MODULES.map((mod) => {
            const isActive = pathname === `/foundations/modules/${mod.slug}`;
            const isCompleted = completedModules.includes(mod.slug);
            const Icon = ICON_MAP[mod.icon] || Map;

            return (
              <Link
                key={mod.slug}
                href={`/foundations/modules/${mod.slug}`}
                className={`group relative flex items-start gap-3 rounded-md px-3 py-2.5 text-xs transition-all ${
                  isActive
                    ? "bg-attune-signal/[0.08] text-white"
                    : isCompleted
                      ? "text-white/20 hover:bg-white/[0.03] hover:text-white/40"
                      : "text-white/40 hover:bg-white/[0.03] hover:text-white/60"
                }`}
              >
                <Icon
                  className={`mt-0.5 size-3.5 shrink-0 ${
                    isActive
                      ? "text-attune-signal"
                      : isCompleted
                        ? "text-white/15"
                        : "text-white/20"
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-white/15">
                      {mod.id}
                    </span>

                    {isActive && (
                      <span className="flex items-center gap-1 rounded bg-attune-signal/15 px-1.5 py-0.5">
                        <span className="size-1 animate-pulse rounded-full bg-attune-signal" />
                        <span className="font-mono text-[7px] font-bold uppercase tracking-widest text-attune-signal">
                          Active
                        </span>
                      </span>
                    )}

                    {!isActive && isCompleted && (
                      <CheckCircle2 className="size-3 text-attune-signal/40" />
                    )}
                  </div>

                  <p
                    className={`font-kinetic mt-0.5 text-[11px] font-bold uppercase leading-tight tracking-wide ${
                      isCompleted && !isActive ? "line-through decoration-white/10" : ""
                    }`}
                  >
                    {mod.title}
                  </p>

                  {!isActive && isCompleted && (
                    <span className="mt-1 inline-block font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-attune-signal/30">
                      Deployed
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer stats */}
      <div className="border-t border-[#222] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/15">
            Deployed
          </span>
          <span className="font-kinetic text-xs font-bold tabular-nums text-attune-signal/60">
            {completedModules.length}/{MODULES.length}
          </span>
        </div>
        <div className="mt-2 h-[2px] overflow-hidden rounded-full bg-white/[0.04]">
          <div
            className="h-full rounded-full bg-attune-signal/40"
            style={{
              width: `${(completedModules.length / MODULES.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </aside>
  );
}
