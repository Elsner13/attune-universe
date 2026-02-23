"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-5 sm:px-8">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-content text-center">
        <FadeIn>
          <div className="mb-8 inline-flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-accent" />
            <span className="font-body text-[11px] uppercase tracking-[3px] text-accent">
              The science of how humans actually learn
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="font-display text-[clamp(40px,7vw,80px)] leading-[1.05]">
            <span className="text-text-primary">Stop practicing.</span>
            <br />
            <span className="text-accent">Start adapting.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mt-8 max-w-[600px] font-body text-lg leading-relaxed text-text-muted">
            Ecological dynamics reveals why most practice doesn&apos;t transfer
            to performance. Attune gives you the science, the system, and the
            community to learn the way your brain was designed to.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#products"
              className="bg-accent px-8 py-4 font-body text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-accent-dim"
            >
              Explore Attune
            </a>
            <a
              href="#newsletter"
              className="border border-border-light px-8 py-4 font-body text-xs font-medium uppercase tracking-wider text-text-primary transition-colors hover:border-text-muted"
            >
              Read the Newsletter
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={500}>
          <p className="mt-20 font-body text-xs tracking-wide text-text-dim">
            2x NCAA National Champion &middot; 6x All-American &middot; 538+
            Newsletter Readers
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
