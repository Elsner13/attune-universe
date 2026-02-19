"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, Library, Zap, Cpu, Radio, ArrowRight } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import Link from "next/link";

const NAV_ITEMS = [
  { id: "hero", icon: Orbit, label: "00_ORIGIN", tooltip: "Origin" },
  { id: "foundations", icon: Library, label: "01_LINEAGE", tooltip: "Foundations" },
  { id: "attractor", icon: Zap, label: "02_FUTURE", tooltip: "Attractor" },
  { id: "attune-os", icon: Cpu, label: "03_SYSTEM", tooltip: "Attune OS" },
  { id: "signal", icon: Radio, label: "04_SIGNAL", tooltip: "Signal / Noise" },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleMap = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleMap.set(id, entry.intersectionRatio);
          } else {
            visibleMap.delete(id);
          }

          let best: string | null = null;
          let bestRatio = 0;
          visibleMap.forEach((ratio, key) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = key;
            }
          });

          if (best) setActive(best);
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.5], rootMargin: "-10% 0px -10% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

// Sidebar icon button (desktop)
function NavIcon({
  item,
  isActive,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <div className="relative flex items-center">
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={item.tooltip}
        className="group relative flex size-10 items-center justify-center rounded-md transition-all duration-300"
      >
        {/* Active indicator bar */}
        <motion.span
          className="absolute -left-[13px] h-6 w-[2px] rounded-full bg-attune-green"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Glow ring */}
        {isActive && (
          <motion.span
            layoutId="cmd-glow"
            className="absolute inset-0 rounded-md"
            style={{
              boxShadow:
                "0 0 14px rgba(0,255,148,0.35), 0 0 40px rgba(0,255,148,0.12)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}

        <Icon
          className={`relative z-10 size-[18px] transition-colors duration-300 ${
            isActive
              ? "text-attune-green drop-shadow-[0_0_6px_rgba(0,255,148,0.6)]"
              : "text-white/30 group-hover:text-white/70"
          }`}
        />
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-14 whitespace-nowrap rounded bg-attune-obsidian/95 px-2.5 py-1 font-mono text-[10px] tracking-widest text-attune-green/80 ring-1 ring-attune-green/15"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile dock icon
function DockIcon({
  item,
  isActive,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      aria-label={item.tooltip}
      className="group relative flex flex-1 flex-col items-center justify-center gap-1.5 py-3"
    >
      <motion.span
        className="absolute top-0 h-[2px] w-6 rounded-full bg-attune-green shadow-[0_0_8px_rgba(0,255,148,0.4)]"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <Icon
        className={`size-[18px] transition-all duration-300 ${
          isActive
            ? "text-attune-green drop-shadow-[0_0_6px_rgba(0,255,148,0.6)]"
            : "text-white/30 group-hover:text-white/60"
        }`}
      />
      <span
        className={`font-mono text-[7px] tracking-wider transition-colors duration-300 ${
          isActive ? "text-attune-green/70" : "text-white/20"
        }`}
      >
        {item.label.split("_")[0]}
      </span>
    </button>
  );
}

export function CommandCenter() {
  const lenis = useLenis();
  const [powered, setPowered] = useState(false);
  const bootTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const sectionIds = NAV_ITEMS.map((n) => n.id);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    bootTimer.current = setTimeout(() => setPowered(true), 400);
    return () => {
      if (bootTimer.current) clearTimeout(bootTimer.current);
    };
  }, []);

  const scrollTo = useCallback(
    (id: SectionId) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (lenis) {
        lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );

  /* ─── Desktop sidebar ─── */
  const sidebar = (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={powered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed left-0 top-0 z-40 hidden h-screen w-14 flex-col items-center border-r border-attune-green/8 bg-attune-void/80 backdrop-blur-sm lg:flex"
    >
      {/* Boot indicator */}
      <div className="flex h-14 w-full items-center justify-center border-b border-white/5">
        <motion.div
          animate={powered ? { scale: [0, 1.3, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="size-1.5 rounded-full bg-attune-green shadow-[0_0_8px_rgba(0,255,148,0.6)]"
        />
      </div>

      {/* Navigation icons */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        {NAV_ITEMS.map((item) => (
          <NavIcon
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onClick={() => scrollTo(item.id)}
          />
        ))}
      </div>

      {/* Foundations CTA */}
      <div className="flex flex-col items-center gap-2 pb-4">
        <Link
          href="/foundations"
          className="group relative flex size-10 items-center justify-center rounded-md border border-attune-green/20 bg-attune-green/5 transition-all duration-300 hover:border-attune-green/40 hover:bg-attune-green/10 hover:shadow-[0_0_20px_rgba(0,255,148,0.15)]"
          aria-label="Foundations Course"
        >
          <ArrowRight className="size-[18px] text-attune-green/70 transition-colors duration-300 group-hover:text-attune-green" />
        </Link>
        <span className="font-mono text-[7px] tracking-widest text-attune-green/40">
          START
        </span>
      </div>
    </motion.nav>
  );

  /* ─── Mobile bottom dock — glass-morphism ─── */
  const dock = (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={powered ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/8 pb-[env(safe-area-inset-bottom)] lg:hidden"
      style={{
        background: "rgba(5, 5, 5, 0.55)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <DockIcon
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          onClick={() => scrollTo(item.id)}
        />
      ))}
    </motion.nav>
  );

  return (
    <>
      {sidebar}
      {dock}
    </>
  );
}
