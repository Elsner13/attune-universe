"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;


export function FounderSection() {
  return (
    <section id="founder" className="relative py-20 md:py-[120px]">
      {/* Section atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[40%] h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-[#38BDF8] blur-3xl opacity-[0.015]" />
      </div>

      {/* Top separator line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#38BDF8]/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          <div className="relative">
            {/* Radial gradient atmosphere */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 50%, rgba(56, 189, 248, 0.03) 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              {/* Section label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#38BDF8]"
              >
                THE ORIGIN
              </motion.p>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                className="text-authority mb-8 text-[clamp(28px,7vw,40px)] font-black text-attune-starlight md:text-[clamp(32px,4vw,52px)]"
              >
                She Had the Highest Vertical on the Team. And the Ball Hit the
                Net.
              </motion.h2>

              {/* Body copy 1 */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="mb-6 text-base leading-[1.8] text-attune-starlight/60 md:text-[17px]"
              >
                She had done everything right. Ten thousand reps. Perfect
                mechanics. She was the best athlete on the court by every
                measurable standard. And when the moment arrived, her body
                executed exactly what practice had built. The ball hit the
                net. They lost. This is not a story about effort. It is a
                story about what practice had actually been building all
                along.
              </motion.p>

              {/* Body copy 2 */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
                className="mb-6 text-base leading-[1.8] text-attune-starlight/60 md:text-[17px]"
              >
                She didn&apos;t fail because she lacked ability. She had more
                vertical than anyone on that court. She failed because her
                training had only ever taught her body to perform in one
                environment — a controlled one, a predictable one, a practice
                one. The moment the information changed, the pattern broke.
                Nobody had ever taught her to read the situation and find a
                solution from within it. Nobody had taught her to attune.
              </motion.p>

              {/* Closing line */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="mb-10 text-base italic leading-[1.8] text-attune-starlight/60 md:text-[17px]"
              >
                I went looking for the scientific why. What I found changed
                everything I thought I knew about how skill actually forms.
                — Sam Elsner
              </motion.p>

            </div>
          </div>
      </div>
    </section>
  );
}
