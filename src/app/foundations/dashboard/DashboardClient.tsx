"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Lock, Target, Zap } from "lucide-react";

const slamIn = {
  hidden: { y: 40, opacity: 0, filter: "blur(6px)" },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [line, setLine] = useState(0);

  const lines = [
    "> ATTUNE FOUNDATIONS v1.0",
    "> Loading perception-action matrix...",
    "> Signal locked.",
    "> SYSTEM ONLINE.",
  ];

  useEffect(() => {
    if (line < lines.length) {
      const timer = setTimeout(() => setLine((l) => l + 1), 350);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [line, lines.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]"
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.4 }}
    >
      {/* Cyan flash overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute inset-0 bg-attune-signal"
      />

      <div className="relative w-full max-w-lg px-6">
        <div className="font-mono text-sm leading-loose">
          {lines.slice(0, line).map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                i === lines.length - 1
                  ? "font-bold text-attune-signal"
                  : "text-white/40"
              }
            >
              {text}
            </motion.div>
          ))}
          {line < lines.length && (
            <span className="inline-block h-4 w-2 animate-pulse bg-attune-signal" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardClient({
  firstName,
  domain,
  constraint,
  goal,
}: {
  firstName: string;
  domain: string;
  constraint: string;
  goal: string;
}) {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.04)_0%,transparent_50%)]" />

          <main className="relative z-10 px-8 py-12">
            {/* Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <motion.p
                custom={0}
                variants={slamIn}
                className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-attune-signal/50"
              >
                Protocol Complete — Signal Active
              </motion.p>
              <motion.h1
                custom={1}
                variants={slamIn}
                className="font-kinetic text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Welcome to the Arena,{" "}
                <span className="text-attune-signal text-glow-signal">
                  {firstName}.
                </span>
              </motion.h1>
              <motion.div
                custom={2}
                variants={slamIn}
                className="mt-4 h-[2px] w-16 bg-attune-signal"
              />
            </motion.div>

            {/* Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-3"
            >
              {[
                {
                  icon: Crosshair,
                  label: "Domain",
                  value: domain,
                  i: 3,
                },
                {
                  icon: Lock,
                  label: "Constraint",
                  value: constraint,
                  i: 4,
                },
                {
                  icon: Target,
                  label: "90-Day Win",
                  value: goal,
                  i: 5,
                },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  custom={card.i}
                  variants={slamIn}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <card.icon className="size-4 text-attune-signal/60" />
                    <p className="font-kinetic text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {card.label}
                    </p>
                  </div>
                  <p className="font-kinetic text-sm font-semibold leading-relaxed text-white/80">
                    {card.value || "—"}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              custom={6}
              variants={slamIn}
              initial="hidden"
              animate="visible"
              className="mt-12"
            >
              <div className="inline-flex items-center gap-2 border border-attune-signal/10 bg-attune-signal/[0.04] px-5 py-3">
                <Zap className="size-3.5 text-attune-signal" />
                <span className="font-kinetic text-xs font-bold uppercase tracking-[0.15em] text-attune-signal/60">
                  Modules loading soon...
                </span>
              </div>
            </motion.div>
          </main>
        </div>
      )}
    </>
  );
}
