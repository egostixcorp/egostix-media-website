"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop, Check } from "lucide-react";

export default function ThemeToggle({ variant = "dropdown", className = "" }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className={`p-2 rounded-lg border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 size-9 flex items-center justify-center opacity-60 ${className}`}>
        <Sun className="size-4 text-slate-400" />
      </div>
    );
  }

  const themes = [
    { id: "light", label: "Light", icon: Sun, desc: "Clean bright interface" },
    { id: "dark", label: "Dark", icon: Moon, desc: "Deep high-contrast dark" },
    { id: "system", label: "System", icon: Laptop, desc: "Matches device OS preference" },
  ];

  const currentIcon = () => {
    if (theme === "system") return Laptop;
    if (theme === "dark" || resolvedTheme === "dark") return Moon;
    return Sun;
  };

  const Icon = currentIcon();

  // Quick icon toggle variant (used in Sidebar footer)
  if (variant === "icon") {
    const toggleNext = () => {
      if (theme === "light") setTheme("dark");
      else if (theme === "dark") setTheme("system");
      else setTheme("light");
    };

    return (
      <button
        type="button"
        onClick={toggleNext}
        className={`p-2 rounded-lg border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-neutral-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition flex items-center justify-center min-h-[40px] min-w-[40px] shadow-xs ${className}`}
        title={`Current theme: ${theme} (Click to switch)`}
        aria-label="Toggle color theme"
      >
        <Icon className="size-4 text-blue-600 dark:text-blue-400 transition-transform duration-200" />
      </button>
    );
  }

  // Header Dropdown Switcher
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:bg-neutral-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-mono text-[11px] font-medium transition shadow-xs focus:outline-none min-h-[34px]"
        aria-label="Select theme mode"
      >
        <Icon className="size-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="capitalize hidden sm:inline">{theme}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 font-inter">
          <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
            Appearance Theme
          </div>
          {themes.map((t) => {
            const TIcon = t.icon;
            const isSelected = theme === t.id;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono transition ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TIcon className="size-3.5 shrink-0" />
                  <span>{t.label}</span>
                </div>
                {isSelected && <Check className="size-3.5 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
