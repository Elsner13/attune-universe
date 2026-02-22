"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Radio,
  Zap,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

/* ─── Brand Color ─── */
const YELLOW = "#FFD600";

const SUBSTACK_URL = "https://findthesignal.substack.com";

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

/* ─── Published Issues ─── */
const issues = [
  {
    id: "01",
    date: "2026.02.19",
    tag: "ARCHETYPE",
    title: "Fire Horse: Ecological Rebirth",
    excerpt:
      "What the Chinese zodiac's rarest archetype reveals about human system change — and why most 'transformation' is just rearranging deck chairs.",
    strength: 98,
    url: "https://findthesignal.substack.com/p/fire-horse-ecological-rebirth",
  },
  {
    id: "02",
    date: "2026.02.17",
    tag: "STRATEGY",
    title: "Monk Mode Is a Lie (And Why Wizards Win)",
    excerpt:
      "The isolation model of mastery misunderstands how ecological systems actually develop expertise. The wizard beats the monk. Here's the science.",
    strength: 96,
    url: "https://findthesignal.substack.com/p/monk-mode-is-a-lie-and-why-wizards",
  },
  {
    id: "03",
    date: "2026.02.11",
    tag: "NEUROSCIENCE",
    title: "The Brain's Twinkling Dance",
    excerpt:
      "Kelso's coordination dynamics, phase transitions, and why the chaos before a breakthrough is not failure — it's the system reorganizing at a higher level.",
    strength: 94,
    url: "https://findthesignal.substack.com/p/the-brains-twinkling-dance",
  },
  {
    id: "04",
    date: "2026.02.09",
    tag: "CULTURE",
    title: "When Questioning Becomes Treason",
    excerpt:
      "How institutions use social punishment to protect dead paradigms — and what ecological thinkers have always done about it.",
    strength: 93,
    url: "https://findthesignal.substack.com/p/when-questioning-becomes-treason",
  },
  {
    id: "05",
    date: "2026.02.06",
    tag: "PERCEPTION",
    title: "The Flatlanders: Why Most People Think in One Dimension",
    excerpt:
      "Abbott's Flatland as a perceptual allegory. Why experts don't know more — they perceive differently. And how to upgrade your dimensionality.",
    strength: 95,
    url: "https://findthesignal.substack.com/p/the-flatlanders-why-most-people-think",
  },
  {
    id: "06",
    date: "2026.02.03",
    tag: "SKILL ACQ.",
    title: "The Sovereign's First Skill: Perceiving What Others Cannot",
    excerpt:
      "Gibson's affordance theory applied to competitive domains. The first mark of expertise is not what you can do — it's what you can see.",
    strength: 97,
    url: "https://findthesignal.substack.com/p/the-sovereigns-first-skill-perceiving",
  },
];

function SignalBar({ strength }: { strength: number }) {
  const filled = Math.round((strength / 100) * 10);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-2.5 w-1 rounded-[1px]"
          style={{
            backgroundColor: i < filled ? `${YELLOW}cc` : "rgba(255,255,255,0.06)",
          }}
        />
      ))}
      <span
        className="ml-1.5 font-mono text-[10px] tabular-nums"
        style={{ color: `${YELLOW}80` }}
      >
        {strength}%
      </span>
    </div>
  );
}

