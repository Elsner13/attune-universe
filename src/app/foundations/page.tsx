"use client";

import { motion, type Variants } from "framer-motion";
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
  Orbit,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ─── Electric Green — sister-brand accent ─── */
const ELECTRIC = "#00FFB2";
const CHECKOUT_URL = "https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const modules = [
  {
    number: "01",
    icon: Eye,
    title: "Direct Perception",
    subtitle: "See What Others Miss",
    description:
      "Gibson's revolution: you don't construct reality — you perceive affordances directly. Rewire how you see your domain.",
    span: "lg:col-span-4",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Affordances & Information",
    subtitle: "Read the Environment",
    description:
      "The world offers possibilities for action. Learn to detect the information that specifies what your environment affords.",
    span: "lg:col-span-4",
  },
  {
    number: "03",
    icon: Target,
    title: "Perception-Action Coupling",
    subtitle: "Close the Loop",
    description:
      "Skill is the tight coupling between perceiving and acting. Collapse the gap until they become one seamless loop.",
    span: "lg:col-span-4",
  },
  {
    number: "04",
    icon: Layers,
    title: "Constraints-Led Approach",
    subtitle: "Architect Your Practice",
    description:
      "Stop prescribing solutions. Manipulate task, environment, and organism constraints to let skill self-organize.",
    span: "lg:col-span-6",
  },
  {
    number: "05",
    icon: Waypoints,
    title: "Representative Learning Design",
    subtitle: "Practice That Transfers",
    description:
      "Most practice doesn't transfer. Design environments that match performance demands so every rep counts.",
    span: "lg:col-span-6",
  },
  {
    number: "06",
    icon: Sparkles,
    title: "Self-Organization & Attunement",
    subtitle: "Let Mastery Emerge",
    description:
      "Stop forcing. Let solutions self-organize from your interaction with the environment. This is ecological mastery.",
    span: "lg:col-span-12",
  },
];

const includes = [
  "6 deep-dive ecological modules",
  "Perception-action coupling drills",
  "Constraints manipulation playbook",
  "Representative learning design templates",
  "Self-organization protocols",
  "Affordance identification exercises",
  "Domain-agnostic — works for any skill",
  "Lifetime access + all future updates",
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
    role: "Software → BJJ Competitor",
  },
];

