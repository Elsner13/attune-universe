"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EmailCapture } from "@/components/ui/EmailCapture";

const RECENT_ARTICLES = [
  {
    title: "Fire Horse: Ecological Rebirth",
    href: "https://findthesignal.substack.com",
  },
  {
    title: "The Flatlanders: Why Most People Think in One Dimension",
    href: "https://findthesignal.substack.com",
  },
  {
    title: "Constraints Are Not Limitations",
    href: "https://findthesignal.substack.com",
  },
  {
    title: "The Perception-Action Gap Nobody Talks About",
    href: "https://findthesignal.substack.com",
  },
];

export function Newsletter() {
  return (
    <section id="newsletter" className="bg-bg-light px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-prose text-center">
        <FadeIn>
          <SectionLabel text="Signal/Noise" />
          <h2 className="font-display text-[clamp(36px,5vw,48px)] text-text-primary">
            Separate signal from noise.
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-base leading-relaxed text-text-muted">
            One email per week. The intersection of ecological dynamics, skill
            acquisition science, and what actually works when it matters. Read
            by coaches, athletes, musicians, and anyone obsessed with getting
            better.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-10">
            <EmailCapture
              placeholder="Your email address"
              buttonText="Subscribe"
              footnote="Join 538+ readers. Free forever. Unsubscribe anytime."
            />
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-12 border-t border-border-dark pt-8">
            <p className="mb-4 font-body text-xs uppercase tracking-[2px] text-text-dim">
              Recent issues
            </p>
            <ul className="space-y-3">
              {RECENT_ARTICLES.map((article) => (
                <li key={article.title}>
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {article.title} &rarr;
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
