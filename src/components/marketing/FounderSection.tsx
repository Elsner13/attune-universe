"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const credentials = [
  "2× NCAA NATIONAL CHAMPION",
  "6× NCAA ALL-AMERICAN",
  "500+ COACHES TRAINED",
];

function FounderImage() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="flex flex-col items-center md:items-start"
    >
      <div
        className="relative w-full overflow-hidden rounded-[4px] border border-[#38BDF8]/20 bg-[#0a0a0a] shadow-[0_0_60px_rgba(56,189,248,0.06)] md:max-w-[480px]"
        style={{ aspectRatio: "4 / 5" }}
      >
        {!imgError && (
          <Image
            src="/images/founder.jpg"
            alt="Sam Elsner — Founder of Attune"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-attune-starlight/30 md:text-left">
        SAM ELSNER — FOUNDER, ATTUNE
      </p>
    </motion.div>
  );
}

export function FounderSection() {
  return (
    <section id="founder" className="relative py-20 md:py-[120px]">
      {/* Section atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[40%] h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-[#38BDF8] blur-3xl opacity-[0.015]" />
      </div>

      {/* Top separator line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#38BDF8]/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-[80px]">
          {/* Left column — Image */}
          <FounderImage />

          {/* Right column — Text */}
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
                24-23. Third match. The set came in and her stance was off —
                weight distributed wrong, feet not where ten thousand practice
                reps had placed them. She jumped anyway. Her body executed the
                spike it knew. The ball went into the net. 24-24. They lost.
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

              {/* Body copy 3 */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="mb-6 text-base leading-[1.8] text-attune-starlight/60 md:text-[17px]"
              >
                I went looking for why. Not the motivational why. The scientific
                why. I found James Gibson, I found Newell and Davids, I found a
                body of research that had been sitting in academic journals for
                sixty years explaining exactly what I had witnessed on that
                court. Skill is not a stored program. It is a living
                relationship between a body and its environment. The moment that
                relationship is broken in training — the moment you optimize for
                perfect mechanics in a sterile vacuum — you are not building a
                performer. You are building a machine that shatters under
                pressure.
              </motion.p>

              {/* Body copy 4 */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="mb-10 text-base leading-[1.8] text-attune-starlight/60 md:text-[17px]"
              >
                I was a 2x NCAA National Champion and 6x All-American. I had
                lived this science from the inside without knowing its name.
                Building Attune was not a business decision. It was the only
                honest thing left to do.
              </motion.p>

              {/* Signature */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8 }}
                className="mb-10 font-display text-xl italic text-attune-starlight/40"
              >
                — Sam Elsner
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-10 h-px w-[60px] origin-left bg-[#38BDF8]/40"
              />

              {/* Credential pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="flex flex-wrap gap-3"
              >
                {credentials.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[#38BDF8]/15 bg-[#38BDF8]/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-attune-starlight/50"
                  >
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
