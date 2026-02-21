"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-24 pt-28 text-center sm:px-8 lg:px-12 lg:pt-36"
      >
        {/* ── Credibility Bar ── */}
        <motion.div
          variants={fadeUp}
          className="mb-16 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-starlight/40 sm:text-xs lg:mb-20"
        >
          2x NCAA National Champion{" "}
          <span className="text-attune-yellow/60">&middot;</span> Contributor to
          The Athletic &amp; ESPN{" "}
          <span className="text-attune-yellow/60">&middot;</span> 500+ Coaches
          &amp; Athletes Trained
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          variants={fadeUp}
          className="flex flex-col gap-2 text-5xl font-black uppercase leading-none tracking-widest text-attune-starlight will-change-transform sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          <span>EVERYTHING YOU KNOW</span>
          <span className="text-attune-yellow text-glow-yellow">
            ABOUT PRACTICE IS WRONG.
          </span>
        </motion.h1>

        {/* ── Subheadline ── */}
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-2xl text-base leading-relaxed text-attune-starlight/50 sm:text-lg"
        >
          Ecological dynamics is the science elite operators don&apos;t talk
          about. I used it to win two NCAA championships. Now I&apos;ve built
          the framework that teaches it.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="bg-attune-yellow px-8 font-semibold tracking-wide text-attune-void shadow-[0_0_24px_rgba(255,214,0,0.3)] transition-all duration-300 hover:bg-attune-yellow/90 hover:shadow-[0_0_36px_rgba(255,214,0,0.45)]"
          >
            <Link href="/foundations">
              ENTER FOUNDATIONS — $97
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-attune-starlight/15 px-8 font-semibold tracking-wide text-attune-starlight/80 transition-all duration-300 hover:border-attune-starlight/30 hover:bg-attune-starlight/5"
          >
            <Link href="#manifesto">READ THE MANIFESTO</Link>
          </Button>
        </motion.div>

        {/* ── Social Proof ── */}
        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-attune-starlight/30"
        >
          Join 538+ coaches, athletes, and learners already attuning.
        </motion.p>
      </motion.div>
    </section>
  );
}
