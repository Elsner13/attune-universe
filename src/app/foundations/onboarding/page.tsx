"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  Lock,
  Flame,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { saveOnboardingData } from "./actions";

const STEPS = [
  {
    id: "vision",
    title: "The Vision",
    subtitle: "What is your primary domain of mastery?",
    description:
      "Select the arena where you intend to forge signal from noise.",
    icon: Crosshair,
    options: [
      {
        value: "coding",
        label: "Coding & Engineering",
        desc: "Software, systems, architecture",
      },
      {
        value: "sport",
        label: "Sport & Performance",
        desc: "Athletic training, competition",
      },
      {
        value: "business",
        label: "Business & Strategy",
        desc: "Entrepreneurship, leadership, growth",
      },
      {
        value: "creative",
        label: "Creative & Art",
        desc: "Music, writing, design, film",
      },
      {
        value: "science",
        label: "Science & Research",
        desc: "Discovery, experimentation, analysis",
      },
      {
        value: "other",
        label: "Other Domain",
        desc: "A unique path of mastery",
      },
    ],
  },
  {
    id: "constraint",
    title: "The Constraint",
    subtitle: "What is your biggest bottleneck right now?",
    description:
      "Identify the constraint that limits your rate of adaptation.",
    icon: Lock,
    options: [
      {
        value: "focus",
        label: "Focus & Attention",
        desc: "Scattered energy, inability to go deep",
      },
      {
        value: "consistency",
        label: "Consistency",
        desc: "Starting strong, fading fast",
      },
      {
        value: "feedback",
        label: "Feedback Loops",
        desc: "No clear signal on what's working",
      },
      {
        value: "overwhelm",
        label: "Information Overwhelm",
        desc: "Too many inputs, not enough processing",
      },
      {
        value: "direction",
        label: "Direction & Clarity",
        desc: "Unsure what to focus on next",
      },
      {
        value: "execution",
        label: "Execution Gap",
        desc: "Know what to do, can't make it happen",
      },
    ],
  },
  {
    id: "commitment",
    title: "The Commitment",
    subtitle: "How many hours per week are you coupling action to perception?",
    description:
      "Honest assessment of current deliberate practice bandwidth.",
    icon: Flame,
    options: [
      {
        value: "1-3",
        label: "1 — 3 hours",
        desc: "Building the foundation",
      },
      {
        value: "4-7",
        label: "4 — 7 hours",
        desc: "Consistent engagement",
      },
      {
        value: "8-14",
        label: "8 — 14 hours",
        desc: "Serious commitment",
      },
      {
        value: "15-25",
        label: "15 — 25 hours",
        desc: "Deep immersion",
      },
      {
        value: "25+",
        label: "25+ hours",
        desc: "Full integration",
      },
    ],
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [answers, setAnswers] = useState<Record<StepId, string>>({
    vision: "",
    constraint: "",
    commitment: "",
  });
  const [isPending, startTransition] = useTransition();

  const step = STEPS[currentStep];
  const StepIcon = step.icon;
  const canProceed = answers[step.id] !== "";
  const isLastStep = currentStep === STEPS.length - 1;

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  function next() {
    if (!canProceed) return;
    if (isLastStep) {
      startTransition(async () => {
        await saveOnboardingData({
          domain: answers.vision,
          bottleneck: answers.constraint,
          hoursPerWeek: answers.commitment,
        });
      });
      return;
    }
    setDirection(1);
    setCurrentStep((s) => s + 1);
  }

  function back() {
    if (currentStep === 0) return;
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,240,255,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,240,255,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-xl px-6">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div
                className={`flex size-8 items-center justify-center rounded-full border text-xs font-medium transition-all duration-500 ${
                  i < currentStep
                    ? "border-attune-signal/40 bg-attune-signal/20 text-attune-signal"
                    : i === currentStep
                      ? "border-attune-signal/30 bg-attune-signal/10 text-attune-signal"
                      : "border-white/[0.06] bg-white/[0.02] text-attune-starlight/20"
                }`}
              >
                {i < currentStep ? <Check className="size-3.5" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-8 transition-colors duration-500 ${
                    i < currentStep
                      ? "bg-attune-signal/30"
                      : "bg-white/[0.06]"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step content */}
        <div className="relative min-h-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm">
                {/* Header */}
                <div className="mb-8 flex flex-col items-center text-center">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-full border border-attune-signal/20 bg-attune-signal/[0.06]">
                    <StepIcon className="size-6 text-attune-signal" />
                  </div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-attune-signal/60">
                    Step {currentStep + 1} of {STEPS.length}
                  </p>
                  <h2 className="text-authority mb-1 text-2xl text-attune-starlight">
                    {step.title}
                  </h2>
                  <p className="text-sm text-attune-starlight/50">
                    {step.subtitle}
                  </p>
                  <p className="mt-2 text-xs text-attune-starlight/30">
                    {step.description}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {step.options.map((option) => {
                    const isSelected = answers[step.id] === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => selectOption(option.value)}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex w-full items-start gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-attune-signal/30 bg-attune-signal/[0.08]"
                            : "border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08] hover:bg-white/[0.04]"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                            isSelected
                              ? "border-attune-signal/50 bg-attune-signal/20"
                              : "border-white/[0.1] bg-transparent"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="size-2 rounded-full bg-attune-signal"
                            />
                          )}
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium transition-colors ${
                              isSelected
                                ? "text-attune-signal"
                                : "text-attune-starlight/80"
                            }`}
                          >
                            {option.label}
                          </p>
                          <p className="text-xs text-attune-starlight/30">
                            {option.desc}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={back}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 text-sm text-attune-starlight/30 transition-colors hover:text-attune-starlight/60 disabled:invisible"
                >
                  <ArrowLeft className="size-3.5" />
                  Back
                </button>

                <button
                  onClick={next}
                  disabled={!canProceed || isPending}
                  className="flex items-center gap-2 rounded-lg border border-attune-signal/30 bg-attune-signal/10 px-6 py-2.5 text-sm font-medium text-attune-signal transition-all duration-300 hover:border-attune-signal/50 hover:bg-attune-signal/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {isPending ? (
                    "Saving..."
                  ) : isLastStep ? (
                    <>
                      Enter the Arena
                      <Flame className="size-3.5" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="size-3.5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
