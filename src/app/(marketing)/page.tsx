"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Hero } from "@/components/marketing/Hero";
import { FoundationsSection } from "@/components/marketing/FoundationsSection";
import { AttractorSection } from "@/components/marketing/AttractorSection";
import { AttuneOSSection } from "@/components/marketing/AttuneOSSection";
import { SignalSection } from "@/components/marketing/SignalSection";
import { ConstellationCanvas } from "@/components/marketing/ConstellationCanvas";

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

export default function UniverseHub() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const warpScale = useSpring(scaleRaw, SPRING);
  const warpOpacity = useSpring(opacityRaw, SPRING);

  return (
    <main className="noise-overlay relative">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 will-change-transform"
        style={{ scale: warpScale, opacity: warpOpacity }}
      >
        <ConstellationCanvas />
      </motion.div>

      <div ref={heroRef}>
        <Hero />
      </div>
      <FoundationsSection />
      <AttractorSection />
      <AttuneOSSection />
      <SignalSection />
    </main>
  );
}