export default function FoundationsPage() {
  return (
    <main className="relative min-h-screen bg-attune-void text-attune-starlight">
      {/* ════════════════════════════
          TOP NAV BAR
          ════════════════════════════ */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.04] px-6 py-3 backdrop-blur-md sm:px-10 lg:px-16" style={{ background: "rgba(0,0,0,0.6)" }}>
        <Link href="/" className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/40 transition-colors duration-300 hover:text-attune-starlight/80">
          <ArrowRight className="size-3 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Attune Universe
        </Link>
        <Button
          asChild
          size="sm"
          className="gap-1.5 text-xs font-bold text-attune-void"
          style={{ backgroundColor: ELECTRIC }}
        >
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            ENROLL — $97
          </a>
        </Button>
      </nav>

      {/* ════════════════════════════
          HERO
          ════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${ELECTRIC}08 0%, transparent 70%)`,
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
            style={{
              borderColor: `${ELECTRIC}30`,
              backgroundColor: `${ELECTRIC}08`,
              color: ELECTRIC,
            }}
          >
            <Zap className="size-3" />
            Attune Foundations
          </motion.span>

          <motion.h1
            variants={fadeIn}
            className="text-authority max-w-4xl text-5xl font-black text-attune-starlight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            STOP PROCESSING.
            <br />
            <span style={{ color: ELECTRIC }}>START ATTUNING.</span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mt-6 max-w-2xl text-base leading-relaxed text-attune-starlight/50 sm:text-lg"
          >
            The complete ecological framework for acquiring any skill — faster,
            deeper, on your terms. Six modules. One paradigm shift. Lifetime
            mastery.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="gap-2.5 px-10 text-base font-bold text-attune-void"
              style={{
                backgroundColor: ELECTRIC,
                boxShadow: `0 0 30px ${ELECTRIC}50`,
              }}
            >
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                INITIALIZE FOUNDATIONS — $97
                <ArrowRight className="size-5" />
              </a>
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/30">
              One-time · Lifetime access
            </span>
          </motion.div>
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${ELECTRIC}20, transparent)`,
          }}
        />
      </section>

      {/* ════════════════════════════
          THE PROBLEM
          ════════════════════════════ */}
      <section className="py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16"
        >
          <motion.span
            variants={fadeIn}
            className="mb-8 inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/25"
          >
            ── The Problem ──
          </motion.span>

          <motion.h2
            variants={fadeIn}
            className="text-authority mb-8 text-3xl font-bold text-attune-starlight sm:text-4xl md:text-5xl"
          >
            You&apos;ve been taught to learn{" "}
            <span className="text-attune-starlight/25">wrong.</span>
          </motion.h2>

          <motion.div
            variants={fadeIn}
            className="space-y-5 text-base leading-relaxed text-attune-starlight/45"
          >
            <p>
              Deliberate practice. 10,000 hours. Deconstructing skills into
              isolated drills. The entire industry treats your brain like a
              computer and your body like a machine.
            </p>
            <p>
              <span className="text-attune-starlight/70">It&apos;s wrong.</span>{" "}
              Ecological psychology proved decades ago that skill doesn&apos;t
              live in your head — it lives in the relationship between you and
              your environment.
            </p>
            <p>
              Elite coaches know this. World-class athletes know this.{" "}
              <span style={{ color: `${ELECTRIC}cc` }}>Now you will too.</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════
          6 MODULES — BENTO GRID
          ════════════════════════════ */}
      <section className="relative pb-28">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${ELECTRIC}04 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
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
              style={{
                borderColor: `${ELECTRIC}25`,
                backgroundColor: `${ELECTRIC}08`,
                color: ELECTRIC,
              }}
            >
              <Orbit className="size-3" />
              System Architecture
            </motion.span>

            <motion.h2
              variants={fadeIn}
              className="text-authority mt-6 text-4xl font-black text-attune-starlight sm:text-5xl"
            >
              6 MODULES.{" "}
              <span style={{ color: ELECTRIC }}>ONE FRAMEWORK.</span>
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="mx-auto mt-4 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-attune-starlight/35"
            >
              Each module is a system component. Together they form the
              ecological operating layer.
            </motion.p>
          </motion.div>

          {/* ── Bento Grid ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-4 lg:grid-cols-12"
          >
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.number}
                  variants={fadeIn}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-7 transition-colors duration-400 hover:border-[${ELECTRIC}]/20 sm:p-8 ${mod.span}`}
                  style={
                    {
                      "--hover-border": `${ELECTRIC}30`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${ELECTRIC}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.06)";
                  }}
                >
                  <div className="relative flex h-full flex-col">
                    {/* Header */}
                    <div className="mb-5 flex items-center gap-3.5">
                      <div
                        className="flex size-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${ELECTRIC}0a` }}
                      >
                        <Icon
                          className="size-5"
                          style={{ color: `${ELECTRIC}90` }}
                        />
                      </div>
                      <div>
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: `${ELECTRIC}60` }}
                        >
                          Module {mod.number}
                        </span>
                        <h3 className="font-display text-lg font-bold tracking-tight text-attune-starlight">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p
                      className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: `${ELECTRIC}70` }}
                    >
                      {mod.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-attune-starlight/40">
                      {mod.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          WHAT'S INCLUDED
          ════════════════════════════ */}
      <section className="py-28">
        <div
          className="absolute inset-x-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, rgba(255,255,255,0.04), transparent)`,
          }}
        />

        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeIn}
            className="text-authority mb-14 text-center text-3xl font-bold text-attune-starlight sm:text-4xl"
          >
            EVERYTHING YOU GET.
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-3 sm:grid-cols-2"
          >
            {includes.map((item) => (
              <motion.div
                key={item}
                variants={fadeIn}
                className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-[#080808] px-5 py-4"
              >
                <div
                  className="flex size-6 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${ELECTRIC}12` }}
                >
                  <Check className="size-3.5" style={{ color: ELECTRIC }} />
                </div>
                <span className="text-sm text-attune-starlight/55">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          TESTIMONIALS
          ════════════════════════════ */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-10 block text-center font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/20"
          >
            ── Signal from the Field ──
          </motion.span>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-5 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeIn}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm"
              >
                <p className="mb-5 text-sm leading-relaxed text-attune-starlight/50">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-mono text-xs font-medium text-attune-starlight/65">
                  {t.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/25">
                  {t.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          PRICING
          ════════════════════════════ */}
      <section id="pricing" className="relative py-28">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${ELECTRIC}05 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeIn}
              className="text-authority mb-14 text-4xl font-black text-attune-starlight sm:text-5xl"
            >
              ONE INVESTMENT.
              <br />
              <span style={{ color: ELECTRIC }}>PERMANENT UPGRADE.</span>
            </motion.h2>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeIn}
            className="overflow-hidden rounded-3xl border bg-[#080808]"
            style={{
              borderColor: `${ELECTRIC}30`,
              boxShadow: `0 0 60px ${ELECTRIC}10, 0 0 120px ${ELECTRIC}06`,
            }}
          >
            {/* Top accent */}
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${ELECTRIC}60, transparent)`,
              }}
            />

            <div className="px-8 py-14 sm:px-14 sm:py-16">
              <div className="text-center">
                {/* Badge */}
                <div className="mb-8 flex justify-center">
                  <div
                    className="flex size-14 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: `${ELECTRIC}30`,
                      backgroundColor: `${ELECTRIC}10`,
                    }}
                  >
                    <Zap className="size-7" style={{ color: ELECTRIC }} />
                  </div>
                </div>

                <span
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: ELECTRIC }}
                >
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
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                  No subscriptions. No upsells. Just the work.
                </p>

                {/* Divider */}
                <div
                  className="mx-auto my-8 h-px w-full max-w-xs"
                  style={{
                    background: `linear-gradient(to right, transparent, ${ELECTRIC}20, transparent)`,
                  }}
                />

                {/* Inclusions */}
                <div className="mx-auto mb-10 grid max-w-md gap-2.5 text-left sm:grid-cols-2">
                  {[
                    "6 Ecological Modules",
                    "Coupling Drills",
                    "Constraints Playbook",
                    "Learning Design Templates",
                    "Self-Organization Protocols",
                    "Lifetime Access + Updates",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-attune-starlight/50"
                    >
                      <div
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: ELECTRIC }}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  asChild
                  size="lg"
                  className="w-full max-w-sm gap-2.5 py-7 text-lg font-black text-attune-void transition-all duration-300"
                  style={{
                    backgroundColor: ELECTRIC,
                    boxShadow: `0 0 40px ${ELECTRIC}50`,
                  }}
                >
                  <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                    INITIALIZE FOUNDATIONS
                    <ArrowRight className="size-5" />
                  </a>
                </Button>

                {/* Trust */}
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
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${ELECTRIC}30, transparent)`,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          FINAL CTA
          ════════════════════════════ */}
      <section className="py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16"
        >
          <motion.h2
            variants={fadeIn}
            className="text-authority mb-6 text-4xl font-black text-attune-starlight sm:text-5xl"
          >
            THE WORLD DOESN&apos;T NEED MORE{" "}
            <span className="text-attune-starlight/25">INFORMATION.</span>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-attune-starlight/40"
          >
            It needs people who can{" "}
            <span style={{ color: `${ELECTRIC}bb` }}>perceive</span> what others
            miss,{" "}
            <span style={{ color: `${ELECTRIC}bb` }}>act</span> where others
            hesitate, and{" "}
            <span style={{ color: `${ELECTRIC}bb` }}>adapt</span> where others
            break.
          </motion.p>

          <motion.div variants={fadeIn}>
            <Button
              asChild
              size="lg"
              className="gap-2.5 px-12 text-base font-bold text-attune-void"
              style={{
                backgroundColor: ELECTRIC,
                boxShadow: `0 0 30px ${ELECTRIC}45`,
              }}
            >
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                INITIALIZE FOUNDATIONS — $97
                <ArrowRight className="size-5" />
              </a>
            </Button>
          </motion.div>

          <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/12">
            &copy; 2026 Attune. All rights reserved.
          </p>
        </motion.div>
      </section>

      {/* Back link */}
      <div className="pb-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/30 transition-colors duration-300 hover:text-attune-starlight/70"
        >
          <ArrowRight className="size-3 rotate-180" />
          Back to Attune Universe
        </Link>
      </div>
    </main>
  );
}
