"use client";

import { motion, type Variants } from "framer-motion";
import {
  Play,
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pt-36"
      >
        {/* ── Headline Block ── */}
        <div className="mb-16 flex flex-col gap-5 lg:mb-20">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-attune-green/20 bg-attune-green/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-green">
              <Sparkles className="size-3" />
              The Ecological Approach
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-authority max-w-4xl text-6xl font-black text-attune-starlight will-change-transform sm:text-7xl md:text-8xl lg:text-9xl"
          >
            MASTER ANY
            <br />
            DOMAIN.{" "}
            <span className="text-attune-green text-glow-green">FASTER.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-attune-starlight/50 sm:text-sm"
          >
            Skill acquisition redesigned from first principles —{" "}
            <span className="text-attune-starlight/80">
              ecological dynamics meets deliberate practice.
            </span>
          </motion.p>
        </div>

        {/* ── Authority Bento Grid ── */}
        <motion.div
          variants={stagger}
          className="grid w-full gap-4 md:grid-cols-12 md:grid-rows-[auto_auto]"
        >
          {/* ────────────────────────────
              Video Manifesto — Large Card
              ──────────────────────────── */}
          <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden rounded-2xl border border-white/6 bg-[#0c0c0c] md:col-span-7 md:row-span-2"
          >
            {/* 16:9 video placeholder */}
            <div className="relative aspect-video w-full overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-attune-void/20 via-transparent to-attune-obsidian/80" />

              {/* Fake cinematic frame lines */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-attune-green/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-attune-green/10 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group/play flex size-20 items-center justify-center rounded-full border border-attune-green/30 bg-attune-green/10 text-attune-green transition-all duration-300 hover:scale-110 hover:border-attune-green/60 hover:bg-attune-green/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.25)] sm:size-24">
                  <Play className="size-8 fill-current sm:size-10" />
                </button>
              </div>

              {/* Corner badge */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-md bg-attune-void px-2.5 py-1">
                <div className="size-1.5 animate-pulse rounded-full bg-attune-green" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-attune-starlight/70">
                  Manifesto
                </span>
              </div>
            </div>

            {/* Video footer */}
            <div className="flex items-center justify-between px-5 py-4 sm:px-6">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-attune-starlight sm:text-xl">
                  The Attune Manifesto
                </h3>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-attune-starlight/40">
                  3 min · Why everything you know about learning is wrong
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-attune-starlight/60 hover:text-attune-green"
              >
                Watch
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </motion.div>

          {/* ──────────────────────────
              Foundations Course — $97
              ────────────────────────── */}
          <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden rounded-2xl border border-attune-green/20 bg-[#0c0c0c] p-6 transition-all duration-500 hover:border-attune-green/40 sm:p-7 md:col-span-5 glow-green"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-attune-green blur-3xl opacity-20" />

            <div className="relative flex h-full flex-col justify-between gap-5">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-attune-green/10">
                    <Zap className="size-4 text-attune-green" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-green">
                    Start Here
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-attune-starlight">
                  Foundations
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-attune-starlight/40">
                  The complete ecological framework for acquiring any skill —
                  faster, deeper, on your terms.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-attune-starlight">
                    $97
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/30">
                    one-time
                  </span>
                </div>
                <Button className="w-full bg-attune-green font-semibold text-attune-void shadow-[0_0_24px_rgba(0,255,148,0.3)] transition-all duration-300 hover:bg-attune-green/90 hover:shadow-[0_0_36px_rgba(0,255,148,0.45)]">
                  START HERE
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* ──────────────────────────────
              Attractor Universe — $297
              ────────────────────────────── */}
          <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden rounded-2xl border border-attune-purple/15 bg-[#0c0c0c] p-6 transition-all duration-500 hover:border-attune-purple/30 sm:p-7 md:col-span-5"
          >
            <div className="pointer-events-none absolute -left-12 -top-12 size-40 rounded-full bg-attune-purple blur-3xl opacity-20" />

            <div className="relative flex h-full flex-col justify-between gap-5">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-attune-purple/10">
                    <Rocket className="size-4 text-attune-purple" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-purple/80">
                    Live Cohort
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-attune-starlight">
                  Attractor Universe
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-attune-starlight/40">
                  8-week immersive cohort — live coaching, peer practice labs,
                  and accountability architecture.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-attune-starlight">
                    $297
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/30">
                    per cohort
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-attune-purple/40 font-semibold text-attune-purple transition-all duration-300 hover:border-attune-purple hover:bg-attune-purple/10 hover:shadow-[0_0_24px_rgba(124,58,237,0.2)]"
                >
                  JOIN THE COHORT
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* ──────────────────────
              Attune OS — Waitlist
              ────────────────────── */}
          <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden rounded-2xl border border-white/6 bg-[#0c0c0c] p-6 sm:p-7 md:col-span-12"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
              <div className="flex items-start gap-4 md:items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/6 bg-attune-void">
                  <Brain className="size-5 text-attune-starlight/60" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-bold tracking-tight text-attune-starlight sm:text-2xl">
                      Attune&nbsp;OS
                    </h3>
                    <span className="rounded-full border border-attune-starlight/10 bg-attune-starlight/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-attune-starlight/50">
                      Coming Soon
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-attune-starlight/40">
                    Your AI-powered practice companion — adaptive drills,
                    journaling, and real-time feedback loops.
                  </p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 rounded-lg border border-attune-green/20 bg-attune-green/5 px-4 py-2.5"
                >
                  <Sparkles className="size-3.5 text-attune-green" />
                  <span className="font-mono text-xs text-attune-green">
                    You&apos;re on the list.
                  </span>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubmitted(true);
                  }}
                  className="flex w-full shrink-0 flex-col gap-2 sm:flex-row md:w-auto md:min-w-[380px]"
                >
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-attune-starlight/25" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-white/6 bg-attune-void pl-9 text-sm text-attune-starlight placeholder:text-attune-starlight/25 focus-visible:border-attune-green/30 focus-visible:ring-attune-green/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="shrink-0 border-white/8 font-semibold text-attune-starlight/80 transition-all hover:border-attune-starlight/20 hover:bg-attune-starlight/5"
                  >
                    Join Waitlist
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
