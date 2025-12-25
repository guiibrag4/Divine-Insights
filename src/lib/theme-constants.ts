// Constantes de tema e cores reutilizáveis
export const THEME_DEFAULT = "dark"; // "system" | "dark" | "light"

export const COLORS = {
  // Neutros - Clean Light & Dark (sem tons azulados)
  neutral: {
    50: "#F5F5F5",  // bg-page light
    100: "#FFFFFF", // bg-card light
    200: "#D4D4D4", // border light
    300: "#CCCCCC",
    400: "#999999",
    500: "#666666", // text-alt light
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A", // bg-card dark
    900: "#0D0D0D",  // bg-page dark
  },
  // Acentos azul
  blue: {
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
  // Acentos roxo
  purple: {
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
};

export const GRADIENTS = {
  divine: "from-blue-600 to-purple-600",
  divineDark: "from-blue-800 to-purple-800",
  cream: "from-neutral-50 to-neutral-200",
};

export const SHADOWS = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

export const BORDERS = {
  light: "border-neutral-200 dark:border-[#262626]",
  medium: "border-neutral-300 dark:border-[#333333]",
  dark: "border-neutral-500 dark:border-[#4D4D4D]",
};
