"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { KeyRound, ShieldCheck, AlertCircle } from "lucide-react";
import { validateAccessKey } from "./actions";

export default function InitializePage() {
  const [state, formAction, isPending] = useActionState(
    validateAccessKey,
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,240,255,0.03)_0%,transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-md px-6"
      >
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 flex size-16 items-center justify-center rounded-full border border-attune-signal/20 bg-attune-signal/[0.06]"
            >
              <KeyRound className="size-7 text-attune-signal" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-authority mb-2 text-2xl text-attune-starlight"
            >
              Initialize Access
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm leading-relaxed text-attune-starlight/40"
            >
              Enter the Temporary Access Key from your purchase confirmation
              email.
            </motion.p>
          </div>

          <form action={formAction}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="accessKey"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-attune-starlight/30"
              >
                Access Key
              </label>
              <input
                ref={inputRef}
                id="accessKey"
                name="accessKey"
                type="text"
                placeholder="ATTUNE-XXXX-XXXX"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 font-mono text-sm tracking-wider text-attune-starlight placeholder:text-attune-starlight/20 transition-colors duration-200 focus:border-attune-signal/30 focus:outline-none focus:ring-1 focus:ring-attune-signal/20"
              />

              {state?.error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 text-sm text-red-400"
                >
                  <AlertCircle className="size-4 shrink-0" />
                  {state.error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-attune-signal/30 bg-attune-signal/10 py-3 text-sm font-medium text-attune-signal transition-all duration-300 hover:border-attune-signal/50 hover:bg-attune-signal/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <ShieldCheck className="size-4" />
                  </motion.div>
                ) : (
                  <ShieldCheck className="size-4" />
                )}
                {isPending ? "Validating..." : "Validate & Continue"}
              </button>
            </motion.div>
          </form>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-xs text-attune-starlight/20"
        >
          Your key was sent to the email used during purchase.
        </motion.p>
      </motion.div>
    </div>
  );
}
