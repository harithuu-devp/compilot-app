"use client";

import { Bell, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { initials } from "@/lib/utils";
import { cn } from "cn";
import { Breadcrumb } from "./Breadcrumb";

export type HeaderProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
};

export function Header({ collapsed, onToggleSidebar }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "glass-chrome fixed inset-x-0 top-0 z-30 flex h-[72px] w-full items-center gap-3 border-x-0 border-t-0 px-4 md:px-5",
        scrolled ? "border-b border-[var(--glass-border)]" : "border-b border-transparent",
      )}
    >
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={collapsed}
        className="glass glass-border hidden size-10 items-center justify-center rounded-2xl text-[var(--text-secondary)] transition-glass hover:text-[var(--text)] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none lg:flex"
      >
        {collapsed ? <PanelLeftOpen className="size-5" aria-hidden /> : <PanelLeftClose className="size-5" aria-hidden />}
      </button>

      <Breadcrumb className="min-w-0 flex-1" />

      <div className="relative ml-auto hidden items-center sm:flex">
        <Search aria-hidden className="pointer-events-none absolute left-3.5 size-4 text-[var(--muted)]" />
        <input
          type="search"
          aria-label="Global search"
          placeholder="Search projects, reports…"
          className="glass-input h-10 w-48 rounded-2xl pr-14 pl-10 text-sm lg:w-72"
        />
        <kbd className="pointer-events-none absolute right-3 rounded-md border border-[var(--glass-border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
          ⌘K
        </kbd>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="glass glass-border relative flex size-10 items-center justify-center rounded-2xl text-[var(--text-secondary)] transition-glass hover:text-[var(--text)] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
      >
        <Bell className="size-5" aria-hidden />
        <span aria-hidden className="bg-gradient-danger absolute top-2 right-2.5 size-2 rounded-full" />
      </button>

      <ThemeToggle />

      <button
        type="button"
        aria-label="Account menu for Ava Whitfield"
        className="bg-gradient-secondary glow-violet flex size-10 items-center justify-center rounded-full text-xs font-semibold text-white transition-glass focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
      >
        {initials("Ava Whitfield")}
      </button>
    </header>
  );
}
