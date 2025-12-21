// Constantes de tema e cores reutilizáveis
export const THEME_DEFAULT = "dark"; // "system" | "dark" | "light"

export const COLORS = {
  // Neutros
  neutral: {
    50: "#fafaf8",
    100: "#f3f0ed",
    200: "#e8e3de",
    300: "#d4ccc4",
    400: "#a89e92",
    500: "#8b8178",
    600: "#6b5f54",
    700: "#4a3f38",
    800: "#2d2622",
    900: "#1a1410",
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
  light: "border-neutral-200 dark:border-slate-700",
  medium: "border-neutral-300 dark:border-slate-600",
  dark: "border-neutral-600 dark:border-slate-500",
};
