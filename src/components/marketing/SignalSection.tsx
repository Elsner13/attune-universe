"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, Radio, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

const intelligenceBriefs = [
  {
    timestamp: "2026.02.19",
    topic: "Fire Horse: Ecological Rebirth",
    tag: "ARCHETYPE",
    strength: 98,
    url: "https://findthesignal.substack.com/p/fire-horse-ecological-rebirth",
  },
  {
    timestamp: "2026.02.17",
    topic: "Monk Mode Is a Lie (And Why Wizards Win)",
    tag: "STRATEGY",
    strength: 96,
    url: "https://findthesignal.substack.com/p/monk-mode-is-a-lie-and-why-wizards",
  },
  {
    timestamp: "2026.02.11",
    topic: "The Brain\u2019s Twinkling Dance",
    tag: "NEUROSCIENCE",
    strength: 94,
    url: "https://findthesignal.substack.com/p/the-brains-twinkling-dance",
  },
  {
    timestamp: "2026.02.09",
    topic: "When Questioning Becomes Treason",
    tag: "CULTURE",
    strength: 93,
    url: "https://findthesignal.substack.com/p/when-questioning-becomes-treason",
  },
  {
    timestamp: "2026.02.06",
    topic: "The Flatlanders: Why Most People Think in One Dimension",
    tag: "PERCEPTION",
    strength: 95,
    url: "https://findthesignal.substack.com/p/the-flatlanders-why-most-people-think",
  },
  {
    timestamp: "2026.02.03",
    topic: "The Sovereign\u2019s First Skill: Perceiving What Others Cannot",
    tag: "SKILL ACQ.",
    strength: 97,
    url: "https://findthesignal.substack.com/p/the-sovereigns-first-skill-perceiving",
  },
];

function SignalStrengthBar({ strength }: { strength: number }) {
  const segments = 10;
  const filled = Math.round((strength / 100) * segments);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`h-2.5 w-1 rounded-[1px] transition-colors ${
            i < filled ? "bg-attune-yellow/80" : "bg-white/6"
          }`}
        />
      ))}
      <span className="ml-1.5 font-mono text-[10px] tabular-nums text-attune-yellow/70">
        {strength}%
      </span>
    </div>
  );
}

