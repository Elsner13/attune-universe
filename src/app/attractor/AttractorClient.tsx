"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Radio,
  Brain,
  Cpu,
  GitBranch,
  Activity,
  Users,
  Calendar,
  Shield,
  Check,
  Zap,
  Lock,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ─── Brand Color ─── */
const PURPLE = "#7C3AED";

/* ─── Waitlist / Checkout ─── */
const ATTRACTOR_URL = "https://buy.stripe.com/test_7sY7sL75T2GV3CLgIrefC00"; // TODO: replace with live Attractor Stripe link

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

/* ─── Countdown ─── */
const COHORT_START = new Date("2026-03-02T00:00:00");

function useCountdown(target: Date) {
  const [rem, setRem] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setRem({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [target]);
  return rem;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ─── Data ─── */
const pillars = [
  {
    icon: Brain,
    title: "AI Skill Companion",
    description:
      "Custom-trained to your domain. Designs your ecological sessions, tracks your perception-action coupling, and synthesizes your weekly breakthroughs. Not a chatbot — a co-pilot.",
  },
  {
    icon: Activity,
    title: "Daily Constraint Challenges",
    description:
      "Every morning: a new ecological constraint designed to destabilize your current pattern and force emergence of the next one. Thirty days. Thirty phase transitions.",
  },
  {
    icon: Users,
    title: "Live Cohort Sessions",
    description:
      "Weekly synthesis calls where the cohort dissects each other's field reports. The pressure of being seen accelerates the attunement process in ways solo practice cannot.",
  },
  {
    icon: GitBranch,
    title: "Neural Skill Map",
    description:
      "Visual dashboard of your progression through the attractor landscape. See where your attractors are deep, where they're shallow, and where the next phase transition is building.",
  },
  {
    icon: Cpu,
    title: "Ecological Session Design",
    description:
      "Stop guessing at your practice design. The system generates representative, constraint-rich environments tuned to your specific domain and current developmental stage.",
  },
  {
    icon: Calendar,
    title: "30-Day Structured Arc",
    description:
      "Not a course. Not a community. A 30-day immersion with a defined beginning, middle, and end — designed to produce one measurable phase transition per week.",
  },
];

const testimonials = [
  {
    quote:
      "I've been coaching for 12 years. The Attractor compressed what would've taken me another 5 years of trial-and-error into 30 days. The AI companion alone is worth 10x the price.",
    name: "Marcus T.",
    role: "Head Strength Coach, D1 University",
    cohort: "Cohort 01",
  },
  {
    quote:
      "I went from conceptually understanding Ecological Dynamics to actually being able to design my practice sessions from the framework. That gap was the hard part. The Attractor closed it.",
    name: "Priya S.",
    role: "BJJ Black Belt & Performance Consultant",
    cohort: "Cohort 01",
  },
  {
    quote:
      "The daily constraint challenges broke patterns I didn't even know I was stuck in. By week 3 I was performing in ways I'd only seen in people with years more experience.",
    name: "James R.",
    role: "Software Engineer → Competitive Golfer",
    cohort: "Cohort 02",
  },
];

const faqs = [
  {
    q: "What domain is The Attractor designed for?",
    a: "Any domain where skill matters. We've run cohorts with athletes, coaches, surgeons, musicians, developers, designers, writers, and combat sport competitors. The ecological framework is domain-agnostic — the AI companion adapts to your specific context.",
  },
  {
    q: "Do I need to complete Foundations first?",
    a: "Foundations is strongly recommended. The Attractor assumes fluency with the core framework — direct perception, affordances, constraints-led approach. Without it, you'll spend the first week catching up instead of accelerating.",
  },
  {
    q: "What's the time commitment?",
    a: "30-45 minutes per day for the constraint challenges and field reports. One 90-minute live cohort session per week. The AI companion is available 24/7 and most people end up spending more time than they planned — because it's actually useful.",
  },
  {
    q: "How many people are in a cohort?",
    a: "Hard cap at 30. The peer accountability dynamic only works at intimate scale. When it fills, it fills. There is no waitlist exception.",
  },
  {
    q: "What happens after the 30 days?",
    a: "You get lifetime access to all cohort recordings, frameworks, and the community archive. The relationships and the neural skill map stay with you. Many alumni join subsequent cohorts to go deeper in a new domain.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Complete every daily challenge and attend every live session for the first two weeks. If after 14 days of full participation you don't feel the framework transforming your perception of your domain, contact us for a full refund. We've never had to issue one.",
  },
];

/* ─── FAQ Item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#080808] transition-colors duration-300 hover:border-[rgba(124,58,237,0.15)]"
      style={{ borderColor: open ? `${PURPLE}25` : undefined }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-attune-starlight/80">{q}</span>
        <ChevronDown
          className={`ml-4 size-4 shrink-0 text-attune-starlight/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div
            className="mb-5 h-px w-full"
            style={{ background: `linear-gradient(to right, ${PURPLE}20, transparent)` }}
          />
          <p className="text-sm leading-relaxed text-attune-starlight/45">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export function AttractorClient() {
  const countdown = useCountdown(COHORT_START);

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
          className="gap-1.5 text-xs font-bold text-white"
          style={{ backgroundColor: PURPLE, boxShadow: `0 0 20px ${PURPLE}50` }}
        >
          <a href={ATTRACTOR_URL} target="_blank" rel="noopener noreferrer">
            SECURE YOUR SEAT — $297
          </a>
        </Button>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${PURPLE}0a 0%, transparent 70%)`,
          }}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center sm:px-10 lg:px-16"
        >
          <motion.span
            variants={fadeIn}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{
              borderColor: `${PURPLE}35`,
              backgroundColor: `${PURPLE}0a`,
              color: PURPLE,
            }}
          >
            <Radio className="size-3" />
            Live Cohort — 30 Days · 30 Seats
          </motion.span>

          <motion.h1
            variants={fadeIn}
            className="max-w-4xl text-5xl font-black text-attune-starlight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ lineHeight: "0.9", letterSpacing: "-0.02em" }}
          >
            THE{" "}
            <span
              style={{
                color: PURPLE,
                textShadow: `0 0 40px ${PURPLE}60, 0 0 80px ${PURPLE}25`,
              }}
            >
              ATTRACTOR.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mt-8 max-w-2xl text-base leading-relaxed text-attune-starlight/50 sm:text-lg"
          >
            30 days. One AI companion. One cohort. One mandate: achieve escape velocity in your
            domain. Not by training harder — by restructuring the entire landscape of your
            practice.
          </motion.p>

          {/* Countdown */}
          <motion.div variants={fadeIn} className="mt-10 w-full max-w-md">
            <div
              className="rounded-2xl border px-6 py-5"
              style={{ borderColor: `${PURPLE}25`, backgroundColor: `${PURPLE}08` }}
            >
              <p
                className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: `${PURPLE}80` }}
              >
                Next Cohort Opens In
              </p>
              <div className="flex items-center justify-center gap-4">
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
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: `${PURPLE}70` }}
                >
                  23 Seats Remaining
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2.5 px-10 text-base font-bold text-white"
              style={{
                backgroundColor: PURPLE,
                boxShadow: `0 0 36px ${PURPLE}55`,
              }}
            >
              <a href={ATTRACTOR_URL} target="_blank" rel="noopener noreferrer">
                SECURE YOUR SEAT — $297
                <ArrowRight className="size-5" />
              </a>
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/30">
              One-time · Lifetime cohort access
            </span>
          </motion.div>
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${PURPLE}25, transparent)`,
          }}
        />
      </section>

      {/* ── The Problem ── */}
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
            ── The Real Bottleneck ──
          </motion.span>
          <motion.h2
            variants={fadeIn}
            className="mb-8 text-3xl font-bold text-attune-starlight sm:text-4xl md:text-5xl"
          >
            Foundations gave you the model.{" "}
            <span className="text-attune-starlight/25">The Attractor makes it your default.</span>
          </motion.h2>
          <motion.div
            variants={fadeIn}
            className="space-y-5 text-base leading-relaxed text-attune-starlight/45"
          >
            <p>
              The gap between understanding ecological dynamics and actually operating from it is not
              an information gap. It&apos;s a{" "}
              <span className="text-attune-starlight/70">perceptual recalibration problem.</span>
            </p>
            <p>
              Your nervous system has spent years running the wrong model. Reading about the right
              model doesn&apos;t replace it. Thirty days of structured immersion — with the right
              constraints, the right feedback loops, and the right people watching — does.
            </p>
            <p>
              The Attractor is not a course. It&apos;s a{" "}
              <span style={{ color: `${PURPLE}cc` }}>landscape redesign.</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── What's Inside ── */}
      <section className="relative pb-28">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${PURPLE}04 0%, transparent 70%)`,
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
                borderColor: `${PURPLE}25`,
                backgroundColor: `${PURPLE}08`,
                color: PURPLE,
              }}
            >
              <Zap className="size-3" />
              System Architecture
            </motion.span>
            <motion.h2
              variants={fadeIn}
              className="mt-6 text-4xl font-black text-attune-starlight sm:text-5xl"
            >
              WHAT YOU&apos;RE GETTING.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeIn}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-7 transition-colors duration-400 sm:p-8"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${PURPLE}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div className="mb-5 flex items-center gap-3.5">
                    <div
                      className="flex size-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${PURPLE}0a` }}
                    >
                      <Icon className="size-5" style={{ color: `${PURPLE}90` }} />
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-attune-starlight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-attune-starlight/40">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
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
                <p className="font-mono text-xs font-medium text-attune-starlight/65">{t.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/25">
                  {t.role}
                </p>
                <p
                  className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: `${PURPLE}60` }}
                >
                  {t.cohort}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative py-28">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${PURPLE}05 0%, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeIn}
              className="mb-14 text-center text-4xl font-black text-attune-starlight sm:text-5xl"
            >
              ONE INVESTMENT.
              <br />
              <span style={{ color: PURPLE }}>TOTAL TRANSFORMATION.</span>
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
              borderColor: `${PURPLE}30`,
              boxShadow: `0 0 60px ${PURPLE}10, 0 0 120px ${PURPLE}06`,
            }}
          >
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${PURPLE}60, transparent)`,
              }}
            />
            <div className="px-8 py-14 sm:px-14 sm:py-16">
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div
                    className="flex size-14 items-center justify-center rounded-2xl border"
                    style={{ borderColor: `${PURPLE}30`, backgroundColor: `${PURPLE}10` }}
                  >
                    <Radio className="size-7" style={{ color: PURPLE }} />
                  </div>
                </div>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: PURPLE }}
                >
                  The Attractor — Cohort 03
                </span>
                <h3 className="mt-2 text-3xl font-black text-attune-starlight sm:text-4xl">
                  30-DAY IMMERSION
                </h3>
                <div className="mt-8 flex items-baseline justify-center gap-2">
                  <span className="text-7xl font-black tracking-tight text-attune-starlight sm:text-8xl">
                    $297
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-attune-starlight/30">
                    one-time
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                  One cohort. Lifetime access to recordings & community.
                </p>

                <div
                  className="mx-auto my-8 h-px w-full max-w-xs"
                  style={{
                    background: `linear-gradient(to right, transparent, ${PURPLE}20, transparent)`,
                  }}
                />

                <div className="mx-auto mb-10 grid max-w-md gap-2.5 text-left sm:grid-cols-2">
                  {[
                    "AI Skill Companion",
                    "30 Daily Constraint Challenges",
                    "4 Live Cohort Sessions",
                    "Neural Skill Map Dashboard",
                    "Private Community Access",
                    "Lifetime Recordings + Archive",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-attune-starlight/50"
                    >
                      <div
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: PURPLE }}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full max-w-sm gap-2.5 py-7 text-lg font-black text-white transition-all duration-300"
                  style={{
                    backgroundColor: PURPLE,
                    boxShadow: `0 0 40px ${PURPLE}50`,
                  }}
                >
                  <a href={ATTRACTOR_URL} target="_blank" rel="noopener noreferrer">
                    SECURE YOUR SEAT
                    <ArrowRight className="size-5" />
                  </a>
                </Button>

                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <Shield className="size-3 text-attune-starlight/20" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-attune-starlight/20">
                      14-Day Guarantee
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="size-3 text-attune-starlight/20" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-attune-starlight/20">
                      30 Seats Max
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${PURPLE}30, transparent)`,
              }}
            />
          </motion.div>

          {/* Foundations Bridge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeIn}
            className="mt-8 rounded-2xl border border-white/[0.04] bg-[#080808] px-6 py-5"
          >
            <div className="flex items-start gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-attune-green" />
              <div>
                <p className="text-sm font-medium text-attune-starlight/70">
                  Complete Foundations first?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-attune-starlight/35">
                  The Attractor assumes fluency with the ecological framework.{" "}
                  <Link href="/foundations" className="text-attune-green/70 underline underline-offset-2 hover:text-attune-green">
                    Start with Foundations ($97)
                  </Link>{" "}
                  if you haven&apos;t already — then come back here.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeIn}
            className="mb-12 text-center text-3xl font-bold text-attune-starlight sm:text-4xl"
          >
            COMMON QUESTIONS.
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="space-y-3"
          >
            {faqs.map((faq) => (
              <motion.div key={faq.q} variants={fadeIn}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
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
            className="mb-6 text-4xl font-black text-attune-starlight sm:text-5xl"
          >
            THE ATTRACTOR STATE IS NOT SOMETHING YOU{" "}
            <span className="text-attune-starlight/25">ACHIEVE.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-attune-starlight/40"
          >
            It&apos;s something you{" "}
            <span style={{ color: `${PURPLE}cc` }}>become</span>. Thirty days of structured
            immersion, ecological constraint design, and AI-augmented feedback is enough to make
            high-level performance your default state — not your peak state.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="gap-2.5 px-12 text-base font-bold text-white"
              style={{
                backgroundColor: PURPLE,
                boxShadow: `0 0 30px ${PURPLE}45`,
              }}
            >
              <a href={ATTRACTOR_URL} target="_blank" rel="noopener noreferrer">
                SECURE YOUR SEAT — $297
                <ArrowRight className="size-5" />
              </a>
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/25">
              23 seats left · Cohort opens March 2
            </span>
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
