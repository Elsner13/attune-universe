"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, SkipForward } from "lucide-react";
import { saveOnboardingData } from "./actions";

const STEPS = [
  {
    id: "domain",
    label: "01",
    tag: "THE ARENA.",
    header: "WHERE ARE YOU COMPETING?",
    subtext: "Define your domain of mastery (e.g., Coding, BJJ, Business).",
    type: "input" as const,
    placeholder: "Type your domain...",
  },
  {
    id: "constraint",
    label: "02",
    tag: "THE BOTTLENECK.",
    header: "WHAT IS HOLDING YOU BACK?",
    subtext: "Identify the primary constraint in your perception-action cycle.",
    type: "textarea" as const,
    placeholder: "Be honest. Be specific...",
  },
  {
    id: "goal",
    label: "03",
    tag: "THE WIN.",
    header: "WHAT DOES MASTERY LOOK LIKE IN 90 DAYS?",
    subtext: "Be specific. Be direct.",
    type: "textarea" as const,
    placeholder: "Describe your 90-day outcome...",
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const slamIn = {
  hidden: { y: 60, opacity: 0, filter: "blur(8px)" },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
  exit: { y: -40, opacity: 0, filter: "blur(4px)", transition: { duration: 0.25 } },
};

const lineExpand = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function OnboardingClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<StepId, string>>({
    domain: "",
    constraint: "",
    goal: "",
  });
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const step = STEPS[currentStep];
  const canProceed = answers[step.id].trim().length > 0;
  const isLastStep = currentStep === STEPS.length - 1;

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, [currentStep]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && canProceed) {
      e.preventDefault();
      next();
    }
  }

  function next() {
    if (!canProceed) return;
    if (isLastStep) {
      startTransition(async () => {
        await saveOnboardingData({
          domain: answers.domain,
          constraint: answers.constraint,
          goal: answers.goal,
        });
      });
      return;
    }
    setCurrentStep((s) => s + 1);
  }

  function skip() {
    startTransition(async () => {
      await saveOnboardingData({
        domain: answers.domain || "Unset",
        constraint: answers.constraint || "Unset",
        goal: answers.goal || "Unset",
      });
    });
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#030303]">
      {/* Background pulse */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05)_0%,transparent_60%)]" />

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={skip}
        disabled={isPending}
        className="absolute right-6 top-6 z-20 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white/20 transition-colors hover:text-white/40 disabled:opacity-30"
      >
        Skip Protocol
        <SkipForward className="size-3" />
      </motion.button>

      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 z-10 h-[2px] bg-white/[0.04]">
        <motion.div
          className="h-full bg-attune-signal"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Step counter */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute left-6 top-6 z-10 font-mono text-xs text-white/20"
      >
        {String(currentStep + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Tag */}
              <motion.p
                custom={0}
                variants={slamIn}
                className="font-kinetic mb-3 text-xs font-bold uppercase tracking-[0.3em] text-attune-signal"
              >
                {step.tag}
              </motion.p>

              {/* Header — massive, slamming in */}
              <motion.h1
                custom={1}
                variants={slamIn}
                className="font-kinetic mb-4 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {step.header}
              </motion.h1>

              {/* Cyan line */}
              <motion.div
                variants={lineExpand}
                className="mb-6 h-[2px] w-24 origin-left bg-attune-signal"
              />

              {/* Subtext */}
              <motion.p
                custom={2}
                variants={slamIn}
                className="mb-10 max-w-xl text-base leading-relaxed text-white/40 sm:text-lg"
              >
                {step.subtext}
              </motion.p>

              {/* Input */}
              <motion.div custom={3} variants={slamIn}>
                {step.type === "input" ? (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={answers[step.id]}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [step.id]: e.target.value,
                      }))
                    }
                    onKeyDown={handleKeyDown}
                    placeholder={step.placeholder}
                    autoComplete="off"
                    spellCheck={false}
                    className="font-kinetic w-full border-0 border-b-2 border-white/[0.08] bg-transparent py-4 text-2xl font-bold text-white placeholder:text-white/15 transition-colors duration-300 focus:border-attune-signal focus:outline-none sm:text-3xl md:text-4xl"
                    style={{
                      animation: answers[step.id]
                        ? "none"
                        : "signal-pulse 3s ease-in-out infinite",
                    }}
                  />
                ) : (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={answers[step.id]}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [step.id]: e.target.value,
                      }))
                    }
                    onKeyDown={handleKeyDown}
                    placeholder={step.placeholder}
                    rows={3}
                    spellCheck={false}
                    className="font-kinetic w-full resize-none border-0 border-b-2 border-white/[0.08] bg-transparent py-4 text-xl font-bold text-white placeholder:text-white/15 transition-colors duration-300 focus:border-attune-signal focus:outline-none sm:text-2xl md:text-3xl"
                    style={{
                      animation: answers[step.id]
                        ? "none"
                        : "signal-pulse 3s ease-in-out infinite",
                    }}
                  />
                )}
              </motion.div>

              {/* CTA */}
              <motion.div custom={4} variants={slamIn} className="mt-10 flex items-center gap-6">
                <button
                  onClick={next}
                  disabled={!canProceed || isPending}
                  className="group flex items-center gap-3 rounded-none border-2 border-attune-signal bg-attune-signal/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-attune-signal transition-all duration-300 hover:bg-attune-signal hover:text-[#030303] hover:shadow-[0_0_60px_rgba(0,240,255,0.4)] disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-attune-signal/10 disabled:hover:text-attune-signal disabled:hover:shadow-none"
                >
                  {isPending ? (
                    "INITIALIZING..."
                  ) : isLastStep ? (
                    <>
                      INITIALIZE
                      <Zap className="size-4 transition-transform group-hover:scale-110" />
                    </>
                  ) : (
                    <>
                      NEXT
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <span className="hidden text-xs text-white/15 sm:block">
                  Press <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-white/30">Enter</kbd> to continue
                </span>
              </motion.div>

              {/* Back */}
              {currentStep > 0 && (
                <motion.button
                  custom={5}
                  variants={slamIn}
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-white/20 transition-colors hover:text-white/40"
                >
                  &larr; Back
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
