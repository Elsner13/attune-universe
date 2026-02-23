"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { EmailCapture } from "@/components/ui/EmailCapture";

export function BottomCTA() {
  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-prose text-center">
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] text-text-primary">
            Start here.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base text-text-muted">
            One email per week. The science of how humans learn, applied to
            every domain that matters to you.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-10">
            <EmailCapture
              placeholder="Your email address"
              buttonText="Subscribe"
              footnote="Free forever. Unsubscribe anytime."
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
