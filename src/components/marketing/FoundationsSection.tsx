"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Target, Eye, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

const pillars = [
  {
    icon: Eye,
    year: "1966",
    title: "Direct Perception",
    description:
      "Gibson proved we don't construct reality from sensory data — we perceive affordances directly. The information is already in the environment, waiting to be picked up.",
  },
  {
    icon: Target,
    year: "1979",
    title: "Affordances",
    description:
      "The world offers possibilities for action. A skilled performer doesn't think — they attune to what the environment affords. This changes everything about practice.",
  },
  {
    icon: Layers,
    year: "2000s",
    title: "Constraints-Led Approach",
    description:
      "Newell, Davids, and the ecological dynamics movement turned Gibson's theory into a training methodology. Manipulate constraints. Let solutions self-organize.",
  },
];

const includes = [
  "6 deep-dive modules",
  "Perception-action coupling drills",
  "Constraints manipulation playbook",
  "Representative learning design",
  "Self-organization protocols",
  "Lifetime access + updates",
];

export function FoundationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineYRaw = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const headlineY = useSpring(headlineYRaw, SPRING);

  return (
    <section ref={sectionRef} className="relative min-h-[250vh]">
      {/* ═══════════════════════════════════════
          Sticky "THE LINEAGE." watermark headline
          ═══════════════════════════════════════ */}
      <div className="sticky top-0 z-0 flex h-screen items-center overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <motion.h2
            style={{ y: headlineY }}
            className="text-authority select-none text-[clamp(3.5rem,14vw,16rem)] font-black leading-[0.85] text-attune-starlight/4 will-change-transform"
          >
            THE
            <br />
            LINEAGE.
          </motion.h2>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-attune-green/10 to-transparent" />
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
            className="mb-24 max-w-2xl"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-attune-green/20 bg-attune-green/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-green">
              <BookOpen className="size-3" />
              Origin Story
            </span>
            <h3 className="text-authority mb-6 text-4xl font-bold text-attune-starlight sm:text-5xl lg:text-6xl">
              Before the method,
              <br />
              <span className="text-attune-green text-glow-green">
                there was the science.
              </span>
            </h3>
            <p className="text-lg leading-relaxed text-attune-starlight/50">
              Ecological Psychology didn&apos;t start in a lab. It started on the
              battlefields of WWII, where James Gibson realized that human
              perception is not a passive process — it&apos;s an active, embodied
              dialogue with the environment.
            </p>
          </motion.div>

          {/* History pillars */}
          <div className="mb-32 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/6 bg-[#0a0a0a] p-8 transition-colors duration-500 hover:border-attune-green/15"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-attune-green/3 blur-2xl transition-all duration-500 group-hover:bg-attune-green/6" />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-attune-green/8">
                      <pillar.icon className="size-5 text-attune-green/70" />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-attune-starlight/25">
                      {pillar.year}
                    </span>
                  </div>
                  <h4 className="mb-3 font-display text-xl font-bold text-attune-starlight">
                    {pillar.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-attune-starlight/40">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bridge text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
            className="mb-20 text-center"
          >
            <p className="mx-auto max-w-xl font-mono text-xs uppercase tracking-[0.3em] text-attune-starlight/30">
              60 years of science. Distilled into one framework.
              <br />
              <span className="text-attune-green/60">
                Now it&apos;s yours.
              </span>
            </p>
          </motion.div>

          {/* ═══════════════════════════════════
              Premium Foundations Course Offer Card
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
            className="glow-green-lg relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-attune-green/20 bg-[#0c0c0c]"
          >
            {/* Glow aura */}
            <div className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-attune-green/8 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 size-60 rounded-full bg-attune-green/5 blur-[80px]" />

            {/* Top accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-green/40 to-transparent" />

            <div className="relative px-8 py-10 sm:px-12 sm:py-14">
              {/* Badge */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-attune-green/20 bg-attune-green/10">
                  <BookOpen className="size-6 text-attune-green" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-green">
                    The Foundation
                  </span>
                  <h3 className="font-display text-2xl font-bold text-attune-starlight sm:text-3xl">
                    Foundations Course
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="mb-8 max-w-lg text-base leading-relaxed text-attune-starlight/50">
                Master the ecological framework that elite coaches, military
                operators, and world-class athletes use to accelerate skill
                acquisition. This isn&apos;t theory — it&apos;s a system.
              </p>

              {/* What's inside */}
              <div className="mb-10 grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-attune-starlight/60"
                  >
                    <div className="size-1 shrink-0 rounded-full bg-attune-green" />
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
                      $97
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/30">
                      one-time access
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-attune-starlight/25">
                    No subscriptions. No upsells. Just the work.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="gap-2 bg-attune-green px-8 text-base font-bold text-attune-void shadow-[0_0_30px_rgba(0,255,148,0.35)] transition-all duration-300 hover:bg-attune-green/90 hover:shadow-[0_0_50px_rgba(0,255,148,0.5)]"
                >
                  SECURE ACCESS
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-green/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
