"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Eye,
  Target,
  Layers,
  Waypoints,
  Sparkles,
  Zap,
  Shield,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

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

const modules = [
  {
    number: "01",
    icon: Eye,
    title: "Direct Perception",
    subtitle: "See What Others Can't",
    description:
      "Gibson's revolution: you don't construct reality from sensory data — you perceive affordances directly. This module rewires how you see your domain, replacing mental models with ecological awareness.",
    outcomes: [
      "Identify affordances invisible to untrained perceivers",
      "Distinguish signal from noise in real-time",
      "Develop perceptual attunement protocols",
    ],
  },
  {
    number: "02",
    icon: Target,
    title: "Perception-Action Coupling",
    subtitle: "Close the Loop",
    description:
      "Skill isn't knowledge stored in your head — it's the tight coupling between what you perceive and how you act. Learn to collapse the gap between seeing and doing until they become one seamless loop.",
    outcomes: [
      "Design coupling drills for any domain",
      "Eliminate the 'thinking gap' in performance",
      "Build automatic, environment-responsive action",
    ],
  },
  {
    number: "03",
    icon: Layers,
    title: "Constraints-Led Approach",
    subtitle: "Architect Your Environment",
    description:
      "Stop prescribing solutions. Start manipulating constraints. Newell's framework — task, environment, organism — gives you the levers to engineer self-organizing skill acquisition.",
    outcomes: [
      "Master the 3-constraint manipulation model",
      "Design practice sessions that solve themselves",
      "Remove degrees of freedom strategically",
    ],
  },
  {
    number: "04",
    icon: Waypoints,
    title: "Representative Learning Design",
    subtitle: "Practice That Transfers",
    description:
      "Most practice is junk. It doesn't transfer because it doesn't represent the performance environment. Learn to design practice that carries over — every rep counts because every rep is real.",
    outcomes: [
      "Audit your current practice for representativeness",
      "Build transfer-guaranteed training environments",
      "Eliminate dead reps permanently",
    ],
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Self-Organization & Attunement",
    subtitle: "Let Mastery Emerge",
    description:
      "The final shift: stop forcing. Let solutions self-organize from the interaction between you and your environment. This is where ecological mastery becomes second nature — where you stop processing and start attuning.",
    outcomes: [
      "Recognize emergent skill patterns in real-time",
      "Trust the ecological process over rigid instruction",
      "Build lifelong adaptive expertise",
    ],
  },
];

const testimonials = [
  {
    quote:
      "I've spent 15 years coaching and never understood why some athletes 'get it' faster. This framework finally explains it — and gives you the tools to engineer it.",
    name: "Performance Coach",
    role: "D1 Athletics",
  },
  {
    quote:
      "Stopped overcomplicating my practice sessions overnight. The constraints-led approach alone was worth 10x the price.",
    name: "Skill Acquisition Researcher",
    role: "Applied Sport Science",
  },
  {
    quote:
      "This isn't another productivity course. It's a completely different operating system for how you learn. Period.",
    name: "Self-Directed Learner",
    role: "Software Engineer → BJJ Competitor",
  },
];

