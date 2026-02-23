import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Foundations", href: "/products/foundations" },
  { label: "Attractor Universe", href: "/products/attractor" },
  { label: "Attune OS", href: "/products/os" },
  { label: "Signal/Noise", href: "/newsletter" },
];

const CONNECT_LINKS = [
  { label: "Newsletter", href: "https://findthesignal.substack.com", external: true },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-dark bg-bg">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Left */}
          <div className="max-w-xs">
            <p className="font-body text-lg font-semibold uppercase tracking-[3px] text-text-primary">
              ATTUNE
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-text-muted">
              The science of how humans actually learn.
            </p>
          </div>

          {/* Right columns */}
          <div className="flex gap-16">
            <div>
              <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[2px] text-text-dim">
                Products
              </p>
              <ul className="space-y-3">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-text-muted transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[2px] text-text-dim">
                Connect
              </p>
              <ul className="space-y-3">
                {CONNECT_LINKS.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-text-muted transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-text-muted transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-dark pt-8 sm:flex-row">
          <p className="font-body text-xs text-text-dim">
            &copy; {new Date().getFullYear()} Attune. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-body text-xs text-text-dim transition-colors hover:text-text-muted"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-body text-xs text-text-dim transition-colors hover:text-text-muted"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
