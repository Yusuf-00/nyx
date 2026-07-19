import type { Config } from "tailwindcss";

// nyx is dark-themed only — no light mode, no theme toggle.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#17171f",
        text: "#ffffff",
        "text-muted": "#a1a1aa",
        border: "rgba(255, 255, 255, 0.08)",
        accent: "#7c5cff",
        "on-accent": "#ffffff",
        gain: "#2dd07a",
        loss: "#ef4b6a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
