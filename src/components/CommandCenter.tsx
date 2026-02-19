"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutGrid,
  Map,
  Layers,
  Activity,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/foundations/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/foundations/blueprint", label: "Blueprint", icon: Map },
  { href: "/foundations/modules", label: "Modules", icon: Layers },
];

export function CommandCenter({ domain }: { domain?: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-white/[0.04] bg-[#030303]">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-4">
        <div className="flex size-7 items-center justify-center rounded bg-attune-signal/10">
          <Activity className="size-3.5 text-attune-signal" />
        </div>
        <span className="font-kinetic text-xs font-bold uppercase tracking-[0.15em] text-white/80">
          Foundations
        </span>
      </div>

      {/* Status */}
      <div className="border-b border-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-attune-signal animate-pulse" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-attune-signal/60">
            Signal: Active
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/[0.06] text-white"
                    : "text-white/30 hover:bg-white/[0.03] hover:text-white/60"
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? "text-attune-signal" : "text-white/20"}`} />
                <span className="font-kinetic uppercase tracking-wider">{item.label}</span>
                {isActive && (
                  <ChevronRight className="ml-auto size-3 text-attune-signal/40" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-white/[0.04] px-4 py-3">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-7 border border-white/10",
            },
          }}
        />
      </div>

      {/* Domain ticker */}
      {domain && domain !== "Unset" && (
        <div className="overflow-hidden border-t border-white/[0.04] bg-white/[0.02]">
          <div
            className="flex whitespace-nowrap py-2"
            style={{ animation: "ticker-scroll 20s linear infinite" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-4 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-attune-signal/30"
              >
                Current Domain: {domain}
                <span className="mx-4 text-white/10">///</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
