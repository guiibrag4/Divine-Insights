import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // === Paleta de Cores Profissional ===
      colors: {
        // Neutros: stone base (branco creme + cinza chumbo)
        "neutral-50": "#fafaf8", // branco creme muito claro
        "neutral-100": "#f3f0ed", // creme claro
        "neutral-200": "#e8e3de", // creme
        "neutral-300": "#d4ccc4", // cinza chumbo muito claro
        "neutral-400": "#a89e92",
        "neutral-500": "#8b8178",
        "neutral-600": "#6b5f54",
        "neutral-700": "#4a3f38",
        "neutral-800": "#2d2622",
        "neutral-900": "#1a1410",

        // Acentos: blue + purple (divinos)
        "accent-blue": {
          50: "#eff7ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        "accent-purple": {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },

        // Legacy colors (mantém compatibilidade)
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },

      // === Tipografia ===
      fontSize: {
        // Display
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-md": ["2.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm": ["2rem", { lineHeight: "1.3", fontWeight: "700" }],
        // Heading
        "h1": ["2rem", { lineHeight: "1.3", fontWeight: "700" }],
        "h2": ["1.5rem", { lineHeight: "1.4", fontWeight: "700" }],
        "h3": ["1.25rem", { lineHeight: "1.5", fontWeight: "600" }],
        // Body
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        // Legacy
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },

      fontFamily: {
        "sans": ["Inter", "system-ui", "sans-serif"],
        "display": ["Poppins", "system-ui", "sans-serif"],
      },

      // === Spacing & Layout ===
      spacing: {
        28: "7rem",
        100: "25rem",
        104: "26rem",
        108: "27rem",
      },

      // === Sombras com Profundidade ===
      boxShadow: {
        // Subtle
        "xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        // Standard
        "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        // Prominent
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        "none": "none",
      },

      // === Borders ===
      borderRadius: {
        "sm": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "full": "9999px",
      },

      // === Backgrounds ===
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Gradientes divinos
        "gradient-divine": "linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 100%)",
        "gradient-divine-dark": "linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(91, 28, 135) 100%)",
        "gradient-cream": "linear-gradient(135deg, rgb(250, 250, 248) 0%, rgb(232, 227, 222) 100%)",
      },

      // === Transitions ===
      transitionProperty: {
        "default": "all",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // === Letter Spacing ===
      letterSpacing: {
        tighter: "-.04em",
        tight: "-.02em",
        normal: "0em",
        wide: ".02em",
        wider: ".05em",
        widest: ".1em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
