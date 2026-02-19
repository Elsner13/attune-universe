"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, Cpu, GitBranch, Radio, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

const features = [
  { icon: Cpu, label: "Neural Skill Mapping" },
  { icon: GitBranch, label: "Ecological Feedback Loops" },
  { icon: Radio, label: "24/7 AI Synthesis" },
  { icon: Zap, label: "Adaptive Constraint Design" },
  { icon: Lock, label: "Private Cohort Access" },
];

function useCountdown(targetDate: Date) {
  const [remaining, setRemaining] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const now = Date.now();
      const diff = Math.max(0, targetDate.getTime() - now);
      setRemaining({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      });
    }
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  return remaining;
}

const COHORT_START = new Date("2026-03-02T00:00:00");

export function AttractorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });
  const countdown = useCountdown(COHORT_START);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headlineY = useSpring(headlineYRaw, SPRING);


  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className="contain-paint relative min-h-[280vh] bg-attune-void"
    >
      {/* ═══════════════════════════════════════
          Sticky "THE ATTRACTOR." watermark + Orb
          ═══════════════════════════════════════ */}
      <div className="sticky top-0 z-0 flex h-screen items-center overflow-hidden">
        {/* Watermark headline */}
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <motion.h2
            style={{ y: headlineY }}
            className="text-authority select-none text-right text-[clamp(3.5rem,14vw,16rem)] font-black leading-[0.85] text-attune-starlight/3 will-change-transform"
          >
            THE
            <br />
            PRACTICE.
          </motion.h2>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-attune-purple/15 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════
          Scrolling content layer
          ═══════════════════════════════════════ */}
      <div className="relative z-10 -mt-[70vh] pb-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-attune-purple/25 bg-attune-purple/8 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-purple">
              <Radio className="size-3" />
              Live Cohort — 30 Days
            </span>
          </motion.div>

          {/* Massive headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 text-center"
          >
            <h3 className="text-authority text-6xl font-black text-attune-starlight sm:text-7xl md:text-8xl lg:text-9xl">
              THE{" "}
              <span className="text-attune-purple text-glow-purple">
                ATTRACTOR.
              </span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-20 max-w-2xl text-center font-mono text-xs uppercase tracking-[0.2em] text-attune-starlight/50 sm:text-sm"
          >
            30 Days. One AI Companion.{" "}
            <span className="text-attune-starlight/80">Total Domain Mastery.</span>
          </motion.p>

          {/* ── Countdown Ticker ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-24 max-w-xl"
          >
            <div className="rounded-2xl border border-attune-purple/20 bg-attune-obsidian/60 px-6 py-5 backdrop-blur-sm">
              <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-attune-purple/70">
                Next Cohort Opens In
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                {[
                  { value: countdown.d, label: "Days" },
                  { value: countdown.h, label: "Hrs" },
                  { value: countdown.m, label: "Min" },
                  { value: countdown.s, label: "Sec" },
                ].map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <span className="font-mono text-3xl font-bold tabular-nums tracking-tight text-attune-starlight sm:text-4xl">
                      {pad(unit.value)}
                    </span>
                    <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-attune-starlight/30">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="size-1.5 animate-pulse rounded-full bg-attune-purple" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-purple/60">
                  23 Seats Remaining
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Feature Grid ── */}
          <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/4 bg-attune-obsidian/40 px-4 py-6 text-center backdrop-blur-sm transition-colors duration-500 hover:border-attune-purple/20"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-attune-purple/10 transition-colors duration-500 group-hover:bg-attune-purple/20">
                  <feat.icon className="size-5 text-attune-purple/70 transition-colors duration-500 group-hover:text-attune-purple" />
                </div>
                <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-attune-starlight/60">
                  {feat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* ═══════════════════════════════════
              Premium Attractor Offer Card
              ═══════════════════════════════════ */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={
              isCardInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 50, scale: 0.97 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="glow-purple relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-attune-purple/25 bg-attune-obsidian/80 backdrop-blur-xl"
          >
            {/* Glow aura */}
            <div className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-attune-purple/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 size-60 rounded-full bg-attune-purple/6 blur-[80px]" />

            {/* Top accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-purple/50 to-transparent" />

            <div className="relative px-8 py-10 sm:px-12 sm:py-14">
              {/* Badge */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-attune-purple/25 bg-attune-purple/10">
                  <Radio className="size-6 text-attune-purple" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-purple">
                    The Apex Experience
                  </span>
                  <h4 className="font-display text-2xl font-bold text-attune-starlight sm:text-3xl">
                    Attractor Universe
                  </h4>
                </div>
              </div>

              {/* Description */}
              <p className="mb-8 max-w-lg text-base leading-relaxed text-attune-starlight/50">
                30 days of immersive, AI-augmented skill acquisition. Your personal
                neural companion maps your domain, designs adaptive constraints, and
                synthesizes feedback 24/7 — so every rep compounds.
              </p>

              {/* What's inside */}
              <div className="mb-10 space-y-3">
                {[
                  "1-on-1 AI Skill Companion (custom-trained to your domain)",
                  "Daily ecological constraint challenges",
                  "Weekly live cohort synthesis sessions",
                  "Private community & peer accountability pods",
                  "Neural Skill Map — visual progression dashboard",
                  "Lifetime access to cohort recordings & frameworks",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-attune-starlight/60"
                  >
                    <div className="mt-1.5 size-1 shrink-0 rounded-full bg-attune-purple" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-white/6 to-transparent" />

              {/* Price + CTA */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-attune-starlight">
                      $297
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/30">
                      per cohort
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-attune-starlight/25">
                    One investment. Total transformation.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="group/cta gap-2 bg-attune-purple px-8 text-base font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all duration-300 hover:bg-attune-purple/90 hover:shadow-[0_0_60px_rgba(124,58,237,0.55)]"
                >
                  SECURE YOUR SEAT
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                </Button>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-purple/25 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