function ModuleCard({
  mod,
  index,
}: {
  mod: (typeof modules)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = mod.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.97 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/6 bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-attune-green/20 sm:p-10"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-attune-green blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-[0.08]" />

      <div className="relative">
        {/* Module number + icon */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-attune-green/15 bg-attune-green/5 transition-colors duration-500 group-hover:border-attune-green/30 group-hover:bg-attune-green/10">
            <Icon className="size-6 text-attune-green/70 transition-colors duration-500 group-hover:text-attune-green" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-green/50">
              Module {mod.number}
            </span>
            <h3 className="font-display text-xl font-bold tracking-tight text-attune-starlight sm:text-2xl">
              {mod.title}
            </h3>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-attune-green/60">
          {mod.subtitle}
        </p>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-attune-starlight/45">
          {mod.description}
        </p>

        {/* Divider */}
        <div className="mb-5 h-px w-full bg-linear-to-r from-white/6 to-transparent" />

        {/* Outcomes */}
        <ul className="space-y-2.5">
          {mod.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-2.5 text-sm text-attune-starlight/55"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-attune-green/60" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function FoundationsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const isPricingInView = useInView(pricingRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headlineYRaw = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineY = useSpring(headlineYRaw, SPRING);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="noise-overlay relative min-h-screen bg-attune-void text-attune-starlight">
      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[60%] w-[80%] -translate-x-1/2 rounded-full bg-attune-green blur-[200px] opacity-[0.03]" />
        </div>

        <motion.div
          style={{ y: headlineY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32 sm:px-10 lg:px-16"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-attune-green/20 bg-attune-green/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-green">
                <Zap className="size-3" />
                Attune Foundations — The Course
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-authority mt-8 max-w-4xl text-5xl font-black text-attune-starlight will-change-transform sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            >
              STOP PROCESSING.
              <br />
              <span className="text-attune-green text-glow-green">
                START ATTUNING.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-attune-starlight/50 sm:text-lg"
            >
              The complete ecological framework for acquiring any skill — faster,
              deeper, on your terms. Five modules. One paradigm shift. Lifetime
              mastery.
            </motion.p>

            {/* CTA + Price hint */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="group/cta gap-2.5 bg-attune-green px-10 text-base font-bold text-attune-void shadow-[0_0_30px_rgba(0,255,148,0.35)] transition-all duration-300 hover:bg-attune-green/90 hover:shadow-[0_0_50px_rgba(0,255,148,0.5)]"
              >
                <a href="#pricing">
                  INITIALIZE MASTERY — $97
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                </a>
              </Button>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/30">
                One-time. Lifetime access.
              </span>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={fadeUp}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="size-5 text-attune-starlight/20" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          THE PROBLEM
          ═══════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="mb-8 inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/25">
              ── The Problem ──
            </span>

            <h2 className="text-authority mb-8 text-3xl font-bold text-attune-starlight sm:text-4xl md:text-5xl">
              You&apos;ve been taught to learn{" "}
              <span className="text-attune-starlight/30">wrong.</span>
            </h2>

            <div className="mx-auto max-w-2xl space-y-6 text-base leading-relaxed text-attune-starlight/45">
              <p>
                Deliberate practice. 10,000 hours. Deconstructing skills into
                isolated drills. The entire skill acquisition industry is built on
                a model that treats your brain like a computer and your body like
                a machine.
              </p>
              <p>
                <span className="text-attune-starlight/70">It&apos;s wrong.</span>{" "}
                Ecological psychology — the science of perception and action —
                proved decades ago that skill doesn&apos;t live in your head. It
                lives in the relationship between you and your environment.
              </p>
              <p>
                The best coaches in the world already know this. Elite military
                trainers know this. World-class athletes know this.{" "}
                <span className="text-attune-green/80">
                  Now you will too.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THE 5 MODULES
          ═══════════════════════════════════════ */}
      <section className="relative pb-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[20%] h-[60%] w-[80%] -translate-x-1/2 rounded-full bg-attune-green blur-[250px] opacity-[0.02]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-attune-green/20 bg-attune-green/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-green">
              <Layers className="size-3" />
              5 Modules — The Ecological Framework
            </span>
            <h2 className="text-authority mt-6 text-4xl font-black text-attune-starlight sm:text-5xl md:text-6xl">
              THE{" "}
              <span className="text-attune-green text-glow-green">
                ARCHITECTURE.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-attune-starlight/40">
              60 years of ecological science. Distilled into five modules.
              <br />
              Each one builds on the last. All of them change everything.
            </p>
          </motion.div>

          {/* Module cards */}
          <div className="grid gap-6 lg:grid-cols-2">
            {modules.map((mod, i) => (
              <ModuleCard key={mod.number} mod={mod} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT'S INCLUDED
          ═══════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h2 className="text-authority mb-16 text-3xl font-bold text-attune-starlight sm:text-4xl md:text-5xl">
              EVERYTHING YOU GET.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              "5 deep-dive ecological modules",
              "Perception-action coupling drills",
              "Constraints manipulation playbook",
              "Representative learning design templates",
              "Self-organization protocols",
              "Affordance identification exercises",
              "Domain-agnostic — works for any skill",
              "Lifetime access + all future updates",
            ].map((item) => (
              <motion.div
                key={item}
                variants={scaleIn}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a0a0a] px-5 py-4"
              >
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-attune-green/10">
                  <Check className="size-3.5 text-attune-green" />
                </div>
                <span className="text-sm text-attune-starlight/60">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SOCIAL PROOF
          ═══════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-attune-green/10 to-transparent" />

        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/25">
              ── Signal from the Field ──
            </span>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass rounded-2xl p-7"
              >
                <p className="mb-6 text-sm leading-relaxed text-attune-starlight/55">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-mono text-xs font-medium text-attune-starlight/70">
                    {t.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/30">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRICING SECTION
          ═══════════════════════════════════════ */}
      <section id="pricing" className="relative py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-attune-green/15 to-transparent" />

        {/* Background emphasis */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-attune-green blur-[250px] opacity-[0.03]" />
        </div>

        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center"
          >
            <h2 className="text-authority text-4xl font-black text-attune-starlight sm:text-5xl md:text-6xl">
              ONE INVESTMENT.
              <br />
              <span className="text-attune-green text-glow-green">
                PERMANENT UPGRADE.
              </span>
            </h2>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            ref={pricingRef}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={
              isPricingInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 60, scale: 0.96 }
            }
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glow-green-lg relative overflow-hidden rounded-3xl border border-attune-green/25 bg-[#0a0a0a]"
          >
            {/* Glow effects */}
            <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-attune-green blur-3xl opacity-[0.15]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-attune-green blur-3xl opacity-[0.15]" />

            {/* Top accent */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-green/50 to-transparent" />

            <div className="relative px-8 py-12 sm:px-14 sm:py-16">
              {/* Badge */}
              <div className="mb-8 flex items-center justify-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-attune-green/25 bg-attune-green/10">
                  <Zap className="size-7 text-attune-green" />
                </div>
              </div>

              <div className="text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-green">
                  Attune Foundations
                </span>
                <h3 className="text-authority mt-2 text-3xl font-black text-attune-starlight sm:text-4xl">
                  THE COMPLETE FRAMEWORK
                </h3>

                {/* Price */}
                <div className="mt-8 flex items-baseline justify-center gap-2">
                  <span className="text-authority text-7xl font-black tracking-tight text-attune-starlight sm:text-8xl">
                    $97
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-attune-starlight/30">
                    one-time
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/25">
                  No subscriptions. No upsells. Just the work.
                </p>

                {/* Divider */}
                <div className="mx-auto my-8 h-px w-full max-w-sm bg-linear-to-r from-transparent via-attune-green/20 to-transparent" />

                {/* Key inclusions */}
                <div className="mx-auto mb-10 grid max-w-md gap-3 text-left sm:grid-cols-2">
                  {[
                    "5 Ecological Modules",
                    "Coupling Drills",
                    "Constraints Playbook",
                    "Learning Design Templates",
                    "Self-Organization Protocols",
                    "Lifetime Access + Updates",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-attune-starlight/55"
                    >
                      <div className="size-1.5 shrink-0 rounded-full bg-attune-green" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="group/init w-full max-w-sm gap-2.5 bg-attune-green py-7 text-lg font-black text-attune-void shadow-[0_0_40px_rgba(0,255,148,0.4)] transition-all duration-300 hover:bg-attune-green/90 hover:shadow-[0_0_80px_rgba(0,255,148,0.6)]"
                >
                  INITIALIZE MASTERY
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/init:translate-x-1" />
                </Button>

                {/* Trust signals */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <Shield className="size-3 text-attune-starlight/20" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-attune-starlight/20">
                      Secure Checkout
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="size-3 text-attune-starlight/20" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-attune-starlight/20">
                      Instant Access
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-green/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-authority mb-6 text-4xl font-black text-attune-starlight sm:text-5xl md:text-6xl">
              THE WORLD DOESN&apos;T NEED
              <br />
              MORE{" "}
              <span className="text-attune-starlight/30">INFORMATION.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-attune-starlight/45">
              It needs people who can{" "}
              <span className="text-attune-green/80">perceive</span> what others
              miss, <span className="text-attune-green/80">act</span> where
              others hesitate, and{" "}
              <span className="text-attune-green/80">adapt</span> where others
              break. That&apos;s what Foundations builds.
            </p>

            <Button
              asChild
              size="lg"
              className="group/final gap-2.5 bg-attune-green px-12 text-base font-bold text-attune-void shadow-[0_0_30px_rgba(0,255,148,0.35)] transition-all duration-300 hover:bg-attune-green/90 hover:shadow-[0_0_50px_rgba(0,255,148,0.5)]"
            >
              <a href="#pricing">
                INITIALIZE MASTERY — $97
                <ArrowRight className="size-5 transition-transform duration-300 group-hover/final:translate-x-0.5" />
              </a>
            </Button>

            <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/15">
              &copy; 2026 Attune. All rights reserved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back-to-homepage link */}
      <div className="pb-12 text-center">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20 transition-colors hover:text-attune-green/60"
        >
          ← Back to Attune Universe
        </Link>
      </div>
    </main>
  );
}
