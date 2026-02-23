"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutSection() {
  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="grid items-start gap-12 md:grid-cols-[240px_1fr] md:gap-16">
          {/* Photo placeholder */}
          <FadeIn>
            <div className="flex h-[280px] w-[200px] items-center justify-center border border-border-dark bg-bg-card">
              <span className="font-display text-4xl text-text-dim">SE</span>
            </div>
          </FadeIn>

          {/* Bio */}
          <FadeIn delay={150}>
            <div>
              <SectionLabel text="About" />
              <h2 className="font-display text-4xl text-text-primary">
                Sam Elsner
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-muted">
                I threw discus in college — 2x NCAA National Champion, 6x
                All-American. I was good at practice. Competition was a
                different story. The further I got from the training
                environment, the less my skills transferred. I didn&apos;t
                understand why until I found ecological dynamics — the science
                of how organisms and environments co-create skilled behavior.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-text-muted">
                That discovery changed how I think about coaching, learning,
                and human development across every domain. Attune is the
                result: a body of work dedicated to making this science
                accessible and applicable — for coaches, athletes, musicians,
                parents, and anyone who takes learning seriously.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