export function SignalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineYRaw = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const headlineY = useSpring(headlineYRaw, SPRING);

  return (
    <section
      id="signal"
      ref={sectionRef}
      className="relative min-h-[260vh]"
    >

      {/* Sticky "THE SIGNAL." watermark */}
      <div className="sticky top-0 z-0 flex h-screen items-center overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <motion.h2
            style={{ y: headlineY }}
            className="text-authority select-none text-[clamp(3.5rem,14vw,16rem)] font-black leading-[0.85] text-attune-starlight/3 will-change-transform"
          >
            THE
            <br />
            SIGNAL.
          </motion.h2>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-attune-yellow/15 to-transparent" />
      </div>

      {/* Scrolling content layer */}
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
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-attune-yellow/20 bg-attune-yellow/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-yellow">
              <Radio className="size-3" />
              Newsletter — Signal/Noise
            </span>
          </motion.div>

          {/* Split-stream layout */}
          <div className="mb-28 grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left: THE SIGNAL headline + description */}
            <div className="lg:sticky lg:top-32 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3
                  data-text="THE SIGNAL."
                  className="signal-glitch text-authority mb-6 text-5xl font-black text-attune-starlight sm:text-6xl lg:text-7xl"
                >
                  THE{" "}
                  <span className="text-attune-yellow text-glow-yellow">
                    SIGNAL.
                  </span>
                </h3>

                <p className="mb-6 text-base leading-relaxed text-attune-starlight/50">
                  Filtering conventional wisdom to find what actually works in
                  learning and skill acquisition. Ecological dynamics for
                  coaches, athletes, and anyone who wants to get better at
                  things.
                </p>

                <div className="mb-8 h-px w-full bg-linear-to-r from-attune-yellow/20 to-transparent" />

                {/* Stats */}
                <div className="flex gap-8">
                  <div>
                    <div className="font-mono text-2xl font-bold tabular-nums text-attune-yellow">
                      538+
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-attune-starlight/30">
                      Subscribers
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold tabular-nums text-attune-yellow">
                      Weekly
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-attune-starlight/30">
                      Frequency
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold tabular-nums text-attune-yellow">
                      Free
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-attune-starlight/30">
                      Always
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Intelligence Brief feed */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="mb-4 flex items-center justify-between"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-yellow/40">
                  ── Intelligence Briefs ──
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-attune-yellow/30">
                  <span className="size-1.5 animate-pulse rounded-full bg-attune-yellow" />
                  Live Feed
                </span>
              </motion.div>

              <div className="space-y-3">
                {intelligenceBriefs.map((brief, i) => (
                  <motion.a
                    key={brief.topic}
                    href={brief.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group block overflow-hidden rounded-xl border border-white/5 bg-[#080808] p-5 transition-all duration-400 hover:border-attune-yellow/20 hover:bg-[#0a0a0a]"
                  >
                    {/* Top row: timestamp + tag */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] tabular-nums tracking-wider text-attune-starlight/20">
                        {brief.timestamp}
                      </span>
                      <span className="rounded-sm bg-attune-yellow/8 px-2 py-0.5 font-mono text-[8px] font-medium uppercase tracking-[0.2em] text-attune-yellow/60">
                        {brief.tag}
                      </span>
                    </div>

                    {/* Topic */}
                    <h4 className="mb-3 font-mono text-sm font-medium leading-snug text-attune-starlight/70 transition-colors duration-300 group-hover:text-attune-starlight/95">
                      {brief.topic}
                    </h4>

                    {/* Signal strength bar */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-attune-starlight/15">
                        Signal Strength
                      </span>
                      <SignalStrengthBar strength={brief.strength} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-attune-yellow/15 bg-[#080808]"
          >
            <div className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-attune-yellow/6 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 size-40 rounded-full bg-attune-yellow/4 blur-[80px]" />

            {/* Top accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-yellow/40 to-transparent" />

            <div className="relative px-8 py-10 sm:px-12 sm:py-14">
              {/* Icon + heading */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-attune-yellow/20 bg-attune-yellow/8">
                  <Zap className="size-6 text-attune-yellow" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-yellow/70">
                    Free Newsletter
                  </span>
                  <h4 className="font-display text-2xl font-bold text-attune-starlight sm:text-3xl">
                    Signal/Noise
                  </h4>
                </div>
              </div>

              <p className="mb-4 text-authority text-xl font-bold leading-tight text-attune-starlight/90 sm:text-2xl">
                DECODE THE UNIVERSE.
                <br />
                <span className="text-attune-yellow text-glow-yellow">
                  JOIN 538+ MASTERING THE SIGNAL.
                </span>
              </p>

              <p className="mb-8 max-w-lg text-sm leading-relaxed text-attune-starlight/40">
                Weekly intelligence briefs on ecological dynamics, skill
                acquisition, and the science of learning. No fluff. Pure signal.
              </p>

              {/* CTA */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-attune-yellow/20 bg-attune-yellow/5 px-5 py-4"
                >
                  <Zap className="size-4 text-attune-yellow" />
                  <span className="font-mono text-sm text-attune-yellow">
                    Signal locked in. Check your inbox.
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
                        className="border-attune-yellow/10 bg-attune-void pl-9 font-mono text-sm text-attune-starlight placeholder:text-attune-starlight/25 focus-visible:border-attune-yellow/30 focus-visible:ring-attune-yellow/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="group/cta gap-2 border border-attune-yellow/30 bg-attune-yellow px-8 text-base font-bold text-attune-void shadow-[0_0_30px_rgba(255,214,0,0.35)] transition-all duration-300 hover:bg-attune-yellow/90 hover:shadow-[0_0_60px_rgba(255,214,0,0.5)]"
                    >
                      SUBSCRIBE TO SIGNAL
                      <ArrowRight className="size-5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                    </Button>
                  </form>
                  <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/20">
                    Free forever. Unsubscribe anytime.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-yellow/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
