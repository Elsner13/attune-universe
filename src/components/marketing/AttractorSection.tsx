"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Radio, Brain, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

export function AttractorSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="next-steps" className="relative py-24 md:py-32">
      {/* Section atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[40%] h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-attune-purple blur-3xl opacity-[0.015]" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#38BDF8]"
          >
            WHERE YOU GO NEXT
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-sm text-attune-starlight/40"
          >
            After Foundations, the ecosystem opens.
          </motion.p>
        </motion.div>

        {/* Two cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Attractor Universe card */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-attune-purple/20 bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-attune-purple/35 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-attune-purple blur-3xl opacity-20" />

            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-attune-purple/10">
                    <Radio className="size-4 text-attune-purple" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-purple/70">
                    Live Cohort
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-bold tracking-tight text-attune-starlight sm:text-3xl">
                  Attractor Universe
                </h3>

                <p className="text-sm leading-relaxed text-attune-starlight/45">
                  30 days. A live cohort of people applying the framework in
                  real time across real domains. Where understanding becomes
                  embodied practice.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-attune-starlight">
                    $297
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-attune-starlight/30">
                    per cohort
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full gap-2 bg-attune-purple px-6 font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.3)] transition-all duration-300 hover:bg-attune-purple/90 hover:shadow-[0_0_36px_rgba(124,58,237,0.45)]"
                >
                  SECURE YOUR SEAT
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Attune OS card */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-attune-blue/15 bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-attune-blue/30 sm:p-10"
          >
            <div className="pointer-events-none absolute -left-12 -top-12 size-40 rounded-full bg-attune-blue blur-3xl opacity-20" />

            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-attune-blue/10">
                    <Brain className="size-4 text-attune-blue" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-attune-blue/70">
                    In Development
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-bold tracking-tight text-attune-starlight sm:text-3xl">
                  Attune OS
                </h3>

                <p className="text-sm leading-relaxed text-attune-starlight/45">
                  Your ecological practice environment. Constraint design,
                  affordance mapping, and skill progression tracking built
                  around the framework. Currently in development.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-attune-blue/20 bg-attune-blue/5 px-4 py-3"
                  >
                    <Sparkles className="size-3.5 text-attune-blue" />
                    <span className="font-mono text-xs text-attune-blue">
                      You&apos;re on the list.
                    </span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email) setSubmitted(true);
                    }}
                    className="flex flex-col gap-2 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-attune-starlight/25" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-attune-blue/10 bg-attune-void pl-9 text-sm text-attune-starlight placeholder:text-attune-starlight/25 focus-visible:border-attune-blue/30 focus-visible:ring-attune-blue/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="shrink-0 gap-2 border border-attune-blue/30 bg-attune-blue font-semibold text-attune-void transition-all duration-300 hover:bg-attune-blue/90 hover:shadow-[0_0_24px_rgba(0,180,255,0.3)]"
                    >
                      JOIN THE WAITLIST
                      <ArrowRight className="size-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
