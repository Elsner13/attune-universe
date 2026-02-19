"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

const dataSpecs = [
  { icon: Waypoints, label: "Real-time Affordance Mapping", status: "ACTIVE" },
  { icon: GitBranch, label: "Constraint-Led Branching", status: "ONLINE" },
  { icon: Activity, label: "Neural Sync", status: "LIVE" },
  { icon: Cpu, label: "Ecological Pattern Engine", status: "READY" },
  { icon: Terminal, label: "Adaptive Drill Generation", status: "STANDBY" },
];

const skillTreeNodes = [
  { x: 50, y: 20, label: "Perception", active: true },
  { x: 20, y: 45, label: "Coupling", active: true },
  { x: 80, y: 45, label: "Affordance", active: true },
  { x: 35, y: 70, label: "Constraint", active: false },
  { x: 65, y: 70, label: "Attunement", active: false },
  { x: 50, y: 92, label: "Mastery", active: false },
];

const skillTreeEdges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

function SkillTreeSVG() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {skillTreeEdges.map(([from, to], i) => {
        const a = skillTreeNodes[from];
        const b = skillTreeNodes[to];
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(0, 180, 255, 0.15)"
            strokeWidth="0.4"
          />
        );
      })}
      {skillTreeNodes.map((node, i) => (
        <g key={i}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.active ? 2.5 : 1.8}
            fill={node.active ? "rgba(0, 180, 255, 0.8)" : "rgba(255,255,255,0.1)"}
          />
          {node.active && (
            <circle
              cx={node.x}
              cy={node.y}
              r="4.5"
              fill="none"
              stroke="rgba(0, 180, 255, 0.2)"
              strokeWidth="0.3"
            />
          )}
          <text
            x={node.x}
            y={node.y + 6}
            textAnchor="middle"
            fill={node.active ? "rgba(0, 180, 255, 0.6)" : "rgba(255,255,255,0.2)"}
            fontSize="2.8"
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function NodeGraphSVG() {
  const nodes = [
    { cx: 15, cy: 30 },
    { cx: 40, cy: 15 },
    { cx: 70, cy: 25 },
    { cx: 90, cy: 50 },
    { cx: 60, cy: 55 },
    { cx: 25, cy: 65 },
    { cx: 50, cy: 80 },
    { cx: 80, cy: 75 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [1, 4], [2, 4], [5, 6], [6, 7], [7, 3], [4, 6],
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="rgba(0, 180, 255, 0.12)"
          strokeWidth="0.3"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="1.5" fill="rgba(0, 180, 255, 0.5)" />
          <circle
            cx={n.cx}
            cy={n.cy}
            r="3"
            fill="none"
            stroke="rgba(0, 180, 255, 0.15)"
            strokeWidth="0.3"
          />
        </g>
      ))}
    </svg>
  );
}

