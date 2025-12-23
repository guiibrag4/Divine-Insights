// src/app/_components/sidebar-dynamic-title.tsx
"use client";

import { useState, useEffect } from "react";

type Props = {
  title: string;
};

export function SidebarDynamicTitle({ title }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // O título aparece quando o usuário rola 400px (após passar pelo cabeçalho principal)
      const show = window.scrollY > 400;
      setIsVisible(show);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        transition-all duration-500 ease-in-out mb-6
        ${isVisible 
          ? "opacity-100 translate-y-0 max-h-40" 
          : "opacity-0 -translate-y-4 max-h-0 overflow-hidden m-0"
        }
      `}
    >
      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
        Você está lendo
      </p>
      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
        {title}
      </h3>
      {/* Separador decorativo que aparece junto com o título */}
      <div className="mt-4 h-px w-full bg-gradient-to-r from-stone-200 to-transparent dark:from-stone-700" />
    </div>
  );
}