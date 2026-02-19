"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Hero } from "@/components/marketing/Hero";
import { FoundationsSection } from "@/components/marketing/FoundationsSection";
import { AttractorSection } from "@/components/marketing/AttractorSection";
import { AttuneOSSection } from "@/components/marketing/AttuneOSSection";
import { SignalSection } from "@/components/marketing/SignalSection";
import { CosmicFooter } from "@/components/marketing/CosmicFooter";
import { ConstellationCanvas } from "@/components/marketing/ConstellationCanvas";
import { CommandCenter } from "@/components/marketing/CommandCenter";

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-60 h-[2px] origin-left bg-attune-green shadow-[0_0_8px_rgba(0,255,148,0.5)]"
      style={{ scaleX }}
    />
  );
}

function ScrollBackdrop() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.10, 0.25, 0.42, 0.58, 0.75, 0.90, 1.0],
    [
      "#050505",
      "#040907",
      "#070410",
      "#040710",
      "#0a0904",
      "#050605",
      "#050505",
      "#050505",
    ]
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0"
      style={{ backgroundColor, zIndex: -1 }}
    />
  );
}

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
    <>
      <ScrollProgress />
      <ScrollBackdrop />
      <CommandCenter />

      <main className="noise-overlay relative lg:pl-14">
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
        <CosmicFooter />

        {/* Mobile dock spacer */}
        <div className="h-20 lg:hidden" />
      </main>
    </>
  );
}
