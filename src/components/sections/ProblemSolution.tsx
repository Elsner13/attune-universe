"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ProblemSolution() {
  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left — The Problem */}
          <FadeIn>
            <div>
              <SectionLabel text="The Problem" />
              <h2 className="font-display text-[clamp(32px,4vw,42px)] leading-[1.1] text-text-primary">
                Traditional learning is fundamentally broken.
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-muted">
                Drill-and-repeat, blocked practice, &ldquo;master the
                fundamentals first&rdquo; — these methods produce beautiful
                practice reps and catastrophic competition performance. The
                athlete who looks perfect in training and falls apart under
                pressure isn&apos;t mentally weak. They were trained in an
                environment that bears no resemblance to the one they perform
                in.
              </p>
            </div>
          </FadeIn>

          {/* Right — The Shift */}
          <FadeIn delay={150}>
            <div>
              <SectionLabel text="The Shift" />
              <h2 className="font-display text-[clamp(32px,4vw,42px)] leading-[1.1] text-text-primary">
                Ecological dynamics changes everything.
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-muted">
                Skill isn&apos;t something you store in your muscles or
                memorize in your brain. It&apos;s an emergent relationship
                between you and your environment. Ecological dynamics — built
                on sixty years of research from Gibson, Bernstein, Newell, and
                Davids — shows how to design learning environments where
                adaptive, transferable skill emerges naturally.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Stats bar */}
        <FadeIn delay={300}>
          <div className="mt-20 grid grid-cols-1 border border-border-dark sm:grid-cols-3">
            {[
              {
                number: "60+",
                text: "years of research distilled into practice",
              },
              {
                number: "Every",
                text: "domain — athletics, music, parenting, business",
              },
              {
                number: "538+",
                text: "coaches and learners in the community",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`px-8 py-8 ${
                  i < 2 ? "border-b border-border-dark sm:border-b-0 sm:border-r" : ""
                }`}
              >
                <p className="font-display text-3xl text-text-primary">
                  {stat.number}
                </p>
                <p className="mt-2 font-body text-sm text-text-muted">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
