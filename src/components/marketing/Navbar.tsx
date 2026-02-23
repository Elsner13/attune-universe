"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Foundations", href: "/foundations" },
  { label: "Attractor Universe", href: "/attractor" },
  { label: "Attune OS", href: "/os" },
  { label: "Signal/Noise", href: "https://findthesignal.substack.com" },
] as const;

const CHECKOUT_URL = "https://buy.stripe.com/test_7sY7sL75T2GV3CLgIrefC00";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/6 bg-attune-void/80 shadow-[0_1px_12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Left — Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg border border-[#38BDF8]/20 bg-[#38BDF8]/8">
              <span className="font-display text-base font-black text-[#38BDF8]">
                A
              </span>
            </div>
            <span className="font-display text-lg font-bold tracking-tighter text-attune-starlight">
              ATTUNE
            </span>
          </Link>

          {/* Center — Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isExternal = link.href.startsWith("http");
              const isActive = !isExternal && pathname === link.href;

              return isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-attune-starlight/60 transition-colors duration-200 hover:text-attune-starlight"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-attune-starlight"
                      : "text-attune-starlight/60 hover:text-attune-starlight"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right — CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg bg-[#38BDF8] px-4 py-2 text-xs font-semibold tracking-wide text-attune-void shadow-[0_0_16px_rgba(56,189,248,0.25)] transition-all duration-300 hover:bg-[#38BDF8]/90 hover:shadow-[0_0_24px_rgba(56,189,248,0.4)] sm:inline-flex"
            >
              GET FOUNDATIONS — $97
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center rounded-md text-attune-starlight/70 transition-colors hover:text-attune-starlight lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-60 flex flex-col bg-attune-void/98 backdrop-blur-xl"
          >
            {/* Close button */}
            <div className="flex h-16 items-center justify-end px-5 sm:px-8">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex size-10 items-center justify-center rounded-md text-attune-starlight/70 transition-colors hover:text-attune-starlight"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-col items-center justify-center gap-10">
              {NAV_LINKS.map((link, i) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl font-bold tracking-tight text-attune-starlight transition-colors duration-200 hover:text-[#38BDF8]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-3xl font-bold tracking-tight text-attune-starlight transition-colors duration-200 hover:text-[#38BDF8]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-semibold tracking-wide text-attune-void shadow-[0_0_16px_rgba(56,189,248,0.25)] transition-all duration-300 hover:bg-[#38BDF8]/90"
                  onClick={() => setMobileOpen(false)}
                >
                  GET FOUNDATIONS — $97
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
