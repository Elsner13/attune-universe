"use client";

import { useState, useTransition, useRef, type ComponentPropsWithoutRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Zap,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Module } from "@/data/modules";
import { completeModule } from "./actions";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const snap = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.3, ease: EASE },
  }),
};

function IntelDisplay({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full bg-black">
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
          title="Module Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
      <div className="h-px w-full bg-attune-signal/20" />
    </div>
  );
}

function FieldNotes({ content }: { content: string }) {
  return (
    <div className="prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
            <h2
              className="font-kinetic mt-10 mb-4 border-b border-[#222] pb-3 text-xl font-black uppercase tracking-wide text-white"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
            <h3
              className="font-kinetic mt-8 mb-3 text-base font-bold uppercase tracking-wider text-white/80"
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
            <p
              className="mb-4 text-sm leading-relaxed text-white/50"
              {...props}
            >
              {children}
            </p>
          ),
          strong: ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => (
            <strong className="font-bold text-white/80" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }: ComponentPropsWithoutRef<"em">) => (
            <em className="text-attune-signal/70" {...props}>
              {children}
            </em>
          ),
          blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
            <blockquote
              className="my-6 flex gap-3 rounded-md border border-attune-signal/10 bg-attune-signal/[0.03] px-4 py-3"
              {...props}
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-attune-signal/60" />
              <div className="[&>p]:mb-0 [&>p]:text-attune-signal/70 [&>p>strong]:text-attune-signal">
                {children}
              </div>
            </blockquote>
          ),
          ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
            <ul className="my-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
            <li className="flex items-start gap-2 text-sm text-white/50" {...props}>
              <span className="mt-2 size-1 shrink-0 rounded-full bg-attune-signal/40" />
              <span>{children}</span>
            </li>
          ),
          ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
            <ol className="my-4 space-y-2 list-none" {...props}>
              {children}
            </ol>
          ),
          code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
            <code
              className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-attune-signal/80"
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
            <pre
              className="my-6 overflow-x-auto rounded-md border border-[#222] bg-[#060606] p-4"
              {...props}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <Terminal className="size-3 text-attune-signal/40" />
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/15">
                  Terminal
                </span>
              </div>
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function ModuleClient({
  mod,
  nextSlug,
  nextTitle,
  isCompleted,
}: {
  mod: Module;
  nextSlug: string | null;
  nextTitle: string | null;
  isCompleted: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [shaking, setShaking] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleExecute() {
    if (isPending) return;

    setShaking(true);
    setTimeout(() => setShaking(false), 400);

    startTransition(async () => {
      await completeModule(mod.slug);
      setCompleted(true);

      if (nextSlug) {
        router.push(`/foundations/modules/${nextSlug}`);
      } else {
        router.push("/foundations/dashboard");
      }
    });
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${shaking ? "animate-[shake_0.3s_ease-in-out]" : ""}`}
    >
      {/* Module header bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="flex items-center gap-3 border-b border-[#222] bg-black/80 px-6 py-3 backdrop-blur-md"
      >
        <span className="font-mono text-[10px] font-bold tracking-wider text-attune-signal/50">
          {mod.id}
        </span>
        <span className="text-white/10">/</span>
        <span className="font-kinetic text-xs font-bold uppercase tracking-wider text-white/60">
          {mod.title}
        </span>
        {completed && (
          <span className="ml-auto flex items-center gap-1 rounded bg-attune-signal/10 px-2 py-0.5">
            <CheckCircle2 className="size-3 text-attune-signal/60" />
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-attune-signal/60">
              Deployed
            </span>
          </span>
        )}
      </motion.div>

      {/* Video */}
      <motion.div
        custom={0}
        variants={snap}
        initial="hidden"
        animate="visible"
      >
        <IntelDisplay videoId={mod.videoId} />
      </motion.div>

      {/* Field Notes */}
      <motion.div
        custom={1}
        variants={snap}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl px-8 py-10"
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-attune-signal/40" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
            Field Notes — {mod.subtitle}
          </span>
        </div>

        <FieldNotes content={mod.content} />
      </motion.div>

      {/* EXECUTE PROTOCOL */}
      <motion.div
        custom={2}
        variants={snap}
        initial="hidden"
        animate="visible"
        className="sticky bottom-0 border-t border-[#222] bg-black/90 px-6 py-4 backdrop-blur-md"
      >
        <div className="mx-auto max-w-3xl">
          <button
            onClick={handleExecute}
            disabled={isPending}
            className="group flex w-full items-center justify-center gap-3 rounded-md border border-attune-signal/30 bg-attune-signal/10 py-4 font-kinetic text-sm font-bold uppercase tracking-[0.15em] text-attune-signal transition-all duration-200 hover:bg-attune-signal hover:text-black hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] disabled:opacity-40"
          >
            <Zap className="size-5 transition-transform group-hover:scale-110" />
            {isPending
              ? "DEPLOYING..."
              : completed && !nextSlug
                ? "RETURN TO WAR ROOM"
                : completed
                  ? `ADVANCE → ${nextTitle?.toUpperCase()}`
                  : "EXECUTE PROTOCOL"}
            {!isPending && nextSlug && (
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>

          {nextSlug && !completed && (
            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-white/10">
              Next: {nextTitle}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
