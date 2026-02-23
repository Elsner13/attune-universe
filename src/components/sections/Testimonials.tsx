"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TESTIMONIALS = [
  {
    quote:
      "I spent fifteen years drilling my athletes the traditional way. Three months with the ecological approach and my throwers are making adjustments in competition I never thought possible.",
    attribution: "D1 Track & Field Coach",
    product: "Foundations",
  },
  {
    quote:
      "I applied the constraints-led framework to my guitar students. Instead of isolating scales from music, I embedded the learning in performance contexts. The difference in retention is night and day.",
    attribution: "Guitar Instructor & Studio Owner",
    product: "Signal/Noise Reader",
  },
  {
    quote:
      "My youth players used to freeze under pressure. Now they read the game. I changed the training environment, not the kids. That distinction changed everything for me as a coach.",
    attribution: "Youth Soccer Coach",
    product: "Attractor Universe",
  },
  {
    quote:
      "I stopped micromanaging my daughter's learning and started designing environments that let her figure things out. She's more confident, more creative, and we actually enjoy the process now.",
    attribution: "Parent & Former Collegiate Athlete",
    product: "Foundations",
  },
];

export function Testimonials() {
  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-content">
        <FadeIn>
          <SectionLabel text="Results" />
          <h2 className="font-display text-[clamp(36px,5vw,48px)] text-text-primary">
            What changes when you attune.
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="flex h-full flex-col border border-border-dark p-8">
                <p className="flex-1 font-display text-lg italic leading-relaxed text-text-primary">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border-dark pt-4">
                  <span className="font-body text-sm text-text-muted">
                    {t.attribution}
                  </span>
                  <span className="font-body text-[10px] uppercase tracking-[1.5px] text-text-dim">
                    {t.product}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
