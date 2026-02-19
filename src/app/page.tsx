import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-attune-void">
      <h1 className="text-authority text-5xl text-attune-starlight mb-4">
        Attune
      </h1>
      <p className="text-attune-starlight/60 mb-8">
        The Mastery Operating System
      </p>
      <Link
        href="/foundations"
        className="rounded-lg border border-attune-signal/30 bg-attune-signal/10 px-6 py-3 text-attune-signal transition hover:bg-attune-signal/20"
      >
        Enter Foundations
      </Link>
    </div>
  );
}
