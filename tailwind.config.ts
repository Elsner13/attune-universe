import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        "bg-light": "#111111",
        "bg-card": "#161616",
        accent: "#c8ff3c",
        "accent-dim": "#a8d632",
        "text-primary": "#e8e8e8",
        "text-muted": "#888888",
        "text-dim": "#555555",
        "border-dark": "#1a1a1a",
        "border-light": "#333333",
        // Preserve existing color tokens for shadcn/Clerk compatibility
        "attune-void": "#0a0a0a",
        "attune-starlight": "#e8e8e8",
        "attune-obsidian": "#121212",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        // Keep old references working for protected pages
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "720px",
        content: "1100px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
