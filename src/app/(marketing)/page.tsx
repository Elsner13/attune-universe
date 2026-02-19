"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { Hero } from "@/components/marketing/Hero";
import { FoundationsSection } from "@/components/marketing/FoundationsSection";
import { ConstellationCanvas } from "@/components/marketing/ConstellationCanvas";

export default function UniverseHub() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const warpScale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const warpOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <main className="noise-overlay relative">
      {/* Warp Speed — constellation scales up and fades as you scroll */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 will-change-transform"
        style={{ scale: warpScale, opacity: warpOpacity }}
      >
        <ConstellationCanvas />
      </motion.div>

      {/* Cinematic radial vignette — stays fixed, doesn't warp */}
      <div
        className="pointer-events-none fixed inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, #050505 100%)",
        }}
      />

      <div ref={heroRef}>
        <Hero />
      </div>
      <FoundationsSection />
    </main>
  );
}