function EditorMockup() {
  const lines = [
    { num: 1, text: "import { Ecology } from '@attune/core';", highlight: false },
    { num: 2, text: "", highlight: false },
    { num: 3, text: "const session = Ecology.create({", highlight: true },
    { num: 4, text: "  domain: 'basketball.shooting',", highlight: false },
    { num: 5, text: "  constraints: ['defender-close', 'fatigue-7'],", highlight: false },
    { num: 6, text: "  perception: 'affordance-led',", highlight: true },
    { num: 7, text: "});", highlight: false },
    { num: 8, text: "", highlight: false },
    { num: 9, text: "session.attune(); // begin neural sync", highlight: true },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-white/6 bg-[#0a0a0a]">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/6 px-3 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-white/10" />
          <div className="size-2 rounded-full bg-white/10" />
          <div className="size-2 rounded-full bg-white/10" />
        </div>
        <span className="ml-2 font-mono text-[9px] tracking-wider text-white/20">
          session.ecology.ts
        </span>
      </div>
      {/* Code */}
      <div className="px-3 py-2.5">
        {lines.map((line) => (
          <div key={line.num} className="flex items-center gap-3">
            <span className="w-4 text-right font-mono text-[9px] tabular-nums text-white/10">
              {line.num}
            </span>
            <span
              className={`font-mono text-[10px] leading-[1.8] ${
                line.highlight ? "text-attune-blue/70" : "text-white/25"
              }`}
            >
              {line.text || "\u00A0"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingOSMockup({ rotateX, rotateY }: { rotateX: MotionValue<number>; rotateY: MotionValue<number> }) {
  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="relative w-full max-w-3xl will-change-transform"
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-attune-blue/4 blur-2xl" />

      {/* Main mockup container */}
      <div className="relative overflow-hidden rounded-2xl border border-attune-blue/15 bg-[#080808] shadow-[0_0_80px_rgba(0,180,255,0.08)]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/6 px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <Brain className="size-4 text-attune-blue/60" />
            <span className="font-mono text-[10px] font-medium tracking-wider text-white/40">
              ATTUNE OS
            </span>
            <span className="rounded-full bg-attune-blue/10 px-2 py-0.5 font-mono text-[8px] tracking-widest text-attune-blue/60">
              v0.1-alpha
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="size-1.5 animate-pulse rounded-full bg-attune-blue" />
              <span className="font-mono text-[9px] tracking-wider text-attune-blue/50">
                SYNCED
              </span>
            </div>
          </div>
        </div>

        {/* Three-panel layout */}
        <div className="grid grid-cols-12 divide-x divide-white/4">
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
            <EditorMockup />
          </div>

          {/* Right: Node Graph + Readouts */}
          <div className="col-span-3 p-3">
            <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
              Neural Graph
            </div>
            <div className="mb-3 aspect-square">
              <NodeGraphSVG />
            </div>
            {/* Mini readouts */}
            <div className="space-y-1.5">
              {[
                { label: "Perception", value: "94%" },
                { label: "Coupling", value: "78%" },
                { label: "Entropy", value: "0.34" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="font-mono text-[8px] uppercase tracking-wider text-white/20">
                    {stat.label}
                  </span>
                  <span className="font-mono text-[9px] tabular-nums text-attune-blue/60">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between border-t border-white/6 px-4 py-1.5">
          <span className="font-mono text-[8px] tracking-wider text-white/15">
            session://basketball.shooting — constraint_set_active
          </span>
          <span className="font-mono text-[8px] tracking-wider text-attune-blue/30">
            ◆ 3 affordances detected
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function AttuneOSSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headlineY = useSpring(headlineYRaw, SPRING);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    { stiffness: 150, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    { stiffness: 150, damping: 30 }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      id="attune-os"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[280vh]"
    >
      {/* ═══════════════════════════════════════
          Sticky "THE OS." watermark
          ═══════════════════════════════════════ */}
      <div className="sticky top-0 z-0 flex h-screen items-center overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <motion.h2
            style={{ y: headlineY }}
            className="text-authority select-none text-left text-[clamp(3.5rem,14vw,16rem)] font-black leading-[0.85] text-attune-starlight/3 will-change-transform"
          >
            THE
            <br />
            TOOL.
          </motion.h2>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-attune-blue/15 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════
          Scrolling content layer
          ═══════════════════════════════════════ */}
      <div className="relative z-10 -mt-[70vh] pb-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-attune-blue/20 bg-attune-blue/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-blue">
              <Brain className="size-3" />
              System Architecture — v0.1
            </span>
          </motion.div>

          {/* Massive headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-center"
          >
            <h3 className="text-authority text-6xl font-black text-attune-starlight sm:text-7xl md:text-8xl lg:text-9xl">
              THE{" "}
              <span className="text-attune-blue text-glow-blue">OS.</span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-24 max-w-2xl text-center font-mono text-xs uppercase tracking-[0.2em] text-attune-starlight/50 sm:text-sm"
          >
            Your Second Brain,{" "}
            <span className="text-attune-starlight/80">
              Optimized for Ecological Mastery.
            </span>
          </motion.p>

          {/* ── Floating UI Mockup ── */}
          <motion.div
            ref={mockupRef}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-28 flex justify-center"
          >
            <FloatingOSMockup rotateX={rotateX} rotateY={rotateY} />
          </motion.div>

          {/* ── Technical Data Readouts ── */}
          <div className="mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-attune-blue/40"
            >
              ── System Capabilities ──
            </motion.p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {dataSpecs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-attune-blue/8 bg-[#080808] px-4 py-5 text-center transition-colors duration-500 hover:border-attune-blue/20"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-attune-blue/6 transition-colors duration-500 group-hover:bg-attune-blue/10">
                    <spec.icon className="size-4 text-attune-blue/50 transition-colors duration-500 group-hover:text-attune-blue/80" />
                  </div>
                  <span className="font-mono text-[10px] font-medium uppercase leading-tight tracking-wider text-attune-starlight/50">
                    {spec.label}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.2em] text-attune-blue/40">
                    <span className="size-1 rounded-full bg-attune-blue/60" />
                    {spec.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════
              Waitlist CTA Card
              ═══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-attune-blue/15 bg-[#080808]"
          >
            {/* Border glow effect */}
            <div className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-b from-attune-blue/20 via-transparent to-attune-blue/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-attune-blue/6 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 size-40 rounded-full bg-attune-blue/4 blur-[80px]" />

            {/* Top accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-blue/40 to-transparent" />

            <div className="relative px-8 py-10 sm:px-12 sm:py-14">
              {/* Badge */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-attune-blue/20 bg-attune-blue/8">
                  <Brain className="size-6 text-attune-blue" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-blue/70">
                    Coming Soon
                  </span>
                  <h4 className="font-display text-2xl font-bold text-attune-starlight sm:text-3xl">
                    Attune OS
                  </h4>
                </div>
              </div>

              <p className="mb-8 max-w-lg text-base leading-relaxed text-attune-starlight/50">
                Your AI-powered second brain for ecological skill acquisition. Adaptive
                constraint design, real-time affordance mapping, and neural feedback
                loops — all in one system.
              </p>

              {/* Technical specs list */}
              <div className="mb-10 space-y-2.5">
                {[
                  "Personalized ecological constraint engine",
                  "Real-time perception-action coupling analytics",
                  "AI-generated representative practice environments",
                  "Neural skill mapping & progression visualization",
                  "Integrated journaling with pattern synthesis",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-attune-starlight/60"
                  >
                    <div className="mt-1.5 size-1 shrink-0 rounded-full bg-attune-blue" />
                    <span className="font-mono text-xs leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-white/6 to-transparent" />

              {/* CTA */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-attune-blue/20 bg-attune-blue/5 px-5 py-4"
                >
                  <Sparkles className="size-4 text-attune-blue" />
                  <span className="font-mono text-sm text-attune-blue">
                    You&apos;re on the list. We&apos;ll be in touch.
                  </span>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email) setSubmitted(true);
                    }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-attune-starlight/25" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-attune-blue/10 bg-attune-void pl-9 text-sm text-attune-starlight placeholder:text-attune-starlight/25 focus-visible:border-attune-blue/30 focus-visible:ring-attune-blue/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="os-cta-glow group/cta gap-2 border border-attune-blue/30 bg-attune-blue px-8 text-base font-bold text-attune-void transition-all duration-300 hover:bg-attune-blue/90 hover:shadow-[0_0_60px_rgba(0,180,255,0.45)]"
                    >
                      JOIN THE WAITLIST
                      <ArrowRight className="size-5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                    </Button>
                  </form>
                  <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                    No spam. Early access only.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-blue/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
