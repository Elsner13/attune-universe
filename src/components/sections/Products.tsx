"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface ProductCardProps {
  tag: string;
  title: string;
  description: string;
  priceLabel: string;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  external?: boolean;
}

function ProductCard({
  tag,
  title,
  description,
  priceLabel,
  ctaLabel,
  ctaHref,
  featured = false,
  external = false,
}: ProductCardProps) {
  const LinkOrA = external ? "a" : Link;
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      className={`flex flex-col border p-8 ${
        featured
          ? "border-accent/20 bg-bg-card"
          : "border-border-dark bg-bg"
      }`}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="font-body text-[10px] uppercase tracking-[2px] text-text-dim">
          {tag}
        </span>
        {featured && (
          <span className="border border-accent/30 px-2 py-0.5 font-body text-[9px] uppercase tracking-[1.5px] text-accent">
            Most Popular
          </span>
        )}
      </div>
      <h3 className="font-display text-2xl text-text-primary">{title}</h3>
      <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text-muted">
        {description}
      </p>
      <div className="mt-8 flex items-center justify-between border-t border-border-dark pt-6">
        <span className="font-body text-sm text-text-dim">{priceLabel}</span>
        <LinkOrA
          href={ctaHref}
          className="font-body text-xs font-semibold uppercase tracking-[1.5px] text-accent transition-colors hover:text-accent-dim"
          {...linkProps}
        >
          {ctaLabel} &rarr;
        </LinkOrA>
      </div>
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-content">
        <FadeIn>
          <div className="text-center">
            <SectionLabel text="The Ecosystem" />
            <h2 className="font-display text-[clamp(36px,5vw,48px)] text-text-primary">
              Choose your depth.
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-base text-text-muted">
              From free insights to deep transformation. Every level builds on
              the last.
            </p>
          </div>
        </FadeIn>

        {/* Product cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <FadeIn delay={100}>
            <ProductCard
              tag="Free"
              title="Signal/Noise"
              description="Weekly newsletter dissecting the science of skill acquisition. No fluff, no theory without application. Each issue gives you one insight that changes how you practice, coach, or learn."
              priceLabel="Free forever"
              ctaLabel="Subscribe"
              ctaHref="https://findthesignal.substack.com"
              external
            />
          </FadeIn>
          <FadeIn delay={200}>
            <ProductCard
              tag="Course"
              title="Foundations"
              description="The complete ecological dynamics framework in six deep-dive modules. Master perception-action coupling, constraints manipulation, and representative learning design. This is the system."
              priceLabel="$97 one-time"
              ctaLabel="Learn More"
              ctaHref="/products/foundations"
              featured
            />
          </FadeIn>
          <FadeIn delay={300}>
            <ProductCard
              tag="Live Cohort"
              title="Attractor Universe"
              description="Thirty days of guided transformation with direct coaching, peer accountability, and hands-on implementation. Limited to twelve participants. Apply for the next cohort."
              priceLabel="Application only"
              ctaLabel="Apply"
              ctaHref="/products/attractor"
            />
          </FadeIn>
        </div>

        {/* Attune OS banner */}
        <FadeIn delay={400}>
          <div className="mt-8 flex flex-col items-start justify-between gap-6 border border-border-dark p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl text-text-primary">
                Attune OS
              </h3>
              <p className="mt-2 max-w-lg font-body text-sm text-text-muted">
                The complete operating system for ecological skill development.
                Frameworks, templates, and tools — updated monthly.
              </p>
            </div>
            <Link
              href="/products/os"
              className="shrink-0 border border-border-light px-6 py-3 font-body text-xs font-medium uppercase tracking-wider text-text-primary transition-colors hover:border-text-muted"
            >
              Coming Soon — Join Waitlist &rarr;
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
