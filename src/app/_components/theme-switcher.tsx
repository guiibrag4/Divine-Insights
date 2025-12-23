"use client";

import { THEME_DEFAULT } from "@/lib/theme-constants";
import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "system" | "dark" | "light" | "darkblue";

const STORAGE_KEY = "nextjs-blog-starter-theme";
// Ordem do ciclo: Light -> Dark -> DarkBlue
const modes: ColorSchemePreference[] = ["light", "dark", "darkblue"];

const sanitizeMode = (value: string | null): ColorSchemePreference => {
  if (value === "dark" || value === "light" || value === "darkblue") return value;
  return "light";
};

/** to reuse updateDOM function defined inside injected script */

/** function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  /* can not use outside constants or function as this script will be injected in a different context */
  const [SYSTEM, DARK, LIGHT, DARKBLUE] = ["system", "dark", "light", "darkblue"];

  /** Modify transition globally to avoid patched transitions */
  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      /* Force restyle */
      getComputedStyle(document.body);
      /* Wait for next tick before removing */
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  /** function to add remove dark class */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const safeMode = mode === SYSTEM ? SYSTEM : (mode === DARK || mode === LIGHT || mode === DARKBLUE ? mode : LIGHT);
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = safeMode === SYSTEM ? systemMode : safeMode;
    const classList = document.documentElement.classList;
    
    // Remove all theme classes
    classList.remove(DARK);
    classList.remove(DARKBLUE);
    
    // Add appropriate theme class
    if (resolvedMode === DARK) {
      classList.add(DARK);
    } else if (resolvedMode === DARKBLUE) {
      // Para o tema darkblue, habilite as variantes `dark:` também
      classList.add(DARK);
      classList.add(DARKBLUE);
    }
    
    document.documentElement.setAttribute("data-mode", safeMode);
    restoreTransitions();
  };
  window.updateDOM();
  media.addEventListener("change", window.updateDOM);
};

let updateDOM: () => void;

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
    () =>
      sanitizeMode(
        (typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null) ??
          (THEME_DEFAULT as ColorSchemePreference),
      ) as ColorSchemePreference,
  );

  useEffect(() => {
    // store global functions to local variables to avoid any interference
    // in case the script hasn't run yet, guard and set a fallback
    updateDOM = typeof window.updateDOM === "function" ? window.updateDOM : () => {
      try {
        const DARK = "dark" as const;
        const DARKBLUE = "darkblue" as const;
        const SYSTEM = "system" as const;
        const media = matchMedia(`(prefers-color-scheme: ${DARK})`);
        const systemMode = media.matches ? DARK : "light";
        const safeMode = mode === SYSTEM ? SYSTEM : (mode === DARK || mode === "light" || mode === DARKBLUE ? mode : "light");
        const resolvedMode = safeMode === SYSTEM ? systemMode : safeMode;
        const classList = document.documentElement.classList;
        
        // Remove all theme classes
        classList.remove(DARK);
        classList.remove(DARKBLUE);
        
        // Add appropriate theme class
        if (resolvedMode === DARK) {
          classList.add(DARK);
        } else if (resolvedMode === DARKBLUE) {
          // Para o tema darkblue, habilite as variantes `dark:` também
          classList.add(DARK);
          classList.add(DARKBLUE);
        }
        
        document.documentElement.setAttribute("data-mode", safeMode);
      } catch {}
    };
    /** Sync the tabs */
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === STORAGE_KEY && setMode(e.newValue as ColorSchemePreference);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    try {
      updateDOM();
    } catch {
      // if something went wrong, try calling the global directly
      if (typeof window.updateDOM === "function") {
        window.updateDOM();
      }
    }
  }, [mode]);

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

const Script = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
));

/**
 * This component applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
