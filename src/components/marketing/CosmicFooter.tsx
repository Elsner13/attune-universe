"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Zap,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const pathLinks = [
  { label: "Foundations", href: "/foundations" },
  { label: "Attractor Universe", href: "/attractor" },
  { label: "Attune OS", href: "/os" },
];

const intelligenceLinks = [
  { label: "Signal/Noise", href: "https://findthesignal.substack.com" },
  { label: "Substack", href: "https://findthesignal.substack.com" },
  { label: "Archive", href: "/signal" },
];

const socialLinks = [
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export function CosmicFooter() {
  const lenis = useLenis();

  function scrollToTop() {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer className="relative overflow-hidden">
      {/* "Return to the Void" gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 255, 148, 0.03) 0%, rgba(124, 58, 237, 0.02) 30%, #000000 70%)",
        }}
      />
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-attune-green/15 to-transparent" />

      <div className="relative z-10">
        {/* ── Massive Headline ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="px-6 pb-20 pt-28 sm:px-10 lg:px-16 lg:pt-36"
        >
          <motion.h2
            variants={fadeUp}
            className="text-authority mx-auto max-w-6xl text-center text-5xl font-black text-attune-starlight sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            THE UNIVERSE IS
            <br />
            YOURS TO{" "}
            <span className="text-attune-green text-glow-green">MASTER.</span>
          </motion.h2>
        </motion.div>

        {/* ── 4-Column Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-16"
        >
          {/* Column 1: Brand */}
          <motion.div variants={fadeUp} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-attune-green/20 bg-attune-green/8">
                <span className="font-display text-lg font-black text-attune-green">
                  A
                </span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-attune-starlight">
                ATTUNE
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-attune-starlight/40">
              Ecological Mastery — skill acquisition redesigned from first
              principles. Perceive more, learn faster, master any domain.
            </p>
            <div className="h-px w-16 bg-attune-green/20" />
          </motion.div>

          {/* Column 2: The Path */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/30">
              The Path
            </h4>
            <ul className="space-y-3">
              {pathLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-attune-starlight/50 transition-colors duration-300 hover:text-attune-green"
                  >
                    <span className="inline-block size-1 rounded-full bg-attune-starlight/15 transition-colors duration-300 group-hover:bg-attune-green" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Intelligence */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/30">
              Intelligence
            </h4>
            <ul className="space-y-3">
              {intelligenceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center gap-2 text-sm text-attune-starlight/50 transition-colors duration-300 hover:text-attune-yellow"
                  >
                    <span className="inline-block size-1 rounded-full bg-attune-starlight/15 transition-colors duration-300 group-hover:bg-attune-yellow" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Connect */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-starlight/30">
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-sm text-attune-starlight/50 transition-colors duration-300 hover:text-attune-starlight"
                  >
                    <link.icon className="size-4 transition-colors duration-300 group-hover:text-attune-green" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── START HERE CTA — The "Right Hook" ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl px-6 pb-24 sm:px-10 lg:px-16"
        >
          <div className="relative overflow-hidden rounded-2xl border border-attune-green/25 bg-[#060606] glow-green">
            {/* Ambient glow blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-attune-green/6 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 size-36 rounded-full bg-attune-green/4 blur-[60px]" />

            {/* Top accent */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-green/40 to-transparent" />

            <div className="relative flex flex-col items-center gap-6 px-8 py-10 text-center sm:px-12 sm:py-14">
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-attune-green" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-attune-green">
                  Start Your Journey
                </span>
              </div>

              <h3 className="text-authority text-3xl font-black text-attune-starlight sm:text-4xl">
                READY TO{" "}
                <span className="text-attune-green text-glow-green">
                  MASTER
                </span>{" "}
                YOUR DOMAIN?
              </h3>

              <p className="max-w-md text-sm leading-relaxed text-attune-starlight/40">
                The Foundations Course is where it all begins. The complete
                ecological framework — $97, one-time, lifetime access.
              </p>

              <Button
                asChild
                size="lg"
                className="group/start gap-2.5 bg-attune-green px-10 text-base font-bold text-attune-void shadow-[0_0_30px_rgba(0,255,148,0.35)] transition-all duration-300 hover:bg-attune-green/90 hover:shadow-[0_0_50px_rgba(0,255,148,0.5)]"
              >
                <a href="/foundations">
                  START HERE — $97
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/start:translate-x-0.5" />
                </a>
              </Button>
            </div>

            {/* Bottom accent */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-attune-green/20 to-transparent" />
          </div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row sm:px-10 lg:px-16">
            {/* Copyright with pulse animation */}
            <p className="animate-copyright-pulse font-mono text-[10px] uppercase tracking-[0.25em] text-attune-starlight/20">
              &copy; 2026 ATTUNE. ALL RIGHTS RESERVED.
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-attune-starlight/25 transition-colors duration-300 hover:text-attune-green"
            >
              Back to Top
              <span className="flex size-8 items-center justify-center rounded-full border border-white/6 bg-white/2 transition-all duration-300 group-hover:border-attune-green/30 group-hover:bg-attune-green/5 group-hover:shadow-[0_0_20px_rgba(0,255,148,0.15)]">
                <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
