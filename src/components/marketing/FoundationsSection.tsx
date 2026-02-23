"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;
const CHECKOUT_URL = "https://buy.stripe.com/test_7sY7sL75T2GV3CLgIrefC00";

export function FoundationsSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <section id="foundations" className="relative py-24 md:py-32">
      {/* Section atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[40%] h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-[#38BDF8] blur-3xl opacity-[0.02]" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#38BDF8]/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={
            isCardInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 50, scale: 0.97 }
          }
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-[#38BDF8]/25 bg-[#080808] shadow-[0_0_80px_rgba(56,189,248,0.06)]"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[#38BDF8] blur-3xl opacity-20" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-[#38BDF8] blur-3xl opacity-20" />

          {/* Top accent line */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-[#38BDF8]/50 to-transparent" />

          <div className="relative px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
            {/* Label */}
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#38BDF8]/10">
                <Zap className="size-4 text-[#38BDF8]" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#38BDF8]">
                Start Here
              </span>
            </div>

            {/* Heading */}
            <h2 className="mb-8 text-4xl font-black tracking-tight text-attune-starlight sm:text-5xl lg:text-6xl">
              Foundations
            </h2>

            {/* Body */}
            <p className="mb-10 max-w-2xl text-base leading-[1.8] text-attune-starlight/55 sm:text-lg sm:leading-[1.8]">
              The gap between your practice and your performance is not a
              discipline problem. It is a model problem. Foundations gives you
              the accurate picture of how skill actually develops in the real
              world and the framework to redesign your practice around it. One
              investment. Every domain. For the rest of your life.
            </p>

            {/* Divider */}
            <div className="mb-10 h-px w-full bg-linear-to-r from-transparent via-white/6 to-transparent" />

            {/* Price + CTA */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-attune-starlight">
                    $97
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-attune-starlight/35">
                    — One-time. Lifetime access.
                  </span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="gap-2 bg-[#38BDF8] px-8 text-base font-bold text-attune-void shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all duration-300 hover:bg-[#38BDF8]/90 hover:shadow-[0_0_50px_rgba(56,189,248,0.5)]"
              >
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  GET FOUNDATIONS — $97
                  <ArrowRight className="size-5" />
                </a>
              </Button>
            </div>

            {/* Sub-CTA text */}
            <p className="mt-6 text-center text-xs leading-relaxed text-attune-starlight/30 sm:text-left">
              No subscriptions. No upsells. Just the framework that should have
              been taught first.
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-[#38BDF8]/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
