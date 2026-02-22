"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cpu,
  GitBranch,
  Activity,
  Waypoints,
  Terminal,
  Mail,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

/* ─── Brand Color ─── */
const BLUE = "#00B4FF";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ─── Data ─── */
const capabilities = [
  {
    icon: Waypoints,
    title: "Real-Time Affordance Mapping",
    description:
      "The OS continuously scans your domain and surfaces the opportunities your current perceptual system is missing. Not suggestions — detected affordances, specified by the informational structure of your environment.",
    status: "ACTIVE",
  },
  {
    icon: GitBranch,
    title: "Constraint-Led Session Design",
    description:
      "Stop designing practice by intuition. Input your domain, your current developmental stage, and your session goal. The OS generates representative, constraint-rich environments that force the skill to self-organize.",
    status: "ONLINE",
  },
  {
    icon: Activity,
    title: "Perception-Action Coupling Analytics",
    description:
      "Track the tightness of your perception-action loop over time. See where you're overthinking, where you're under-perceiving, and where the next phase transition is building.",
    status: "LIVE",
  },
  {
    icon: Cpu,
    title: "Ecological Pattern Engine",
    description:
      "A library of 10,000+ constraint configurations mapped across domains. The pattern engine matches your specific situation to the constraint architecture that has historically produced the fastest attunement.",
    status: "READY",
  },
  {
    icon: Terminal,
    title: "Adaptive Drill Generation",
    description:
      "Drills that change every session based on your progression. No repetition. Pure variation with consistent functional goals — the exact recipe Bernstein's blacksmith used to achieve mastery.",
    status: "STANDBY",
  },
  {
    icon: Brain,
    title: "Neural Skill Map",
    description:
      "A visual representation of your attractor landscape. See which patterns are deep attractors (stable), which are shallow (fragile), and which are building toward a phase transition.",
    status: "BETA",
  },
];

/* ─── Skill Tree SVG ─── */
const skillTreeNodes = [
  { x: 50, y: 20, label: "Perception", active: true },
  { x: 20, y: 45, label: "Coupling", active: true },
  { x: 80, y: 45, label: "Affordance", active: true },
  { x: 35, y: 70, label: "Constraint", active: false },
  { x: 65, y: 70, label: "Attunement", active: false },
  { x: 50, y: 92, label: "Mastery", active: false },
];
const skillTreeEdges = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5]];

