import Link from "next/link";

export default function FoundationsSalesPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-attune-signal/60">
          Attune Foundations
        </p>
        <h1 className="text-authority mb-6 text-5xl sm:text-6xl text-attune-starlight">
          The Gateway to Mastery
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-attune-starlight/50">
          A perception-action coupling framework for systematic mastery across
          any domain. Enter with your access key to begin.
        </p>
        <Link
          href="/foundations/initialize"
          className="group inline-flex items-center gap-2 rounded-lg border border-attune-signal/30 bg-attune-signal/10 px-8 py-4 text-sm font-medium text-attune-signal transition-all duration-300 hover:border-attune-signal/50 hover:bg-attune-signal/20 hover:shadow-[0_0_40px_rgba(0,240,255,0.2)]"
        >
          Initialize Access
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
