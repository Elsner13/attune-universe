"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Philosophy", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
          scrolled
            ? "border-b border-border-dark bg-bg/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-body text-lg font-semibold uppercase tracking-[3px] text-text-primary"
          >
            ATTUNE
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-body text-[13px] uppercase tracking-[1px] transition-colors duration-200 ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-dim hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="https://findthesignal.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-accent-dim"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex size-10 items-center justify-center text-text-muted transition-colors hover:text-text-primary md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
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
            className="fixed inset-0 z-[60] flex flex-col bg-bg/98 backdrop-blur-xl"
          >
            <div className="flex h-16 items-center justify-end px-5 sm:px-8">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex size-10 items-center justify-center text-text-muted transition-colors hover:text-text-primary"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.06,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-body text-2xl font-medium tracking-tight text-text-primary transition-colors hover:text-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 + NAV_LINKS.length * 0.06,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-4"
              >
                <a
                  href="https://findthesignal.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex bg-accent px-8 py-3.5 font-body text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-accent-dim"
                  onClick={() => setMobileOpen(false)}
                >
                  Subscribe
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
