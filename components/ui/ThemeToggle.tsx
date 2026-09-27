"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import type { Theme } from "@/lib/constants";
import { cn } from "cn";
import { useTheme } from "./ThemeProvider";

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
  { value: "system", label: "System theme", Icon: Monitor },
];

export type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn("glass glass-border relative flex items-center gap-1 rounded-full p-1 transition-glass", className)}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "relative flex size-8 items-center justify-center rounded-full transition-glass",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isActive ? "text-white" : "text-[var(--text-secondary)] hover:text-[var(--text)]",
            )}
          >
            {isActive ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-primary absolute inset-0 rounded-full glow-blue"
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ zIndex: 0 }}
              />
            ) : null}
            <Icon className="relative z-10 size-4" aria-hidden />
          </button>
        );
      })}
      <span className="sr-only" aria-live="polite">
        {`Active theme: ${resolvedTheme}`}
      </span>
    </div>
  );
}
