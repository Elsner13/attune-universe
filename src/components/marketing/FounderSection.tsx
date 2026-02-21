"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const credentials = [
  "2× NCAA NATIONAL CHAMPION",
  "6× NCAA ALL-AMERICAN",
  "500+ COACHES TRAINED",
];

export function FounderSection() {
  return (
    <section
      id="founder"
      className="relative w-full"
      style={{
        backgroundColor: "#081828",
        borderTop: "1px solid rgba(56, 189, 248, 0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-[120px] lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-[80px]">
          {/* Left column — Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col items-center md:items-start"
          >
            <div
              className="relative w-full overflow-hidden md:max-w-[480px]"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: 4,
                border: "1px solid rgba(56, 189, 248, 0.2)",
                boxShadow: "0 0 60px rgba(56, 189, 248, 0.06)",
              }}
            >
              <Image
                src="/images/founder.jpg"
                alt="Sam Elsner — Founder of Attune"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
            <p
              className="mt-4 text-center uppercase tracking-widest md:text-left"
              style={{
                fontSize: 11,
                color: "rgba(234, 235, 230, 0.4)",
              }}
            >
              SAM ELSNER — FOUNDER, ATTUNE
            </p>
          </motion.div>

          {/* Right column — Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative"
          >
            {/* Radial gradient pseudo-element */}
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
                variants={fadeUp}
                className="mb-4 uppercase tracking-widest"
                style={{ fontSize: 12, color: "#38BDF8" }}
              >
                THE ORIGIN
              </motion.p>

              {/* Headline */}
              <motion.h2
                variants={fadeUp}
                className="mb-8 text-[clamp(28px,7vw,40px)] font-extrabold leading-[1.1] text-[#EAEBE6] md:text-[clamp(32px,4vw,52px)]"
              >
                She Had the Highest Vertical on the Team. And the Ball Hit the
                Net.
              </motion.h2>

              {/* Body copy 1 */}
              <motion.p
                variants={fadeUp}
                className="mb-6 text-base leading-[1.8] md:text-[17px]"
                style={{ color: "rgba(234, 235, 230, 0.75)" }}
              >
                24-23. Third match. The set came in and her stance was off —
                weight distributed wrong, feet not where ten thousand practice
                reps had placed them. She jumped anyway. Her body executed the
                spike it knew. The ball went into the net. 24-24. They lost.
              </motion.p>

              {/* Body copy 2 */}
              <motion.p
                variants={fadeUp}
                className="mb-6 text-base leading-[1.8] md:text-[17px]"
                style={{ color: "rgba(234, 235, 230, 0.75)" }}
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
                variants={fadeUp}
                className="mb-6 text-base leading-[1.8] md:text-[17px]"
                style={{ color: "rgba(234, 235, 230, 0.75)" }}
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
                variants={fadeUp}
                className="mb-10 text-base leading-[1.8] md:text-[17px]"
                style={{ color: "rgba(234, 235, 230, 0.75)" }}
              >
                I was a 2x NCAA National Champion and 6x All-American. I had
                lived this science from the inside without knowing its name.
                Building Attune was not a business decision. It was the only
                honest thing left to do.
              </motion.p>

              {/* Signature */}
              <motion.p
                variants={fadeUp}
                className="mb-10 italic"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: 20,
                  color: "rgba(234, 235, 230, 0.5)",
                }}
              >
                — Sam Elsner
              </motion.p>

              {/* Divider */}
              <motion.div
                variants={fadeUp}
                className="mb-10"
                style={{
                  width: 60,
                  height: 1,
                  backgroundColor: "#38BDF8",
                  opacity: 0.4,
                }}
              />

              {/* Credential pills */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3"
              >
                {credentials.map((label) => (
                  <span
                    key={label}
                    className="uppercase tracking-wider"
                    style={{
                      background: "rgba(56, 189, 248, 0.06)",
                      border: "1px solid rgba(56, 189, 248, 0.2)",
                      borderRadius: 100,
                      padding: "8px 18px",
                      fontSize: 12,
                      color: "rgba(234, 235, 230, 0.6)",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