export function SignalClient() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "signal-page" }),
      });
    } catch {
      // Continue even if API fails — redirect to Substack
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
        <Button
          asChild
          size="sm"
          className="gap-1.5 text-xs font-bold text-attune-void"
          style={{ backgroundColor: YELLOW, boxShadow: `0 0 20px ${YELLOW}50` }}
        >
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
            READ ON SUBSTACK
          </a>
        </Button>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${YELLOW}07 0%, transparent 70%)`,
          }}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center sm:px-10 lg:px-16"
        >
          <motion.span
            variants={fadeIn}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{
              borderColor: `${YELLOW}30`,
              backgroundColor: `${YELLOW}08`,
              color: YELLOW,
            }}
          >
            <Radio className="size-3" />
            Free Weekly Newsletter
          </motion.span>

          <motion.h1
            variants={fadeIn}
            className="max-w-4xl text-5xl font-black text-attune-starlight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ lineHeight: "0.9", letterSpacing: "-0.02em" }}
          >
            THE{" "}
            <span
              style={{
                color: YELLOW,
                textShadow: `0 0 40px ${YELLOW}55, 0 0 80px ${YELLOW}20`,
              }}
            >
              SIGNAL.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mt-8 max-w-2xl text-base leading-relaxed text-attune-starlight/50 sm:text-lg"
          >
            Filtering the noise of conventional wisdom to find what actually works. Weekly
            intelligence briefs on ecological dynamics, skill acquisition, and the science of
            how experts actually become experts.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeIn} className="mt-10 flex items-center gap-8">
            {[
              { value: "538+", label: "Subscribers" },
              { value: "Weekly", label: "Frequency" },
              { value: "Free", label: "Always" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-mono text-2xl font-bold tabular-nums"
                  style={{ color: YELLOW }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-attune-starlight/30">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Subscribe form */}
          <motion.div variants={fadeIn} className="mt-10 w-full max-w-lg">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 rounded-2xl border px-6 py-8"
                style={{ borderColor: `${YELLOW}25`, backgroundColor: `${YELLOW}08` }}
              >
                <Zap className="size-6" style={{ color: YELLOW }} />
                <p className="font-mono text-sm" style={{ color: YELLOW }}>
                  Signal locked in. Check your inbox.
                </p>
                <a
                  href={SUBSTACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/40 hover:text-attune-starlight/80 transition-colors"
                >
                  Read past issues on Substack
                  <ExternalLink className="size-3" />
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-attune-starlight/25"
                  />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-white/10 bg-attune-void pl-9 text-sm text-attune-starlight placeholder:text-attune-starlight/25 focus-visible:ring-1"
                    style={{ "--tw-ring-color": `${YELLOW}30` } as React.CSSProperties}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="gap-2 font-bold text-attune-void transition-all duration-300"
                  style={{
                    backgroundColor: YELLOW,
                    boxShadow: `0 0 30px ${YELLOW}40`,
                  }}
                >
                  {loading ? "SUBSCRIBING..." : "GET THE SIGNAL"}
                  <ArrowRight className="size-5" />
                </Button>
              </form>
            )}
            {!submitted && (
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                Free forever. No spam. Unsubscribe anytime.
              </p>
            )}
          </motion.div>
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${YELLOW}25, transparent)`,
          }}
        />
      </section>

      {/* ── What Is The Signal ── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-10 md:grid-cols-3"
          >
            {[
              {
                title: "Pure Signal",
                description:
                  "Every issue is built around one idea, fully developed. Not a listicle. Not a roundup. One signal, extracted from the noise and refined until it's sharp enough to cut.",
              },
              {
                title: "Ecological Lens",
                description:
                  "Every topic — culture, neuroscience, strategy, performance — filtered through the framework of ecological psychology and skill acquisition science.",
              },
              {
                title: "Immediate Use",
                description:
                  "Every issue ends with a specific, actionable protocol. You leave with something you can apply in your domain within 24 hours.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-7"
              >
                <div
                  className="mb-3 size-1.5 rounded-full"
                  style={{ backgroundColor: YELLOW }}
                />
                <h3 className="mb-3 font-display text-lg font-bold text-attune-starlight">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-attune-starlight/40">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Issue Archive ── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div
              variants={fadeIn}
              className="mb-2 flex items-center justify-between"
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: `${YELLOW}50` }}
              >
                ── Intelligence Briefs ──
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-attune-starlight/30">
                <span
                  className="size-1.5 animate-pulse rounded-full"
                  style={{ backgroundColor: YELLOW }}
                />
                Live Feed
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="space-y-3"
          >
            {issues.map((issue) => (
              <motion.a
                key={issue.id}
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                className="group block overflow-hidden rounded-xl border border-white/5 bg-[#080808] p-5 transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${YELLOW}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] tabular-nums tracking-wider text-attune-starlight/20">
                    {issue.date}
                  </span>
                  <span
                    className="rounded-sm px-2 py-0.5 font-mono text-[8px] font-medium uppercase tracking-[0.2em]"
                    style={{
                      backgroundColor: `${YELLOW}0a`,
                      color: `${YELLOW}70`,
                    }}
                  >
                    {issue.tag}
                  </span>
                </div>
                <h4 className="mb-2 font-mono text-sm font-medium leading-snug text-attune-starlight/70 transition-colors duration-300 group-hover:text-attune-starlight/95">
                  {issue.title}
                </h4>
                <p className="mb-4 text-xs leading-relaxed text-attune-starlight/35">
                  {issue.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-attune-starlight/15">
                    Signal Strength
                  </span>
                  <SignalBar strength={issue.strength} />
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 text-center"
          >
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-attune-starlight/30 transition-colors duration-300 hover:text-attune-starlight/70"
            >
              Read all issues on Substack
              <ExternalLink className="size-3" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Subscribe CTA ── */}
      <section className="py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative overflow-hidden rounded-3xl border bg-[#080808]"
            style={{
              borderColor: `${YELLOW}20`,
              boxShadow: `0 0 60px ${YELLOW}08`,
            }}
          >
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${YELLOW}50, transparent)`,
              }}
            />
            <div className="relative px-8 py-14 sm:px-14 sm:py-16">
              <motion.div variants={fadeIn} className="mb-6 flex items-center gap-3">
                <div
                  className="flex size-12 items-center justify-center rounded-2xl border"
                  style={{ borderColor: `${YELLOW}25`, backgroundColor: `${YELLOW}0a` }}
                >
                  <Zap className="size-6" style={{ color: YELLOW }} />
                </div>
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: `${YELLOW}80` }}
                  >
                    Free Newsletter
                  </span>
                  <h4 className="font-display text-2xl font-bold tracking-tight text-attune-starlight">
                    Signal/Noise
                  </h4>
                </div>
              </motion.div>
              <motion.h2
                variants={fadeIn}
                className="mb-4 text-2xl font-bold leading-tight text-attune-starlight/90 sm:text-3xl"
              >
                DECODE THE UNIVERSE.
                <br />
                <span style={{ color: YELLOW }}>JOIN 538+ MASTERING THE SIGNAL.</span>
              </motion.h2>
              <motion.p variants={fadeIn} className="mb-8 max-w-lg text-sm leading-relaxed text-attune-starlight/40">
                Weekly intelligence briefs on ecological dynamics, skill acquisition, and the
                science of learning. No fluff. Pure signal.
              </motion.p>

              <motion.div variants={fadeIn}>
                {submitted ? (
                  <div
                    className="flex items-center justify-center gap-2 rounded-xl border px-5 py-4"
                    style={{ borderColor: `${YELLOW}25`, backgroundColor: `${YELLOW}08` }}
                  >
                    <Zap className="size-4" style={{ color: YELLOW }} />
                    <span className="font-mono text-sm" style={{ color: YELLOW }}>
                      Signal locked in. Check your inbox.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
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
                      style={{
                        backgroundColor: YELLOW,
                        boxShadow: `0 0 30px ${YELLOW}45`,
                      }}
                    >
                      SUBSCRIBE TO SIGNAL
                      <ArrowRight className="size-5" />
                    </Button>
                  </form>
                )}
                {!submitted && (
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                    Free forever. Unsubscribe anytime.
                  </p>
                )}
              </motion.div>
            </div>
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${YELLOW}25, transparent)`,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Product Bridge ── */}
      <section className="pb-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/20"
          >
            ── Go Deeper ──
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2"
          >
            <motion.div
              variants={fadeIn}
              className="group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 transition-colors duration-300 hover:border-attune-green/20"
            >
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-attune-green">
                The Foundation
              </span>
              <h4 className="mb-2 font-display text-xl font-bold text-attune-starlight">
                Foundations Course
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-attune-starlight/40">
                The complete ecological framework. 6 modules. Lifetime access. This is where the
                paradigm shift happens.
              </p>
              <Link
                href="/foundations"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-attune-green/70 transition-colors duration-300 hover:text-attune-green"
              >
                Enter — $97 <ArrowRight className="size-3" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 transition-colors duration-300 hover:border-attune-purple/20"
            >
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-attune-purple">
                The Cohort
              </span>
              <h4 className="mb-2 font-display text-xl font-bold text-attune-starlight">
                The Attractor
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-attune-starlight/40">
                30 days. One AI companion. One cohort. Make ecological mastery your default
                state.
              </p>
              <Link
                href="/attractor"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-attune-purple/70 transition-colors duration-300 hover:text-attune-purple"
              >
                Secure your seat — $297 <ArrowRight className="size-3" />
              </Link>
            </motion.div>
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