function SkillTreeSVG() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {skillTreeEdges.map(([from, to], i) => {
        const a = skillTreeNodes[from];
        const b = skillTreeNodes[to];
        return (
          <line
            key={i}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={`rgba(0, 180, 255, 0.15)`}
            strokeWidth="0.4"
          />
        );
      })}
      {skillTreeNodes.map((node, i) => (
        <g key={i}>
          <circle
            cx={node.x} cy={node.y}
            r={node.active ? 2.5 : 1.8}
            fill={node.active ? `rgba(0, 180, 255, 0.8)` : "rgba(255,255,255,0.1)"}
          />
          {node.active && (
            <circle cx={node.x} cy={node.y} r="4.5" fill="none"
              stroke="rgba(0, 180, 255, 0.2)" strokeWidth="0.3" />
          )}
          <text x={node.x} y={node.y + 6} textAnchor="middle"
            fill={node.active ? "rgba(0, 180, 255, 0.6)" : "rgba(255,255,255,0.2)"}
            fontSize="2.8" fontFamily="monospace">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ─── OS Mockup ─── */
function OSMockup() {
  const lines = [
    { num: 1, text: "import { Ecology } from '@attune/core';", dim: true },
    { num: 2, text: "", dim: true },
    { num: 3, text: "const session = Ecology.create({", dim: false },
    { num: 4, text: "  domain: 'basketball.shooting',", dim: true },
    { num: 5, text: "  constraints: ['defender-close', 'fatigue-7'],", dim: true },
    { num: 6, text: "  perception: 'affordance-led',", dim: false },
    { num: 7, text: "});", dim: true },
    { num: 8, text: "", dim: true },
    { num: 9, text: "session.attune(); // begin neural sync", dim: false },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505]"
      style={{ boxShadow: `0 0 80px ${BLUE}08` }}>
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Brain className="size-4" style={{ color: `${BLUE}70` }} />
          <span className="font-mono text-[10px] font-medium tracking-wider text-white/40">
            ATTUNE OS
          </span>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[8px] tracking-widest"
            style={{ backgroundColor: `${BLUE}12`, color: `${BLUE}70` }}
          >
            v0.1-alpha
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-1.5 animate-pulse rounded-full" style={{ backgroundColor: BLUE }} />
          <span className="font-mono text-[9px] tracking-wider" style={{ color: `${BLUE}60` }}>
            SYNCED
          </span>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="grid grid-cols-12 divide-x divide-white/[0.04]">
        {/* Left: Skill Tree */}
        <div className="col-span-3 p-3">
          <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
            Skill Map
          </div>
          <div className="aspect-square">
            <SkillTreeSVG />
          </div>
        </div>

        {/* Center: Editor */}
        <div className="col-span-6 p-3">
          <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
            Ecology Editor
          </div>
          <div className="overflow-hidden rounded-lg border border-white/[0.05] bg-[#0a0a0a]">
            <div className="flex items-center gap-2 border-b border-white/[0.05] px-3 py-2">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="size-2 rounded-full bg-white/10" />
                ))}
              </div>
              <span className="ml-2 font-mono text-[9px] tracking-wider text-white/20">
                session.ecology.ts
              </span>
            </div>
            <div className="px-3 py-2.5">
              {lines.map((line) => (
                <div key={line.num} className="flex items-center gap-3">
                  <span className="w-4 text-right font-mono text-[9px] tabular-nums text-white/10">
                    {line.num}
                  </span>
                  <span
                    className="font-mono text-[10px] leading-[1.8]"
                    style={{ color: line.dim ? "rgba(255,255,255,0.2)" : `${BLUE}80` }}
                  >
                    {line.text || "\u00A0"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="col-span-3 p-3">
          <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
            Neural Graph
          </div>
          <div className="mb-3 space-y-2">
            {[
              { label: "Perception", value: "94%" },
              { label: "Coupling", value: "78%" },
              { label: "Entropy", value: "0.34" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-wider text-white/20">
                  {stat.label}
                </span>
                <span className="font-mono text-[9px] tabular-nums" style={{ color: `${BLUE}70` }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-white/[0.04] px-4 py-1.5">
        <span className="font-mono text-[8px] tracking-wider text-white/15">
          session://basketball.shooting — constraint_set_active
        </span>
        <span className="font-mono text-[8px] tracking-wider" style={{ color: `${BLUE}40` }}>
          ◆ 3 affordances detected
        </span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export function OSClient() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "os-waitlist" }),
      });
    } catch {
      // Continue even if API fails
    }
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen bg-attune-void text-attune-starlight">
      {/* ── Top Nav ── */}
      <nav
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.04] px-6 py-3 backdrop-blur-md sm:px-10 lg:px-16"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/40 transition-colors duration-300 hover:text-attune-starlight/80"
        >
          <ArrowRight className="size-3 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Attune Universe
        </Link>
        <span
          className="rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{ borderColor: `${BLUE}25`, color: `${BLUE}80`, backgroundColor: `${BLUE}08` }}
        >
          v0.1 · Early Access
        </span>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${BLUE}07 0%, transparent 70%)`,
          }}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center sm:px-10 lg:px-16"
        >
          <motion.span
            variants={fadeIn}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ borderColor: `${BLUE}30`, backgroundColor: `${BLUE}08`, color: BLUE }}
          >
            <Brain className="size-3" />
            System Architecture — v0.1
          </motion.span>

          <motion.h1
            variants={fadeIn}
            className="max-w-4xl text-5xl font-black text-attune-starlight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ lineHeight: "0.9", letterSpacing: "-0.02em" }}
          >
            THE{" "}
            <span
              style={{
                color: BLUE,
                textShadow: `0 0 40px ${BLUE}55, 0 0 80px ${BLUE}20`,
              }}
            >
              OS.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mt-8 max-w-2xl text-base leading-relaxed text-attune-starlight/50 sm:text-lg"
          >
            Your second brain, optimized for ecological mastery. Adaptive constraint design,
            real-time affordance mapping, and neural feedback loops — all in one system. Join the
            waitlist for early access.
          </motion.p>

          {/* Waitlist form */}
          <motion.div variants={fadeIn} className="mt-10 w-full max-w-lg">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 rounded-2xl border px-6 py-8"
                style={{ borderColor: `${BLUE}25`, backgroundColor: `${BLUE}08` }}
              >
                <Sparkles className="size-6" style={{ color: BLUE }} />
                <p className="font-mono text-sm" style={{ color: BLUE }}>
                  You&apos;re on the list. Early access drops first.
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/30">
                  We&apos;ll be in touch before public launch.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-attune-starlight/25" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-white/10 bg-attune-void pl-9 text-sm text-attune-starlight placeholder:text-attune-starlight/25"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="gap-2 font-bold text-attune-void transition-all duration-300"
                  style={{ backgroundColor: BLUE, boxShadow: `0 0 30px ${BLUE}45` }}
                >
                  {loading ? "JOINING..." : "JOIN WAITLIST"}
                  <ArrowRight className="size-5" />
                </Button>
              </form>
            )}
            {!submitted && (
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                No spam. Early access only.
              </p>
            )}
          </motion.div>
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${BLUE}25, transparent)` }}
        />
      </section>

      {/* ── OS Mockup ── */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16"
        >
          <OSMockup />
        </motion.div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.span
              variants={fadeIn}
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ borderColor: `${BLUE}25`, backgroundColor: `${BLUE}08`, color: BLUE }}
            >
              <Zap className="size-3" />
              System Capabilities
            </motion.span>
            <motion.h2
              variants={fadeIn}
              className="mt-6 text-4xl font-black text-attune-starlight sm:text-5xl"
            >
              WHAT THE OS DOES.
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="mx-auto mt-4 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-attune-starlight/30"
            >
              Not a productivity app. An ecological intelligence system.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  variants={fadeIn}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-7 transition-colors duration-400"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${BLUE}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex size-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${BLUE}0a` }}
                      >
                        <Icon className="size-5" style={{ color: `${BLUE}80` }} />
                      </div>
                      <h3 className="font-display text-base font-bold tracking-tight text-attune-starlight">
                        {cap.title}
                      </h3>
                    </div>
                    <span
                      className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.2em]"
                      style={{ color: `${BLUE}50` }}
                    >
                      <span
                        className="size-1 rounded-full"
                        style={{ backgroundColor: `${BLUE}80` }}
                      />
                      {cap.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-attune-starlight/40">
                    {cap.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Waitlist CTA ── */}
      <section className="py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative overflow-hidden rounded-3xl border bg-[#080808]"
            style={{
              borderColor: `${BLUE}20`,
              boxShadow: `0 0 60px ${BLUE}08`,
            }}
          >
            <div
              className="h-px w-full"
              style={{ background: `linear-gradient(to right, transparent, ${BLUE}50, transparent)` }}
            />
            <div className="relative px-8 py-14 sm:px-14 sm:py-16">
              <motion.div variants={fadeIn} className="mb-6 flex items-center gap-3">
                <div
                  className="flex size-12 items-center justify-center rounded-2xl border"
                  style={{ borderColor: `${BLUE}25`, backgroundColor: `${BLUE}0a` }}
                >
                  <Brain className="size-6" style={{ color: BLUE }} />
                </div>
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: `${BLUE}80` }}
                  >
                    Coming Soon
                  </span>
                  <h4 className="font-display text-2xl font-bold tracking-tight text-attune-starlight">
                    Attune OS
                  </h4>
                </div>
              </motion.div>

              <motion.h2
                variants={fadeIn}
                className="mb-4 text-2xl font-bold leading-tight text-attune-starlight/90 sm:text-3xl"
              >
                YOUR SECOND BRAIN.
                <br />
                <span style={{ color: BLUE }}>OPTIMIZED FOR ECOLOGICAL MASTERY.</span>
              </motion.h2>

              <motion.p variants={fadeIn} className="mb-8 max-w-lg text-sm leading-relaxed text-attune-starlight/40">
                The OS turns the ecological framework into an active intelligence system that works
                alongside you. Adaptive constraints. Real-time feedback loops. Neural progression
                mapping. Early access members help shape the product.
              </motion.p>

              <motion.div variants={fadeIn}>
                {submitted ? (
                  <div
                    className="flex items-center justify-center gap-2 rounded-xl border px-5 py-4"
                    style={{ borderColor: `${BLUE}25`, backgroundColor: `${BLUE}08` }}
                  >
                    <Sparkles className="size-4" style={{ color: BLUE }} />
                    <span className="font-mono text-sm" style={{ color: BLUE }}>
                      You&apos;re on the list. We&apos;ll be in touch.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlist} className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-attune-starlight/25" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-white/10 bg-attune-void pl-9 font-mono text-sm text-attune-starlight placeholder:text-attune-starlight/25"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="gap-2 font-bold text-attune-void transition-all duration-300"
                      style={{ backgroundColor: BLUE, boxShadow: `0 0 40px ${BLUE}50` }}
                    >
                      JOIN WAITLIST
                      <ArrowRight className="size-5" />
                    </Button>
                  </form>
                )}
                {!submitted && (
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                    No spam. Early access only. Shape the product.
                  </p>
                )}
              </motion.div>
            </div>
            <div
              className="h-px w-full"
              style={{ background: `linear-gradient(to right, transparent, ${BLUE}25, transparent)` }}
            />
          </motion.div>

          {/* Foundation bridge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 rounded-2xl border border-white/[0.04] bg-[#080808] px-6 py-5"
          >
            <p className="text-xs leading-relaxed text-attune-starlight/30">
              New to Attune? Start with{" "}
              <Link href="/foundations" className="text-attune-green/70 underline underline-offset-2 hover:text-attune-green transition-colors">
                Foundations ($97)
              </Link>
              {" "}to learn the ecological framework — then come back here when you&apos;re ready to
              take it further. Or join{" "}
              <Link href="/attractor" className="text-attune-purple/70 underline underline-offset-2 hover:text-attune-purple transition-colors">
                The Attractor ($297)
              </Link>
              {" "}for the full 30-day immersion.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="pb-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/12">
          &copy; 2026 Attune. All rights reserved.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/30 transition-colors duration-300 hover:text-attune-starlight/70"
        >
          <ArrowRight className="size-3 rotate-180" />
          Back to Attune Universe
        </Link>
      </div>
    </main>
  );
}
