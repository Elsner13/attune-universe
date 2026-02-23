"use client";

import { useState } from "react";

interface EmailCaptureProps {
  placeholder?: string;
  buttonText?: string;
  footnote?: string;
}

export function EmailCapture({
  placeholder = "Your email address",
  buttonText = "Subscribe",
  footnote,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-4 text-center">
        <p className="font-body text-sm text-accent">
          You're in. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 border border-border-light bg-bg-light px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-accent/50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-accent px-8 py-3.5 font-body text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-accent-dim disabled:opacity-50"
        >
          {status === "loading" ? "..." : buttonText}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 font-body text-xs text-red-400">
          Something went wrong. Try again.
        </p>
      )}
      {footnote && (
        <p className="mt-3 font-body text-xs text-text-dim">
          {footnote}
        </p>
      )}
    </form>
  );
}
