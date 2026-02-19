"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConstellationCanvas } from "./ConstellationCanvas";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeOut" as const },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 1.2 + i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-attune-void">
      {/* ─── Background ─── */}
      <ConstellationCanvas />

      {/* ─── Foreground ─── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-32">
        {/* Headline */}
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-center text-7xl font-black leading-[0.92] tracking-tighter text-attune-starlight md:text-8xl lg:text-9xl"
        >
          MASTER ANY&nbsp;SKILL.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-attune-green sm:text-sm"
        >
          The Ecological Approach to High Performance.
        </motion.p>

        {/* ─── Authority Bento Grid ─── */}
        <div className="mt-20 grid w-full gap-4 md:grid-cols-3">
          {/* Card 1 — Manifesto Video */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="glass group flex flex-col items-center justify-center gap-6 rounded-2xl p-8"
          >
            <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-attune-void/60 ring-1 ring-white/5 transition-colors group-hover:ring-attune-green/20">
              <div className="flex size-14 items-center justify-center rounded-full bg-attune-green/10 text-attune-green transition-transform group-hover:scale-110">
                <Play className="size-6 fill-current" />
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full gap-2 text-attune-starlight/70 hover:text-attune-green"
            >
              Watch the Manifesto
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>

          {/* Card 2 — Foundations Course */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="glass flex flex-col items-center justify-between gap-6 rounded-2xl border-attune-green/10 p-8"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-green/60">
                Self-paced Course
              </span>
              <h3 className="font-display text-2xl font-bold text-attune-starlight">
                Foundations
              </h3>
              <p className="text-sm leading-relaxed text-attune-starlight/40">
                The complete ecological framework for acquiring any skill — faster, deeper, and on your own terms.
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <span className="font-mono text-lg font-semibold text-attune-starlight/70">
                $97
              </span>
              <Button className="relative w-full bg-attune-green font-semibold text-attune-void shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-shadow hover:bg-attune-green/90 hover:shadow-[0_0_30px_rgba(0,255,148,0.45)]">
                START HERE
              </Button>
            </div>
          </motion.div>

          {/* Card 3 — Attune OS Waitlist */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="glass flex flex-col items-center justify-between gap-6 rounded-2xl p-8"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-purple/80">
                Coming Soon
              </span>
              <h3 className="font-display text-2xl font-bold text-attune-starlight">
                Attune&nbsp;OS
              </h3>
              <p className="text-sm leading-relaxed text-attune-starlight/40">
                Your AI-powered practice companion — adaptive drills, journaling, and real-time feedback loops.
              </p>
            </div>

            {submitted ? (
              <p className="flex items-center gap-2 font-mono text-xs text-attune-green">
                <Loader2 className="size-3 animate-spin" />
                You&apos;re on the list.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubmitted(true);
                }}
                className="flex w-full flex-col gap-2"
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-white/5 bg-attune-void/60 text-sm text-attune-starlight placeholder:text-attune-starlight/25"
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full border-attune-purple/40 text-attune-purple hover:border-attune-purple hover:bg-attune-purple/10"
                >
                  Join Waitlist
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
