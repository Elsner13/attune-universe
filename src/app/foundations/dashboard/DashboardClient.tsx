"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  Target,
  Zap,
  Pencil,
  Check,
  X,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Eye,
  GitBranch,
  Layers,
  Activity,
  Orbit,
  Map,
  Rocket,
  Radio,
  ArrowRight,
} from "lucide-react";
import { MODULES } from "@/data/modules";
import { updateFoundationsField } from "./actions";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const snap = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.06, duration: 0.35, ease: EASE },
  }),
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Eye, GitBranch, Layers, Activity, Orbit, Rocket,
};

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [line, setLine] = useState(0);

  const lines = [
    "> ATTUNE FOUNDATIONS v1.0",
    "> Syncing ecological matrix...",
    "> Constraint engine loaded.",
    "> SYSTEM ONLINE.",
  ];

  useEffect(() => {
    if (line < lines.length) {
      const timer = setTimeout(() => setLine((l) => l + 1), 250);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 300);
      return () => clearTimeout(timer);
    }
  }, [line, lines.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0] }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="absolute inset-0 bg-attune-signal"
      />
      <div className="relative w-full max-w-lg px-6">
        <div className="font-mono text-sm leading-loose">
          {lines.slice(0, line).map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className={
                i === lines.length - 1
                  ? "font-bold text-attune-signal"
                  : "text-white/40"
              }
            >
              {text}
            </motion.div>
          ))}
          {line < lines.length && (
            <span className="inline-block h-4 w-2 animate-pulse bg-attune-signal" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EditableField({
  label,
  value,
  field,
}: {
  label: string;
  value: string;
  field: "domain" | "constraint" | "goal";
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function save() {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === value) {
      setDraft(value);
      setEditing(false);
      return;
    }
    startTransition(async () => {
      await updateFoundationsField(field, trimmed);
      setEditing(false);
    });
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      save();
    }
    if (e.key === "Escape") cancel();
  }

  return (
    <div className="group flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
          {label}
        </p>
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="mt-1"
            >
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={save}
                rows={1}
                spellCheck={false}
                className="font-kinetic w-full resize-none border-0 border-b border-attune-signal/40 bg-transparent text-sm font-bold leading-snug text-white focus:border-attune-signal focus:outline-none"
              />
              <div className="mt-2 flex items-center gap-1.5">
                <button
                  onClick={save}
                  disabled={isPending}
                  className="flex items-center gap-1 rounded bg-attune-signal/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-attune-signal hover:bg-attune-signal hover:text-[#030303] disabled:opacity-40"
                >
                  <Check className="size-2.5" />
                  {isPending ? "..." : "SAVE"}
                </button>
                <button
                  onClick={cancel}
                  className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/25 hover:text-white/60"
                >
                  <X className="size-2.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-kinetic mt-0.5 cursor-pointer truncate text-sm font-bold text-white/90"
              onClick={() => setEditing(true)}
            >
              {value || "—"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      {!editing && (
        <button
          onClick={() => setEditing(true)}
          className="mt-3 flex size-5 shrink-0 items-center justify-center rounded text-white/10 opacity-0 transition-all group-hover:opacity-100 hover:text-attune-signal"
        >
          <Pencil className="size-2.5" />
        </button>
      )}
    </div>
  );
}

function ModuleCard({
  mod,
  index,
  isCompleted,
}: {
  mod: (typeof MODULES)[number];
  index: number;
  isCompleted: boolean;
}) {
  const Icon = ICON_MAP[mod.icon] || Map;

  return (
    <Link href={`/foundations/modules/${mod.slug}`}>
      <motion.div
        custom={index + 8}
        variants={snap}
        className="group relative h-full overflow-hidden rounded-lg border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:border-attune-signal/30 hover:bg-white/[0.04]"
      >
        <div className="pointer-events-none absolute -right-4 -top-4 font-kinetic text-[80px] font-black leading-none text-white/[0.02] transition-all duration-300 group-hover:text-attune-signal/[0.06]">
          {mod.id}
        </div>

        <div className="relative flex h-full flex-col justify-between p-5">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-attune-signal/50 transition-colors group-hover:text-attune-signal" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/20">
                  {mod.id}
                </span>
              </div>
              {isCompleted && (
                <CheckCircle2 className="size-3.5 text-attune-signal/50" />
              )}
            </div>

            <h3 className={`font-kinetic text-sm font-bold uppercase tracking-wide transition-all duration-300 group-hover:translate-x-1 group-hover:text-white ${isCompleted ? "text-white/40" : "text-white/80"}`}>
              {mod.title}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/20">
              {mod.subtitle}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="h-[2px] flex-1 rounded-full bg-white/[0.04]">
              <div
                className="h-full rounded-full bg-attune-signal/40 transition-all duration-300 group-hover:bg-attune-signal/60"
                style={{ width: isCompleted ? "100%" : "0%" }}
              />
            </div>
            {isCompleted ? (
              <span className="ml-2 font-mono text-[7px] font-bold uppercase tracking-[0.15em] text-attune-signal/40">
                Deployed
              </span>
            ) : (
              <ChevronRight className="ml-2 size-3.5 text-white/10 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-attune-signal/60" />
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function DashboardClient({
  firstName,
  domain,
  constraint,
  goal,
  completedModules,
}: {
  firstName: string;
  domain: string;
  constraint: string;
  goal: string;
  completedModules: string[];
}) {
  const [booted, setBooted] = useState(false);

  const nextModule = MODULES.find((m) => !completedModules.includes(m.slug)) || MODULES[0];
  const executionRate = Math.round((completedModules.length / MODULES.length) * 100);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.03)_0%,transparent_50%)]" />

          {/* ══ TICKER BAR ══ */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="sticky top-0 z-20 flex items-center gap-6 overflow-hidden border-b border-white/[0.04] bg-[#030303]/90 px-6 py-2.5 backdrop-blur-md"
          >
            <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
              {[
                { label: "OPERATOR", value: firstName.toUpperCase() },
                { label: "DOMAIN", value: (domain || "UNSET").toUpperCase() },
                { label: "STATUS", value: "ATTUNING", highlight: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/15">
                    {item.label}:
                  </span>
                  <span
                    className={`font-kinetic text-[10px] font-bold uppercase tracking-wider ${
                      item.highlight
                        ? "text-attune-signal"
                        : "text-white/50"
                    }`}
                  >
                    {item.value}
                  </span>
                  {i < 2 && (
                    <span className="ml-2 text-white/8">//</span>
                  )}
                </div>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="size-1.5 rounded-full bg-attune-signal animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-attune-signal/40">
                LIVE
              </span>
            </div>
          </motion.div>

          <main className="relative z-10 p-6 lg:p-8">
            {/* ══ TOP ROW: OBJECTIVE + CONSTRAINT ══ */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="mb-6 grid gap-4 lg:grid-cols-3"
            >
              {/* CURRENT OBJECTIVE — Hero Card */}
              <motion.div
                custom={0}
                variants={snap}
                className="relative overflow-hidden rounded-lg border border-attune-signal/10 bg-attune-signal/[0.03] lg:col-span-2"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-attune-signal/[0.04] blur-3xl" />
                <div className="relative p-6 lg:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <Zap className="size-3.5 text-attune-signal" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-attune-signal/60">
                      Current Objective
                    </span>
                  </div>

                  <h2 className="font-kinetic text-2xl font-black uppercase tracking-tight text-white lg:text-3xl">
                    {nextModule.id}: {nextModule.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/30">
                    {nextModule.subtitle}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
                        Execution Rate
                      </span>
                      <span className="font-kinetic text-xs font-bold tabular-nums text-attune-signal">
                        {executionRate}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${executionRate}%` }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-attune-signal/80 to-attune-signal"
                        style={{
                          boxShadow: "0 0 12px rgba(0, 240, 255, 0.3)",
                        }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/foundations/modules/${nextModule.slug}`}
                    className="mt-6 inline-flex items-center gap-2.5 rounded-md border border-attune-signal/30 bg-attune-signal/10 px-6 py-3 font-kinetic text-sm font-bold uppercase tracking-wider text-attune-signal transition-all duration-200 hover:bg-attune-signal hover:text-[#030303] hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]"
                  >
                    <Zap className="size-4" />
                    Deploy
                  </Link>
                </div>
              </motion.div>

              {/* CONSTRAINT — Warning Card */}
              <motion.div
                custom={1}
                variants={snap}
                className="relative overflow-hidden rounded-lg border border-red-500/10 bg-red-500/[0.03]"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-red-500/[0.05] blur-3xl" />
                <div className="relative flex h-full flex-col p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle className="size-3.5 text-red-400/70" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-400/50">
                      Current Target
                    </span>
                  </div>

                  <p className="font-kinetic flex-1 text-base font-bold leading-snug text-red-300/80 lg:text-lg">
                    {constraint || "No constraint set"}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-[2px] flex-1 rounded-full bg-red-500/10">
                      <div className="h-full w-full animate-pulse rounded-full bg-red-500/20" />
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-red-400/30">
                      Unresolved
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ══ OPERATOR CONFIG ══ */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <motion.div
                custom={3}
                variants={snap}
                className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
                    Operator Config
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/10">
                    Editable
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <EditableField
                    label="Domain"
                    value={domain}
                    field="domain"
                  />
                  <EditableField
                    label="Bottleneck"
                    value={constraint}
                    field="constraint"
                  />
                  <EditableField
                    label="90-Day Objective"
                    value={goal}
                    field="goal"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ══ THE ARSENAL — Module Grid ══ */}
            <motion.div initial="hidden" animate="visible">
              <motion.div
                custom={5}
                variants={snap}
                className="mb-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Crosshair className="size-3.5 text-attune-signal/40" />
                  <span className="font-kinetic text-xs font-bold uppercase tracking-[0.15em] text-white/30">
                    The Arsenal
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/10">
                  {completedModules.length} / {MODULES.length} Deployed
                </span>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {MODULES.map((mod, i) => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    index={i}
                    isCompleted={completedModules.includes(mod.slug)}
                  />
                ))}
              </div>
            </motion.div>

            {/* ══ 90-DAY OBJECTIVE FOOTER ══ */}
            <motion.div
              custom={16}
              variants={snap}
              initial="hidden"
              animate="visible"
              className="mt-8 rounded-lg border border-white/[0.03] bg-white/[0.01] p-5"
            >
              <div className="flex items-start gap-3">
                <Target className="mt-0.5 size-4 shrink-0 text-attune-signal/30" />
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">
                    90-Day Win
                  </p>
                  <p className="font-kinetic mt-1 text-sm font-bold leading-relaxed text-white/50">
                    {goal || "No objective set"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ══ NEXT LEVEL UPSELL — The Attractor ══ */}
            <motion.div
              custom={17}
              variants={snap}
              initial="hidden"
              animate="visible"
              className="mt-6 overflow-hidden rounded-lg border border-attune-purple/15 bg-[#0c0c0c]"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-attune-purple/30 to-transparent" />
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-attune-purple/10">
                    <Radio className="size-4 text-attune-purple/80" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-attune-purple/60">
                      Ready to go deeper?
                    </p>
                    <p className="font-kinetic mt-0.5 text-sm font-bold text-white/70">
                      The Attractor — 30-Day Live Cohort
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/30">
                      AI companion. Daily constraint challenges. Make this framework your default state.
                    </p>
                  </div>
                </div>
                <Link
                  href="/attractor"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md border border-attune-purple/30 bg-attune-purple/10 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-attune-purple transition-all duration-200 hover:bg-attune-purple hover:text-white"
                >
                  Secure a Seat — $297
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-attune-purple/10 to-transparent" />
            </motion.div>
          </main>
        </div>
      )}
    </>
  );
}
