import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "attune-void": "#050505",
        "attune-green": "#00FF94",
        "attune-purple": "#7C3AED",
        "attune-starlight": "#F8FAFC",
        "attune-blue": "#00B4FF",
        "attune-yellow": "#FFD600",
        "attune-obsidian": "#121212",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-playfair-display)", "Georgia", "serif"],
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(0, 255, 148, 0.35), 0 0 60px rgba(0, 255, 148, 0.15)",
        "glow-green-lg": "0 0 30px rgba(0, 255, 148, 0.45), 0 0 80px rgba(0, 255, 148, 0.2)",
        "glow-purple": "0 0 20px rgba(124, 58, 237, 0.35), 0 0 60px rgba(124, 58, 237, 0.15)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
